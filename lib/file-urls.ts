function getFileServerBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_FILE_SERVER_URL ||
    process.env.FILE_SERVER_URL ||
    "https://files.system.makerspace-lesvos.org"
  );
}

export function toAbsoluteFileUrl(value?: string | null) {
  if (!value) {
    return value ?? null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return `${getFileServerBaseUrl()}${trimmed}`;
  }

  return trimmed;
}
