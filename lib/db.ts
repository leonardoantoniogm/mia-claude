import { Pool, type QueryResultRow } from "pg";
import type {
  RegistrationInput,
  RegistrationStatus,
  RegistrationSummary,
  RegistrationDetail,
} from "./types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
) {
  return pool.query<T>(text, params);
}

// Writes a registration across 5 tables in one transaction: if any insert
// fails (e.g. an unknown program code), nothing is left half-saved.
export async function saveRegistration(
  data: RegistrationInput
): Promise<{ id: number; created_at: Date }> {
  const encKey = process.env.INSURANCE_ENCRYPTION_KEY;
  if (!encKey) {
    throw new Error("INSURANCE_ENCRYPTION_KEY is not set");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const reg = await client.query<{ id: number; created_at: Date }>(
      `INSERT INTO registrations (photo_consent, signature)
       VALUES ($1, $2) RETURNING id, created_at`,
      [data.photo_consent, data.signature]
    );
    const registrationId = reg.rows[0].id;

    await client.query(
      `INSERT INTO guardians
        (registration_id, role, first_name, last_name, email, phone, address)
       VALUES ($1, 'primary', $2, $3, $4, $5, $6)`,
      [
        registrationId,
        data.primary.first_name,
        data.primary.last_name,
        data.primary.email,
        data.primary.phone,
        data.primary.address,
      ]
    );

    if (data.secondary?.first_name) {
      await client.query(
        `INSERT INTO guardians
          (registration_id, role, first_name, last_name, email, phone, address)
         VALUES ($1, 'secondary', $2, $3, $4, $5, $6)`,
        [
          registrationId,
          data.secondary.first_name,
          data.secondary.last_name ?? "",
          data.secondary.email ?? "",
          data.secondary.phone ?? "",
          data.secondary.address ?? "",
        ]
      );
    }

    await client.query(
      `INSERT INTO emergency_contacts
        (registration_id, contact_name, contact_phone,
         authorized_pickup, additional_emails, additional_phones)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        registrationId,
        data.emergency.contact_name,
        data.emergency.contact_phone,
        data.emergency.authorized_pickup ?? null,
        data.emergency.additional_emails ?? null,
        data.emergency.additional_phones ?? null,
      ]
    );

    await client.query(
      `INSERT INTO children
        (registration_id, first_name, last_name, date_of_birth,
         gender, allergies, medication, insurance_enc)
       VALUES ($1, $2, $3, $4, $5, $6, $7, pgp_sym_encrypt($8, $9))`,
      [
        registrationId,
        data.child.first_name,
        data.child.last_name,
        data.child.date_of_birth,
        data.child.gender,
        data.child.allergies,
        data.child.medication,
        data.child.insurance ?? "",
        encKey,
      ]
    );

    for (const code of data.programs) {
      await client.query(
        `INSERT INTO registration_programs (registration_id, program_id)
         SELECT $1, id FROM programs WHERE code = $2`,
        [registrationId, code]
      );
    }

    await client.query("COMMIT");
    return { id: registrationId, created_at: reg.rows[0].created_at };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function getRegistrations(): Promise<RegistrationSummary[]> {
  const result = await query<RegistrationSummary>(
    `SELECT r.id, r.status, r.created_at,
            c.first_name AS child_first, c.last_name AS child_last,
            g.first_name AS parent_first, g.last_name AS parent_last,
            g.email AS parent_email
       FROM registrations r
       JOIN children c  ON c.registration_id = r.id
       JOIN guardians g ON g.registration_id = r.id AND g.role = 'primary'
      ORDER BY r.created_at DESC`
  );
  return result.rows;
}

export async function getRegistrationById(
  id: string | number
): Promise<RegistrationDetail | null> {
  const reg = await query("SELECT * FROM registrations WHERE id = $1", [id]);
  if (reg.rows.length === 0) return null;

  const encKey = process.env.INSURANCE_ENCRYPTION_KEY;
  if (!encKey) {
    throw new Error("INSURANCE_ENCRYPTION_KEY is not set");
  }

  const guardians = await query(
    "SELECT * FROM guardians WHERE registration_id = $1 ORDER BY role",
    [id]
  );
  const emergency = await query(
    "SELECT * FROM emergency_contacts WHERE registration_id = $1",
    [id]
  );
  const child = await query(
    `SELECT id, registration_id, first_name, last_name, date_of_birth,
            gender, allergies, medication,
            pgp_sym_decrypt(insurance_enc, $2) AS insurance
       FROM children WHERE registration_id = $1`,
    [id, encKey]
  );
  const programs = await query(
    `SELECT p.code, p.name
       FROM registration_programs rp
       JOIN programs p ON p.id = rp.program_id
      WHERE rp.registration_id = $1`,
    [id]
  );

  return {
    ...(reg.rows[0] as RegistrationDetail),
    guardians: guardians.rows as RegistrationDetail["guardians"],
    emergency: emergency.rows as RegistrationDetail["emergency"],
    child: child.rows[0] as RegistrationDetail["child"],
    programs: programs.rows as RegistrationDetail["programs"],
  };
}

export async function updateRegistrationStatus(
  id: string | number,
  status: RegistrationStatus
) {
  const result = await query(
    `UPDATE registrations
        SET status = $1, updated_at = NOW()
      WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

export async function deleteRegistration(id: string | number) {
  await query("DELETE FROM registrations WHERE id = $1", [id]);
  return { deleted: true };
}
