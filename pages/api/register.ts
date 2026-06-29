import type { NextApiRequest, NextApiResponse } from "next";
import { saveRegistration } from "@/lib/db";
import { registrationSchema } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: parsed.error.flatten(),
    });
  }

  try {
    const registration = await saveRegistration(parsed.data);
    return res.status(201).json({
      success: true,
      message: "¡Inscripción completada exitosamente!",
      data: {
        id: registration.id,
        childName: parsed.data.child.first_name,
        createdAt: registration.created_at,
      },
    });
  } catch (err) {
    console.error("Registration API error:", err);
    return res.status(500).json({
      error: "Error al registrar",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
