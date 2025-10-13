import { ThemeEngine } from './ThemeEngine';

const base = ThemeEngine.createTheme({
  id: 'brand-ocean',
  name: 'Brand Ocean',
  category: 'brand',
  primary: '#2563EB',          // blue
  secondary: '#14B8A6',        // teal
  accent: '#F59E0B',           // amber
  generateDark: true,
  contrastLevel: 'AA',
});

const { theme, validation } = ThemeEngine.validateAndFix(base, 'AA');

console.log(validation);
const css = ThemeEngine.toCss(theme);
console.log(css);
// Write css to file or inject at runtime into a <style> tag.
// document.head.appendChild(Object.assign(document.createElement('style'), { textContent: css }));
