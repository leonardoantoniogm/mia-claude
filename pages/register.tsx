import { useState } from "react";
import Head from "next/head";
import { useForm, Controller, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  registrationSchema,
  stepFields,
  type RegistrationFormValues,
} from "@/lib/validation";

const TOTAL_STEPS = 5;

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
    const toastId = toast.loading("Procesando...");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al registrar");
      }

      toast.dismiss(toastId);
      toast.success("¡Inscripción completada!");
      setStep(1);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const errMsg = <G extends keyof FieldErrors<RegistrationFormValues>>(
    group: G,
    field: string
  ): string | undefined => {
    const groupErrors = errors[group] as
      | Record<string, { message?: string }>
      | undefined;
    return groupErrors?.[field]?.message;
  };

  return (
    <>
      <Head>
        <title>Inscripción — MIA Learning Center</title>
      </Head>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "20px" }}>
        <h1>
          Inscripción — Paso {step} de {TOTAL_STEPS}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <h2>A. Padre / Tutor principal</h2>
              <input {...register("primary.first_name")} placeholder="Nombre *" />
              {errMsg("primary", "first_name") && (
                <p className="err">{errMsg("primary", "first_name")}</p>
              )}
              <input {...register("primary.last_name")} placeholder="Apellido *" />
              {errMsg("primary", "last_name") && (
                <p className="err">{errMsg("primary", "last_name")}</p>
              )}
              <input
                {...register("primary.email")}
                type="email"
                placeholder="Email *"
              />
              {errMsg("primary", "email") && (
                <p className="err">{errMsg("primary", "email")}</p>
              )}
              <input {...register("primary.phone")} placeholder="Teléfono *" />
              {errMsg("primary", "phone") && (
                <p className="err">{errMsg("primary", "phone")}</p>
              )}
              <input {...register("primary.address")} placeholder="Dirección *" />
              {errMsg("primary", "address") && (
                <p className="err">{errMsg("primary", "address")}</p>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2>B. Padre / Tutor secundario (opcional)</h2>
              <input {...register("secondary.first_name")} placeholder="Nombre" />
              <input {...register("secondary.last_name")} placeholder="Apellido" />
              <input
                {...register("secondary.email")}
                type="email"
                placeholder="Email"
              />
              <input {...register("secondary.phone")} placeholder="Teléfono" />
              <input {...register("secondary.address")} placeholder="Dirección" />
            </>
          )}

          {step === 3 && (
            <>
              <h2>C. Contactos adicionales y de emergencia</h2>
              <textarea
                {...register("emergency.authorized_pickup")}
                placeholder="Personas autorizadas a recoger al niño (presentarán ID con foto)"
              />
              <input
                {...register("emergency.additional_emails")}
                placeholder="Emails adicionales"
              />
              <input
                {...register("emergency.additional_phones")}
                placeholder="Teléfonos adicionales"
              />
              <input
                {...register("emergency.contact_name")}
                placeholder="Nombre contacto de emergencia *"
              />
              {errMsg("emergency", "contact_name") && (
                <p className="err">{errMsg("emergency", "contact_name")}</p>
              )}
              <input
                {...register("emergency.contact_phone")}
                placeholder="Teléfono de emergencia *"
              />
              {errMsg("emergency", "contact_phone") && (
                <p className="err">{errMsg("emergency", "contact_phone")}</p>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <h2>D. Información del niño</h2>
              <input
                {...register("child.first_name")}
                placeholder="Nombre del niño *"
              />
              {errMsg("child", "first_name") && (
                <p className="err">{errMsg("child", "first_name")}</p>
              )}
              <input
                {...register("child.last_name")}
                placeholder="Apellido del niño *"
              />
              {errMsg("child", "last_name") && (
                <p className="err">{errMsg("child", "last_name")}</p>
              )}
              <input {...register("child.date_of_birth")} type="date" />
              {errMsg("child", "date_of_birth") && (
                <p className="err">{errMsg("child", "date_of_birth")}</p>
              )}

              <label>
                <input type="radio" value="female" {...register("child.gender")} />{" "}
                Femenino
              </label>
              <label>
                <input type="radio" value="male" {...register("child.gender")} />{" "}
                Masculino
              </label>
              {errMsg("child", "gender") && (
                <p className="err">{errMsg("child", "gender")}</p>
              )}

              <textarea {...register("child.allergies")} placeholder="Alergias *" />
              {errMsg("child", "allergies") && (
                <p className="err">{errMsg("child", "allergies")}</p>
              )}
              <textarea
                {...register("child.medication")}
                placeholder="Medicación *"
              />
              {errMsg("child", "medication") && (
                <p className="err">{errMsg("child", "medication")}</p>
              )}
              <input
                {...register("child.insurance")}
                placeholder="Compañía de seguro y número (requerido)"
              />
            </>
          )}

          {step === 5 && (
            <>
              <h2>E. Programas</h2>
              <label>
                <input type="checkbox" value="OOSH" {...register("programs")} />{" "}
                Out of School Hours (OOSH)
              </label>
              <label>
                <input type="checkbox" value="PTC" {...register("programs")} />{" "}
                Private Tutoring Class (PTC)
              </label>
              <label>
                <input type="checkbox" value="SA" {...register("programs")} />{" "}
                Seasonal Activity (Camps, PNO)
              </label>
              {errors.programs && (
                <p className="err">{errors.programs.message}</p>
              )}

              <h2>F. Permiso de fotografía</h2>
              <Controller
                control={control}
                name="photo_consent"
                render={({ field }) => (
                  <>
                    <label>
                      <input
                        type="radio"
                        checked={field.value === true}
                        onChange={() => field.onChange(true)}
                      />{" "}
                      Autorizo a MIA a tomar fotografías de mi hijo
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={field.value === false}
                        onChange={() => field.onChange(false)}
                      />{" "}
                      NO autorizo
                    </label>
                  </>
                )}
              />

              <input
                {...register("signature")}
                placeholder="Firma: nombre y apellido *"
              />
              {errors.signature && (
                <p className="err">{errors.signature.message}</p>
              )}
            </>
          )}

          <div style={{ marginTop: "20px" }}>
            {step > 1 && (
              <button type="button" onClick={() => setStep((s) => s - 1)}>
                ← Atrás
              </button>
            )}
            {step < TOTAL_STEPS && (
              <button type="button" onClick={handleNext}>
                Siguiente →
              </button>
            )}
            {step === TOTAL_STEPS && (
              <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar inscripción"}
              </button>
            )}
          </div>
        </form>

        <style jsx>{`
          input,
          select,
          textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          textarea {
            min-height: 70px;
          }
          label {
            display: block;
            margin: 8px 0;
          }
          label input {
            width: auto;
            margin-right: 8px;
          }
          .err {
            color: red;
            font-size: 14px;
            margin: 0 0 8px 0;
          }
          button {
            padding: 10px 20px;
            margin-right: 10px;
            background: #0ea5e9;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </>
  );
}
