// Mask email for display (e.g., "hello@example.com" -> "h***o@example.com")
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return email

  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`
  }

  const firstChar = localPart[0]
  const lastChar = localPart[localPart.length - 1]
  const masked = firstChar + '*'.repeat(Math.max(1, localPart.length - 2)) + lastChar

  return `${masked}@${domain}`
}

// Format date to relative time (e.g., "2 days ago")
export function timeAgo(date: string | Date): string {
  const now = new Date()
  const reviewDate = typeof date === 'string' ? new Date(date) : date
  const seconds = Math.floor((now.getTime() - reviewDate.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`

  return reviewDate.toLocaleDateString()
}

// Get avatar initial from name
export function getInitial(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
