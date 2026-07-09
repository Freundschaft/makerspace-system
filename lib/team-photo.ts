export function getTeamMemberPhotoSrc(value?: string | null) {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined

  if (trimmed.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${trimmed}`
  }

  if (
    trimmed.startsWith("data:image/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed
  }

  return `data:image/png;base64,${trimmed}`
}
