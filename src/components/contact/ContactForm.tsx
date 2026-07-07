"use client";

import { type FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import {
  contactTopicLabels,
  contactTopics,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/contact";

const inputClass =
  "h-14 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none";

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

const topicHints: Record<ContactFormValues["topic"], string> = {
  pickup: "Tell us your drinks, pastries, quantity, and preferred pickup time.",
  events: "Share the date, guest count, and what kind of coffee or pastry box you need.",
  visit: "Ask about seats, hours, accessibility, directions, or today’s counter selection.",
  general: "Send any question, partnership note, or feedback for the shop team.",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const remainingCharacters = useMemo(
    () => Math.max(0, 1000 - values.message.length),
    [values.message.length],
  );

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

      <div className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#F8F4EF] p-5">
        <label htmlFor="topic" className={labelClass}>
          What can we help with?
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {contactTopics.map((topic) => {
            const isActive = values.topic === topic;

            return (
              <button
                key={topic}
                type="button"
                onClick={() => updateField("topic", topic)}
                className={
                  isActive
                    ? "rounded-2xl border border-[#B7793C] bg-[#2B1E18] px-4 py-3 text-left text-sm font-semibold text-[#FFFDFB] shadow-[0_12px_36px_rgba(43,30,24,0.16)]"
                    : "rounded-2xl border border-[#2B1E18]/10 bg-[#FFFDFB] px-4 py-3 text-left text-sm font-semibold text-[#2B1E18] transition hover:border-[#B7793C]/60 hover:bg-[#E5C7A1]/25"
                }
              >
                {contactTopicLabels[topic]}
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-2xl bg-[#FFFDFB] px-4 py-3 text-sm leading-6 text-[#4A342A]/75">
          {topicHints[values.topic]}
        </p>
      </div>

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
          <label htmlFor="visitDate" className={labelClass}>
            Date or pickup time optional
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
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/70">
            Message
          </label>
          <span className="text-xs font-semibold text-[#4A342A]/50">
            {remainingCharacters} left
          </span>
        </div>
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
        <div
          role="status"
          aria-live="polite"
          className={
            status === "success"
              ? "flex items-start gap-3 rounded-2xl border border-[#6E7A5C]/20 bg-[#6E7A5C]/10 px-4 py-4 text-sm font-semibold text-[#4F5F3F]"
              : "rounded-2xl border border-[#9B3A2F]/20 bg-[#9B3A2F]/10 px-4 py-4 text-sm font-semibold text-[#9B3A2F]"
          }
        >
          {status === "success" && <CheckCircle2 className="mt-0.5 shrink-0" size={18} />}
          <span>{statusMessage}</span>
        </div>
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
