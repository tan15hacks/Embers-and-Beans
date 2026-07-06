"use client";

import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";
import {
  contactTopicLabels,
  contactTopics,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/contact";

const inputClass =
  "h-13 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/70";
const errorClass = "mt-2 text-sm font-medium text-[#9B3A2F]";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  topic: "pickup",
  visitDate: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const validation = validateContactForm(values);

    if (!validation.success) {
      setErrors(validation.errors);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(payload.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setStatusMessage(payload.message ?? "Thanks — your message was sent.");
      setValues(initialValues);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={values.website}
        onChange={(event) => updateField("website", event.target.value)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={inputClass}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone optional
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+63 912 345 6789"
            className={inputClass}
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="topic" className={labelClass}>
            Topic
          </label>
          <select
            id="topic"
            className={inputClass}
            value={values.topic}
            onChange={(event) =>
              updateField("topic", event.target.value as ContactFormValues["topic"])
            }
          >
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {contactTopicLabels[topic]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="visitDate" className={labelClass}>
          Preferred date or pickup time optional
        </label>
        <input
          id="visitDate"
          type="text"
          placeholder="Tomorrow around 3 PM"
          className={inputClass}
          value={values.visitDate}
          onChange={(event) => updateField("visitDate", event.target.value)}
          aria-invalid={Boolean(errors.visitDate)}
          aria-describedby={errors.visitDate ? "visit-date-error" : undefined}
        />
        {errors.visitDate && (
          <p id="visit-date-error" className={errorClass}>
            {errors.visitDate}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us what you need prepared, reserved, or answered."
          className="w-full resize-none rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 py-4 text-sm leading-7 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      {statusMessage && (
        <p
          aria-live="polite"
          className={
            status === "success"
              ? "rounded-2xl bg-[#6E7A5C]/10 px-4 py-3 text-sm font-semibold text-[#4F5F3F]"
              : "rounded-2xl bg-[#9B3A2F]/10 px-4 py-3 text-sm font-semibold text-[#9B3A2F]"
          }
        >
          {statusMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#2B1E18] px-8 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="ml-2" size={18} />
      </button>
    </form>
  );
}
