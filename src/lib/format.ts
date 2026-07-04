export function formatCurrency(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("fr-FR", options).format(value);
}

export function formatPercent(value: number, fractionDigits = 1) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}

export function formatDate(value: Date | string, options?: Intl.DateTimeFormatOptions) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatDateTime(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeTime(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat("fr-FR", { numeric: "auto" });

  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 24 * 365],
    ["month", 60 * 24 * 30],
    ["week", 60 * 24 * 7],
    ["day", 60 * 24],
    ["hour", 60],
    ["minute", 1],
  ];

  for (const [unit, minutesInUnit] of divisions) {
    if (Math.abs(diffMinutes) >= minutesInUnit) {
      return rtf.format(Math.round(diffMinutes / minutesInUnit), unit);
    }
  }
  return rtf.format(diffMinutes, "minute");
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const COMBINING_DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
