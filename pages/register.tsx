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
  "Padre / Tutor principal",
  "Tutor secundario",
  "Contactos de emergencia",
  "Información del niño",
  "Programas y firma",
];

const stepIcons = ["👨‍👩‍👧", "👥", "🆘", "🧒", "📋"];

// Reusable styled input components
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
    const toastId = toast.loading("Procesando inscripción...");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Error al registrar");
      toast.dismiss(toastId);
      toast.success("¡Inscripción completada con éxito!");
      setStep(1);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error instanceof Error ? error.message : "Error inesperado");
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
        <title>Inscripción — MIA Learning Center</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-10 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header card */}
          <div className="bg-brand-blue rounded-3xl p-6 mb-6 text-white shadow-lg">
            <h1 className="text-2xl font-extrabold mb-1">Formulario de inscripción</h1>
            <p className="text-blue-100 text-sm">MIA Learning Center — North Charleston, SC</p>

            {/* Step indicators */}
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
                Paso {step} de {TOTAL_STEPS}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{stepIcons[step - 1]}</span>
              <div>
                <p className="text-xs text-brand-blue font-bold uppercase tracking-wide">Paso {step}</p>
                <h2 className="font-extrabold text-gray-900 text-lg">{stepTitles[step - 1]}</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* STEP 1 — Primary guardian */}
              {step === 1 && (
                <div className="space-y-1">
                  <Field label="Nombre *" error={errMsg("primary", "first_name")}>
                    <input {...register("primary.first_name")} placeholder="Ej: María" className={inputCls} />
                  </Field>
                  <Field label="Apellido *" error={errMsg("primary", "last_name")}>
                    <input {...register("primary.last_name")} placeholder="Ej: González" className={inputCls} />
                  </Field>
                  <Field label="Correo electrónico *" error={errMsg("primary", "email")}>
                    <input {...register("primary.email")} type="email" placeholder="Ej: maria@email.com" className={inputCls} />
                  </Field>
                  <Field label="Teléfono *" error={errMsg("primary", "phone")}>
                    <input {...register("primary.phone")} placeholder="Ej: (843) 555-0100" className={inputCls} />
                  </Field>
                  <Field label="Dirección *" error={errMsg("primary", "address")}>
                    <input {...register("primary.address")} placeholder="Ej: 123 Main St, North Charleston" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* STEP 2 — Secondary guardian */}
              {step === 2 && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 mb-4 bg-blue-50 rounded-xl p-3">
                    Este paso es <strong>opcional</strong>. Si no aplica, haz clic en &quot;Siguiente&quot;.
                  </p>
                  <Field label="Nombre">
                    <input {...register("secondary.first_name")} placeholder="Ej: Carlos" className={inputCls} />
                  </Field>
                  <Field label="Apellido">
                    <input {...register("secondary.last_name")} placeholder="Ej: Rodríguez" className={inputCls} />
                  </Field>
                  <Field label="Correo electrónico">
                    <input {...register("secondary.email")} type="email" placeholder="Ej: carlos@email.com" className={inputCls} />
                  </Field>
                  <Field label="Teléfono">
                    <input {...register("secondary.phone")} placeholder="Ej: (843) 555-0200" className={inputCls} />
                  </Field>
                  <Field label="Dirección">
                    <input {...register("secondary.address")} placeholder="Ej: 456 Oak Ave, Charleston" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* STEP 3 — Emergency contacts */}
              {step === 3 && (
                <div className="space-y-1">
                  <Field label="Personas autorizadas a recoger al niño">
                    <textarea
                      {...register("emergency.authorized_pickup")}
                      placeholder="Nombre y relación de cada persona. Deberán presentar identificación con foto."
                      className={textareaCls}
                    />
                  </Field>
                  <Field label="Correos electrónicos adicionales">
                    <input {...register("emergency.additional_emails")} placeholder="Ej: abuela@email.com" className={inputCls} />
                  </Field>
                  <Field label="Teléfonos adicionales">
                    <input {...register("emergency.additional_phones")} placeholder="Ej: (843) 555-0300" className={inputCls} />
                  </Field>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-brand-red uppercase tracking-wide mb-3">🆘 Contacto de emergencia (requerido)</p>
                    <Field label="Nombre completo *" error={errMsg("emergency", "contact_name")}>
                      <input {...register("emergency.contact_name")} placeholder="Ej: Ana Pérez" className={inputCls} />
                    </Field>
                    <Field label="Teléfono de emergencia *" error={errMsg("emergency", "contact_phone")}>
                      <input {...register("emergency.contact_phone")} placeholder="Ej: (843) 555-0911" className={inputCls} />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 4 — Child info */}
              {step === 4 && (
                <div className="space-y-1">
                  <Field label="Nombre del niño/a *" error={errMsg("child", "first_name")}>
                    <input {...register("child.first_name")} placeholder="Ej: Sofía" className={inputCls} />
                  </Field>
                  <Field label="Apellido *" error={errMsg("child", "last_name")}>
                    <input {...register("child.last_name")} placeholder="Ej: González" className={inputCls} />
                  </Field>
                  <Field label="Fecha de nacimiento *" error={errMsg("child", "date_of_birth")}>
                    <input {...register("child.date_of_birth")} type="date" className={inputCls} />
                  </Field>
                  <Field label="Género *" error={errMsg("child", "gender")}>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="female" {...register("child.gender")} className="accent-brand-blue w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700">Femenino</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="male" {...register("child.gender")} className="accent-brand-blue w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700">Masculino</span>
                      </label>
                    </div>
                  </Field>
                  <Field label="Alergias conocidas *" error={errMsg("child", "allergies")}>
                    <textarea {...register("child.allergies")} placeholder='Ej: "Sin alergias conocidas" o describir' className={textareaCls} />
                  </Field>
                  <Field label="Medicación actual *" error={errMsg("child", "medication")}>
                    <textarea {...register("child.medication")} placeholder='Ej: "Ninguna" o describir dosis y horario' className={textareaCls} />
                  </Field>
                  <Field label="Seguro médico (compañía y número de póliza)">
                    <input {...register("child.insurance")} placeholder="Ej: BlueCross #12345678" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* STEP 5 — Programs & signature */}
              {step === 5 && (
                <div className="space-y-4">
                  <Field label="Selecciona el/los programa(s) *" error={errors.programs?.message}>
                    <div className="space-y-2 mt-1">
                      {[
                        { value: "OOSH", label: "🏫 Cuidado fuera del horario escolar (OOSH)" },
                        { value: "PTC",  label: "📚 Clases de tutoría privada en español (PTC)" },
                        { value: "SA",   label: "🌞 Actividades estacionales y campamentos (SA)" },
                      ].map((p) => (
                        <label key={p.value} className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                          <input type="checkbox" value={p.value} {...register("programs")} className="accent-brand-blue w-4 h-4" />
                          <span className="text-sm font-medium text-gray-700">{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Permiso de fotografía *">
                    <Controller
                      control={control}
                      name="photo_consent"
                      render={({ field }) => (
                        <div className="space-y-2 mt-1">
                          <label className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                            <input type="radio" checked={field.value === true} onChange={() => field.onChange(true)} className="accent-brand-blue w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">✅ Autorizo a MIA a tomar fotografías de mi hijo/a</span>
                          </label>
                          <label className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl cursor-pointer hover:border-brand-blue transition-colors">
                            <input type="radio" checked={field.value === false} onChange={() => field.onChange(false)} className="accent-brand-blue w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">❌ No autorizo</span>
                          </label>
                        </div>
                      )}
                    />
                  </Field>

                  <Field label="Firma electrónica (nombre y apellido) *" error={errors.signature?.message}>
                    <input
                      {...register("signature")}
                      placeholder="Ej: María González"
                      className={inputCls}
                    />
                    <p className="text-xs text-gray-400 mt-1">Al escribir tu nombre confirmas que la información es verídica.</p>
                  </Field>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-outline text-sm py-2 px-5"
                  >
                    ← Atrás
                  </button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS && (
                  <button type="button" onClick={handleNext} className="btn-primary text-sm py-2 px-6">
                    Siguiente →
                  </button>
                )}

                {step === TOTAL_STEPS && (
                  <button type="submit" disabled={loading} className="btn-primary text-sm py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Enviando..." : "✅ Enviar inscripción"}
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
