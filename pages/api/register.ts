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
      error: "Invalid data",
      details: parsed.error.flatten(),
    });
  }

  try {
    const registration = await saveRegistration(parsed.data);
    return res.status(201).json({
      success: true,
      message: "Registration completed successfully!",
      data: {
        id: registration.id,
        childName: `${parsed.data.child.first_name} ${parsed.data.child.last_name}`,
        guardianName: `${parsed.data.primary.first_name} ${parsed.data.primary.last_name}`,
        programs: parsed.data.primary,
        createdAt: registration.created_at,
      },
    });
  } catch (err) {
    console.error("Registration API error:", err);
    return res.status(500).json({
      error: "Registration failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
