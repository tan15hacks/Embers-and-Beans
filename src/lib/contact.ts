export const contactTopics = ["pickup", "events", "visit", "general"] as const;

export type ContactTopic = (typeof contactTopics)[number];

export type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  topic: ContactTopic;
  visitDate?: string;
  message: string;
  website?: string;
};

export type ContactValidationResult =
  | { success: true; data: ContactFormValues }
  | { success: false; errors: Partial<Record<keyof ContactFormValues, string>> };

export const contactTopicLabels: Record<ContactTopic, string> = {
  pickup: "Pickup order",
  events: "Events & catering",
  visit: "Visit question",
  general: "General inquiry",
};

export function validateContactForm(input: unknown): ContactValidationResult {
  const values = normalizeContactInput(input);
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (values.website) {
    errors.website = "Spam detected.";
  }

  if (values.name.length < 2) {
    errors.name = "Please enter your name.";
  }

  if (values.name.length > 80) {
    errors.name = "Name is too long.";
  }

  if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.email.length > 120) {
    errors.email = "Email is too long.";
  }

  if (values.phone && values.phone.length > 40) {
    errors.phone = "Phone number is too long.";
  }

  if (!contactTopics.includes(values.topic)) {
    errors.topic = "Please choose a valid topic.";
  }

  if (values.visitDate && values.visitDate.length > 80) {
    errors.visitDate = "Preferred date is too long.";
  }

  if (values.message.length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  if (values.message.length > 1000) {
    errors.message = "Message must be under 1000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: values };
}

function normalizeContactInput(input: unknown): ContactFormValues {
  const value = isRecord(input) ? input : {};

  return {
    name: toText(value.name),
    email: toText(value.email),
    phone: toText(value.phone),
    topic: toContactTopic(value.topic),
    visitDate: toText(value.visitDate),
    message: toText(value.message),
    website: toText(value.website),
  };
}

function toText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toContactTopic(value: unknown): ContactTopic {
  return contactTopics.includes(value as ContactTopic)
    ? (value as ContactTopic)
    : "pickup";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
