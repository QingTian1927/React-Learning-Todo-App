/**
 * Generates a unique ID string with a date-time prefix (YYYYMMDDHHMMSS)
 * followed by a random alphanumeric suffix of length 6.
 *
 * Example: "20250826094218_a1b2c3"
 */
export function generateUniqueId(now: Date = new Date()): string {
  const dateTimePrefix =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0')

  const randomSuffix = Math.random().toString(36).substring(2, 8)

  return `${dateTimePrefix}_${randomSuffix}`
}
