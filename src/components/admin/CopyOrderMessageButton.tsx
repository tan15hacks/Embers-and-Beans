"use client";

import { useState } from "react";
import { Clipboard } from "lucide-react";

type CopyOrderMessageButtonProps = {
  message: string;
};

export function CopyOrderMessageButton({ message }: CopyOrderMessageButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyMessage}
      className="inline-flex h-11 items-center justify-center rounded-full border border-[#2B1E18]/10 px-6 text-sm font-semibold text-[#4A342A]/70 transition hover:bg-[#F8F4EF]"
    >
      <Clipboard className="mr-2" size={16} /> {copied ? "Copied" : "Copy Message"}
    </button>
  );
}
