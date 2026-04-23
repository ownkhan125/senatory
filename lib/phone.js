// Live client-side formatter — bind to a phone input's onChange.
// Produces the canonical "+1 (xxx) xxx-xxxx" format, stripping any user-supplied
// leading "+1" or "1" so we own the country code.
export function formatPhoneInput(input) {
  if (!input) return ''

  const startsWithPlusOne = /^\s*\+\s*1/.test(input)
  let digits = input.replace(/\D/g, '')

  if (startsWithPlusOne && digits.startsWith('1')) {
    digits = digits.slice(1)
  } else if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }

  if (digits.length === 0) return ''
  digits = digits.slice(0, 10)

  if (digits.length < 4) return `+1 (${digits}`
  if (digits.length < 7) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

// Server-side canonical producer. Partial entries (fewer than 10 digits) map to ''.
export function normalizePhoneForSubmit(input) {
  if (!input) return ''

  let digits = String(input).replace(/\D/g, '')

  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }

  if (digits.length !== 10) return ''
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}
