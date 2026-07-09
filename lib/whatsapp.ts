export function getWhatsAppHref(value: string | null | undefined) {
  if (!value) {
    return null
  }

  const digits = value.trim().replace(/[^\d]/g, "")

  if (!digits) {
    return null
  }

  const internationalNumber = digits.startsWith("00") ? digits.slice(2) : digits

  return `https://wa.me/${internationalNumber}`
}
