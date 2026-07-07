export function parsePesoAmount(price: string) {
  const numericValue = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numericValue) ? Math.round(numericValue) : 0;
}

export function formatPesoAmount(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}
