/** Join class names, skipping falsy values. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}

/** Human label for an external host, e.g. "myvitalharmony.com". */
export function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
