"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  contactFormSchema,
  contactTopicLabels,
  contactTopics,
  type ContactFormValues,
} from "@/lib/contact";

const inputClass =
  "h-13 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/70";
const errorClass = "mt-2 text-sm font-medium text-[#9B3A2F]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "pickup",
      visitDate: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    setStatusMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus("error");
      setStatusMessage(payload.message ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setStatusMessage(payload.message ?? "Thanks — your message was sent.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
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
            {...register("name")}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
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
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
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
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="topic" className={labelClass}>
            Topic
          </label>
          <select id="topic" className={inputClass} {...register("topic")}>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {contactTopicLabels[topic]}
              </option>
            ))}
          </select>
          {errors.topic && <p className={errorClass}>{errors.topic.message}</p>}
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
          {...register("visitDate")}
        />
        {errors.visitDate && <p className={errorClass}>{errors.visitDate.message}</p>}
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
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {statusMessage && (
        <p
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
