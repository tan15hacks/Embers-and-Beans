"use client";

import { type FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPesoAmount } from "@/lib/money";

export type OrderMenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  unitPrice: number;
};

type OrderFormProps = {
  items: OrderMenuItem[];
};

type CustomerDetails = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupTime: string;
  notes: string;
};

const inputClass =
  "h-13 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/70";

const initialDetails: CustomerDetails = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  pickupTime: "",
  notes: "",
};

export function OrderForm({ items }: OrderFormProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [details, setDetails] = useState<CustomerDetails>(initialDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  );

  const selectedItems = useMemo(
    () =>
      items
        .map((item) => ({ ...item, quantity: quantities[item.id] ?? 0 }))
        .filter((item) => item.quantity > 0),
    [items, quantities],
  );

  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  function setQuantity(itemId: string, nextQuantity: number) {
    setQuantities((current) => ({
      ...current,
      [itemId]: Math.max(0, Math.min(99, nextQuantity)),
    }));
  }

  function updateDetails<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (selectedItems.length === 0) {
      setStatus("error");
      setStatusMessage("Please choose at least one item before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...details,
          items: selectedItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(payload.message ?? "Please check your order and try again.");
        return;
      }

      setStatus("success");
      setStatusMessage(payload.message ?? "Order request received. We will confirm by email.");
      setDetails(initialDetails);
      setQuantities({});
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <section className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="overflow-hidden rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
            <div className="border-b border-[#2B1E18]/10 px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793C]">
                {category}
              </p>
            </div>

            <div className="divide-y divide-[#2B1E18]/10">
              {items
                .filter((item) => item.category === category)
                .map((item) => {
                  const quantity = quantities[item.id] ?? 0;

                  return (
                    <article key={item.id} className="grid gap-5 px-6 py-5 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <h2 className="font-[var(--font-display)] text-3xl font-semibold leading-tight">
                            {item.name}
                          </h2>
                          <span className="w-fit rounded-full bg-[#2B1E18] px-4 py-2 text-sm font-semibold text-[#FFFDFB]">
                            {item.price}
                          </span>
                        </div>
                        <p className="mt-2 leading-7 text-[#4A342A]/70">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex w-fit items-center rounded-full border border-[#2B1E18]/10 bg-[#F8F4EF] p-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, quantity - 1)}
                          className="flex size-10 items-center justify-center rounded-full text-[#2B1E18] transition hover:bg-[#FFFDFB]"
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-10 text-center text-sm font-bold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, quantity + 1)}
                          className="flex size-10 items-center justify-center rounded-full bg-[#2B1E18] text-[#FFFDFB] transition hover:bg-[#4A342A]"
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        ))}
      </section>

      <aside className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_24px_90px_rgba(43,30,24,0.1)] lg:sticky lg:top-28">
        <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
          <ShoppingBag size={26} />
        </div>
        <h2 className="font-[var(--font-display)] text-4xl font-semibold">Your order</h2>
        <p className="mt-3 text-sm leading-6 text-[#4A342A]/70">
          Submit your pickup request. The shop confirms availability before preparing the order.
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-[#F8F4EF] p-4">
          {selectedItems.length === 0 ? (
            <p className="text-sm text-[#4A342A]/60">No items selected yet.</p>
          ) : (
            selectedItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                <span className="text-[#4A342A]/80">
                  {item.quantity}× {item.name}
                </span>
                <span className="font-semibold text-[#2B1E18]">
                  {formatPesoAmount(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))
          )}
          <div className="border-t border-[#2B1E18]/10 pt-3">
            <div className="flex items-center justify-between font-[var(--font-display)] text-3xl font-semibold">
              <span>Total</span>
              <span>{formatPesoAmount(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <div>
            <label htmlFor="customerName" className={labelClass}>Name</label>
            <input id="customerName" required className={inputClass} value={details.customerName} onChange={(event) => updateDetails("customerName", event.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="customerEmail" className={labelClass}>Email</label>
            <input id="customerEmail" type="email" required className={inputClass} value={details.customerEmail} onChange={(event) => updateDetails("customerEmail", event.target.value)} placeholder="you@email.com" />
          </div>
          <div>
            <label htmlFor="customerPhone" className={labelClass}>Phone optional</label>
            <input id="customerPhone" className={inputClass} value={details.customerPhone} onChange={(event) => updateDetails("customerPhone", event.target.value)} placeholder="+63 912 345 6789" />
          </div>
          <div>
            <label htmlFor="pickupTime" className={labelClass}>Pickup time</label>
            <input id="pickupTime" required className={inputClass} value={details.pickupTime} onChange={(event) => updateDetails("pickupTime", event.target.value)} placeholder="Today around 4 PM" />
          </div>
          <div>
            <label htmlFor="notes" className={labelClass}>Notes optional</label>
            <textarea
              id="notes"
              rows={4}
              className="w-full resize-none rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 py-4 text-sm leading-7 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
              value={details.notes}
              onChange={(event) => updateDetails("notes", event.target.value)}
              placeholder="Less ice, separate bag, pickup name, etc."
            />
          </div>
        </div>

        {statusMessage && (
          <div
            role="status"
            className={
              status === "success"
                ? "mt-5 flex items-start gap-3 rounded-2xl border border-[#6E7A5C]/20 bg-[#6E7A5C]/10 px-4 py-4 text-sm font-semibold text-[#4F5F3F]"
                : "mt-5 rounded-2xl border border-[#9B3A2F]/20 bg-[#9B3A2F]/10 px-4 py-4 text-sm font-semibold text-[#9B3A2F]"
            }
          >
            {status === "success" && <CheckCircle2 className="mt-0.5 shrink-0" size={18} />}
            <span>{statusMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#2B1E18] px-8 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Pickup Order"}
        </button>
      </aside>
    </form>
  );
}
