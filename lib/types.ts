export type ProgramCode = "OOSH" | "PTC" | "SA";

export interface GuardianInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

export interface SecondaryGuardianInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface EmergencyInput {
  contact_name: string;
  contact_phone: string;
  authorized_pickup?: string;
  additional_emails?: string;
  additional_phones?: string;
}

export interface ChildInput {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "female" | "male";
  allergies: string;
  medication: string;
  insurance?: string;
}

export interface RegistrationInput {
  primary: GuardianInput;
  secondary?: SecondaryGuardianInput;
  emergency: EmergencyInput;
  child: ChildInput;
  programs: ProgramCode[];
  photo_consent: boolean;
  signature: string;
}

export type RegistrationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected";

export interface RegistrationSummary {
  id: number;
  status: RegistrationStatus;
  created_at: string;
  child_first: string;
  child_last: string;
  parent_first: string;
  parent_last: string;
  parent_email: string;
}

export interface RegistrationDetail {
  id: number;
  status: RegistrationStatus;
  photo_consent: boolean;
  signature: string;
  created_at: string;
  updated_at: string;
  guardians: (GuardianInput & { role: "primary" | "secondary" })[];
  emergency: EmergencyInput[];
  child: ChildInput & { insurance: string | null };
  programs: { code: ProgramCode; name: string }[];
}
