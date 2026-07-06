import { z } from "zod";

export const contactTopics = ["pickup", "events", "visit", "general"] as const;

export const contactTopicLabels: Record<(typeof contactTopics)[number], string> = {
  pickup: "Pickup order",
  events: "Events & catering",
  visit: "Visit question",
  general: "General inquiry",
};

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120, "Email is too long."),
  phone: z.string().trim().max(40, "Phone number is too long.").optional(),
  topic: z.enum(contactTopics),
  visitDate: z.string().trim().max(80, "Preferred date is too long.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(1000, "Message must be under 1000 characters."),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
