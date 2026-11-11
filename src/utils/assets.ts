/**
 * Resolves static asset paths to work reliably in all deployment environments:
 * GitHub Pages with repository subpath (e.g. https://user.github.io/repo/),
 * custom domains, root path, and local dev/preview servers.
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  // Remote URLs or data URLs require no transformation
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Normalize paths referencing old /src/assets/images/ or with leading slashes
  let normalized = path.trim();
  if (normalized.startsWith('./')) {
    normalized = normalized.replace(/^\.\//, '');
  }
  if (normalized.startsWith('/src/assets/images/')) {
    normalized = normalized.replace('/src/assets/images/', 'assets/images/');
  } else if (normalized.startsWith('src/assets/images/')) {
    normalized = normalized.replace('src/assets/images/', 'assets/images/');
  } else if (normalized.startsWith('/assets/')) {
    normalized = normalized.replace(/^\/+/, '');
  } else {
    normalized = normalized.replace(/^\/+/, '');
  }

  // In Vite, import.meta.env.BASE_URL holds the configured base path (e.g. './' or '/repo/')
  const base = import.meta.env?.BASE_URL || './';

  if (base === './') {
    return `./${normalized}`;
  }

  return base.endsWith('/') ? `${base}${normalized}` : `${base}/${normalized}`;
}
