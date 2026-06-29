import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/lib/adminAuth";
import {
  getRegistrationById,
  updateRegistrationStatus,
  deleteRegistration,
} from "@/lib/db";
import type { RegistrationStatus } from "@/lib/types";

const VALID_STATUSES: RegistrationStatus[] = [
  "pending",
  "reviewed",
  "accepted",
  "rejected",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!requireAdmin(req, res)) return;

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    if (req.method === "GET") {
      const registration = await getRegistrationById(id);
      if (!registration) {
        return res.status(404).json({ error: "No encontrada" });
      }
      return res.status(200).json(registration);
    }

    if (req.method === "PATCH") {
      const { status } = req.body as { status?: string };
      if (!status || !VALID_STATUSES.includes(status as RegistrationStatus)) {
        return res.status(400).json({ error: "Estado inválido" });
      }
      const updated = await updateRegistrationStatus(
        id,
        status as RegistrationStatus
      );
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      await deleteRegistration(id);
      return res.status(200).json({ deleted: true });
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
