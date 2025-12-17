export function toIsoDateFromDotNotation(value) {
  if (!value) return null;

  const match = value
    .trim()
    .match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);

  if (!match) return null;

  const [, day, month, year] = match;
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
