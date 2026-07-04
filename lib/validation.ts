import { z } from "zod";

const guardianSchema = z.object({
  first_name: z.string().min(2, "Minimum 2 characters"),
  last_name: z.string().min(2, "Minimum 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number"),
  address: z.string().min(5, "Address is too short"),
});

export const registrationSchema = z.object({
  primary: guardianSchema,
  secondary: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
  emergency: z.object({
    contact_name: z.string().min(2, "Required"),
    contact_phone: z.string().min(7, "Required"),
    authorized_pickup: z.string().optional(),
    additional_emails: z.string().optional(),
    additional_phones: z.string().optional(),
  }),
  child: z.object({
    first_name: z.string().min(2, "Required"),
    last_name: z.string().min(2, "Required"),
    date_of_birth: z.string().min(1, "Required"),
    gender: z.enum(["female", "male"], { message: "Please select a gender" }),
    allergies: z.string().min(1, "Required"),
    medication: z.string().min(1, "Required"),
    insurance: z.string().optional(),
  }),
  programs: z
    .array(z.enum(["OOSH", "PTC", "SA"]))
    .min(1, "Please select at least one program"),
  photo_consent: z.boolean(),
  signature: z.string().min(2, "Please enter your full name"),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const stepFields: Record<number, (keyof RegistrationFormValues)[]> = {
  1: ["primary"],
  2: ["secondary"],
  3: ["emergency"],
  4: ["child"],
  5: ["programs", "photo_consent", "signature"],
};
