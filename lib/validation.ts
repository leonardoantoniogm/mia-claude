import { z } from "zod";

const guardianSchema = z.object({
  first_name: z.string().min(2, "Mínimo 2 caracteres"),
  last_name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
  address: z.string().min(5, "Dirección muy corta"),
});

export const registrationSchema = z.object({
  primary: guardianSchema,
  secondary: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
  emergency: z.object({
    contact_name: z.string().min(2, "Requerido"),
    contact_phone: z.string().min(7, "Requerido"),
    authorized_pickup: z.string().optional(),
    additional_emails: z.string().optional(),
    additional_phones: z.string().optional(),
  }),
  child: z.object({
    first_name: z.string().min(2, "Requerido"),
    last_name: z.string().min(2, "Requerido"),
    date_of_birth: z.string().min(1, "Requerido"),
    gender: z.enum(["female", "male"], { message: "Selecciona género" }),
    allergies: z.string().min(1, "Requerido"),
    medication: z.string().min(1, "Requerido"),
    insurance: z.string().optional(),
  }),
  programs: z
    .array(z.enum(["OOSH", "PTC", "SA"]))
    .min(1, "Selecciona al menos un programa"),
  photo_consent: z.boolean(),
  signature: z.string().min(2, "Escribe tu nombre completo"),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const stepFields: Record<number, (keyof RegistrationFormValues)[]> = {
  1: ["primary"],
  2: ["secondary"],
  3: ["emergency"],
  4: ["child"],
  5: ["programs", "photo_consent", "signature"],
};
