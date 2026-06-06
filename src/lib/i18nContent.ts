// Helper to pick a localized string from a bilingual { tr, en } object.
export function pick(
  value: { tr: string; en: string },
  locale: string,
): string {
  return locale === 'en' ? value.en : value.tr;
}
