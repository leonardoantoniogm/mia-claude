import { useState } from "react";
import Head from "next/head";
import { useForm, Controller, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  registrationSchema,
  stepFields,
  type RegistrationFormValues,
} from "@/lib/validation";

const TOTAL_STEPS = 5;

const stepTitles = [
  "Primary Parent / Guardian",
  "Secondary Guardian",
  "Emergency Contacts",
  "Child Information",
  "Programs & Signature",
];

const stepIcons = ["👨‍👩‍👧", "👥", "🆘", "🧒", "📋"];

function Field({ label, error, children }: { label?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>}
      {children}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors placeholder:text-gray-400";
const textareaCls = `${inputCls} min-h-[80px] resize-none`;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { programs: [], photo_consent: true },
    mode: "onChange",
  });

  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Submitting registration...");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration failed");
      toast.dismiss(toastId);
      toast.success("Registration submitted successfully!");
      setStep(1);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const errMsg = <G extends keyof FieldErrors<RegistrationFormValues>>(
    group: G, field: string
  ): string | undefined => {
    const g = errors[group] as Record<string, { message?: string }> | undefined;
    return g?.[field]?.message;
  };

  const progress = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);

  return (
    <>
      <Head>
        <title>Registration — MIA Learning Center</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-10 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header card */}
          <div className="bg-brand-blue rounded-3xl p-6 mb-6 text-white shadow-lg">
            <h1 className="text-2xl font-extrabold mb-1">Registration Form</h1>
            <p className="text-blue-100 text-sm">MIA Learning Center — North Charleston, SC</p>

            <div className="flex items-center gap-2 mt-4">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-extrabold transition-all ${
                    i + 1 === step
                      ? "bg-brand-yellow text-gray-900 scale-110"
                      : i + 1 < step
                      ? "bg-white/30 text-white"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </div>
              ))}
              <span className="ml-auto text-blue-100 text-xs font-bold">
                Step {step} of {TOTAL_STEPS}
              </span>
            </div>

            <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }} // dynamic width — can't use static Tailwind class
              />
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{stepIcons[step - 1]}</span>
              <div>
                <p className="text-xs text-brand-blue font-bold uppercase tracking-wide">Step {step}</p>
                <h2 className="font-extrabold text-gray-900 text-lg">{stepTitles[step - 1]}</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* STEP 1 — Primary guardian */}
              {step === 1 && (
                <div className="space-y-1">
                  <Field label="First Name *" error={errMsg("primary", "first_name")}>
                    <input {...register("primary.first_name")} placeholder="e.g. Maria" className={inputCls} />
                  </Field>
                  <Field label="Last Name *" error={errMsg("primary", "last_name")}>
                    <input {...register("primary.last_name")} placeholder="e.g. Gonzalez" className={inputCls} />
                  </Field>
                  <Field label="Email Address *" error={errMsg("primary", "email")}>
                    <input {...register("primary.email")} type="email" placeholder="e.g. maria@email.com" className={inputCls} />
                  </Field>
                  <Field label="Phone Number *" error={errMsg("primary", "phone")}>
                    <input {...register("primary.phone")} placeholder="e.g. (843) 555-0100" className={inputCls} />
                  </Field>
                  <Field label="Home Address *" error={errMsg("primary", "address")}>
                    <input {...register("primary.address")} placeholder="e.g. 123 Main St, North Charleston" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* STEP 2 — Secondary guardian */}
              {step === 2 && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 mb-4 bg-blue-50 rounded-xl p-3">
                    This step is <strong>optional</strong>. Click &quot;Next&quot; to skip if not applicable.
                  </p>
                  <Field label="First Name">
                    <input {...register("secondary.first_name")} placeholder="e.g. Carlos" className={inputCls} />
                  </Field>
                  <Field label="Last Name">
                    <input {...register("secondary.last_name")} placeholder="e.g. Rodriguez" className={inputCls} />
                  </Field>
                  <Field label="Email Address">
                    <input {...register("secondary.email")} type="email" placeholder="e.g. carlos@email.com" className={inputCls} />
                  </Field>
                  <Field label="Phone Number">
                    <input {...register("secondary.phone")} placeholder="e.g. (843) 555-0200" className={inputCls} />
                  </Field>
                  <Field label="Home Address">
                    <input {...register("secondary.address")} placeholder="e.g. 456 Oak Ave, Charleston" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* STEP 3 — Emergency contacts */}
              {step === 3 && (
                <div className="space-y-1">
                  <Field label="Persons authorized to pick up the child">
                    <textarea
                      {...register("emergency.authorized_pickup")}
                      placeholder="Name and relationship of each person. They will be required to show a photo ID."
                      className={textareaCls}
                    />
                  </Field>
                  <Field label="Additional email addresses">
                    <input {...register("emergency.additional_emails")} placeholder="e.g. grandma@email.com" className={inputCls} />
                  </Field>
                  <Field label="Additional phone numbers">
                    <input {...register("emergency.additional_phones")} placeholder="e.g. (843) 555-0300" className={inputCls} />
                  </Field>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-brand-red uppercase tracking-wide mb-3">🆘 Emergency Contact (required)</p>
                    <Field label="Full Name *" error={errMsg("emergency", "contact_name")}>
                      <input {...register("emergency.contact_name")} placeholder="e.g. Ana Perez" className={inputCls} />
                    </Field>
                    <Field label="Emergency Phone *" error={errMsg("emergency", "contact_phone")}>
                      <input {...register("emergency.contact_phone")} placeholder="e.g. (843) 555-0911" className={inputCls} />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 4 — Child info */}
              {step === 4 && (
                <div className="space-y-1">
                  <Field label="Child's First Name *" error={errMsg("child", "first_name")}>
                    <input {...register("child.first_name")} placeholder="e.g. Sofia" className={inputCls} />
                  </Field>
                  <Field label="Child's Last Name *" error={errMsg("child", "last_name")}>
                    <input {...register("child.last_name")} placeholder="e.g. Gonzalez" className={inputCls} />
                  </Field>
                  <Field label="Date of Birth *" error={errMsg("child", "date_of_birth")}>
                    <input {...register("child.date_of_birth")} type="date" className={inputCls} />
                  </Field>
                  <Field label="Gender *" error={errMsg("child", "gender")}>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="female" {...register("child.gender")} className="accent-brand-blue w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700">Female</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="male" {...register("child.gender")} className="accent-brand-blue w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700">Male</span>
                      </label>
                    </div>
                  </Field>
                  <Field label="Known Allergies *" error={errMsg("child", "allergies")}>
                    <textarea {...register("child.allergies")} placeholder='e.g. "No known allergies" or describe' className={textareaCls} />
                  </Field>
                  <Field label="Current Medication *" error={errMsg("child", "medication")}>
                    <textarea {...register("child.medication")} placeholder='e.g. "None" or describe dosage and schedule' className={textareaCls} />
                  </Field>
                  <Field label="Health Insurance (company & policy number)">
                    <input {...register("child.insurance")} placeholder="e.g. BlueCross #12345678" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* STEP 5 — Programs & signature */}
              {step === 5 && (
                <div className="space-y-4">
                  <Field label="Select Program(s) *" error={errors.programs?.message}>
                    <div className="space-y-2 mt-1">
                      {[
                        { value: "OOSH", label: "🏫 Out of School Hours (OOSH)" },
                        { value: "PTC",  label: "📚 Private Tutoring Class (PTC)" },
                        { value: "SA",   label: "🌞 Seasonal Activities & Camps (SA)" },
                      ].map((p) => (
                        <label key={p.value} className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                          <input type="checkbox" value={p.value} {...register("programs")} className="accent-brand-blue w-4 h-4" />
                          <span className="text-sm font-medium text-gray-700">{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Photo Release *">
                    <Controller
                      control={control}
                      name="photo_consent"
                      render={({ field }) => (
                        <div className="space-y-2 mt-1">
                          <label className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                            <input type="radio" checked={field.value === true} onChange={() => field.onChange(true)} className="accent-brand-blue w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">✅ I authorize MIA to take photos of my child</span>
                          </label>
                          <label className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                            <input type="radio" checked={field.value === false} onChange={() => field.onChange(false)} className="accent-brand-blue w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">❌ I do not authorize</span>
                          </label>
                        </div>
                      )}
                    />
                  </Field>

                  <Field label="Electronic Signature (full name) *" error={errors.signature?.message}>
                    <input
                      {...register("signature")}
                      placeholder="e.g. Maria Gonzalez"
                      className={inputCls}
                    />
                    <p className="text-xs text-gray-400 mt-1">By typing your name you confirm that all information provided is accurate.</p>
                  </Field>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-outline text-sm py-2 px-5">
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS && (
                  <button type="button" onClick={handleNext} className="btn-primary text-sm py-2 px-6">
                    Next →
                  </button>
                )}

                {step === TOTAL_STEPS && (
                  <button type="submit" disabled={loading} className="btn-primary text-sm py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Submitting..." : "✅ Submit Registration"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
