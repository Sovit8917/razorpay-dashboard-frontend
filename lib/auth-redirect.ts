export function buildLoginRedirect(pathname: string): string {
  return `/login?redirectTo=${encodeURIComponent(pathname)}`;
}