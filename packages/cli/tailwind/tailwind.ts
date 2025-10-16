import plugin from 'tailwindcss/plugin';

export const ignixTailwindPlugin = plugin(({ addUtilities }) => {
  const colors = {
    primary: 'var(--primary)',
    'primary-hover': 'var(--primary-hover)',
    'primary-active': 'var(--primary-active)',
    secondary: 'var(--secondary)',
    'secondary-hover': 'var(--secondary-hover)',
    'secondary-active': 'var(--secondary-active)',
    accent: 'var(--accent)',
    background: 'var(--background)',
    'background-alt': 'var(--background-alt)',
    surface: 'var(--surface)',
    'surface-alt': 'var(--surface-alt)',
    text: 'var(--text)',
    'text-secondary': 'var(--text-secondary)',
    'text-muted': 'var(--text-muted)',
    'text-inverse': 'var(--text-inverse)',
    border: 'var(--border)',
    'border-light': 'var(--border-light)',
    'border-hover': 'var(--border-hover)',
    success: 'var(--success)',
    'success-hover': 'var(--success-hover)',
    warning: 'var(--warning)',
    'warning-hover': 'var(--warning-hover)',
    error: 'var(--error)',
    'error-hover': 'var(--error-hover)',
    info: 'var(--info)',
    'info-hover': 'var(--info-hover)',
  };

  const utilities: Record<string, Record<string, string>> = {};

  Object.entries(colors).forEach(([key, value]) => {
    utilities[`.bg-${key}`] = { backgroundColor: value };
    utilities[`.text-${key}`] = { color: value };
    utilities[`.border-${key}`] = { borderColor: value };
  });

  addUtilities(utilities, ['responsive', 'hover', 'active']);
});
