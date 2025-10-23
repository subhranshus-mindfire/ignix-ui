import type { ThemeConfig } from '../../types/theme';

export const forestMist: ThemeConfig = {
  id: 'forest-mist',
  name: 'Forest Mist',
  category: 'minimalist',
  description:
    'Light and deep greens inspired by misty forests — a calm, natural, and minimal aesthetic for serene interfaces.',

  colors: {
    primary: '#228B22',
    primaryHover: '#2E8B57',
    primaryActive: '#006400',

    secondary: '#006400',
    secondaryHover: '#2E8B57',
    secondaryActive: '#3CB371',

    accent: '#90EE90',
    accentHover: '#98FB98',
    accentActive: '#8FBC8F',

    background: '#F0FFF0',
    backgroundAlt: '#E8F5E9',

    surface: '#E0FFE0',
    surfaceAlt: '#DFF0D8',

    text: '#111111',
    textSecondary: '#333333',
    textMuted: '#666666',
    textInverse: '#FFFFFF',

    border: '#CCCCCC',
    borderLight: '#DDDDDD',
    borderHover: '#BBBBBB',

    success: '#2E8B57',

    warning: '#FFD700',

    error: '#B22222',

    info: '#4682B4',
  },

  dark: {
    primary: '#006400',
    primaryHover: '#2E8B57',
    primaryActive: '#228B22',

    secondary: '#2E8B57',
    secondaryHover: '#3CB371',
    secondaryActive: '#006400',

    accent: '#3CB371',
    accentHover: '#2E8B57',
    accentActive: '#228B22',

    background: '#000000',
    backgroundAlt: '#0D0D0D',

    surface: '#1A1A1A',
    surfaceAlt: '#222222',

    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textMuted: '#888888',
    textInverse: '#000000',

    border: '#444444',
    borderLight: '#555555',
    borderHover: '#666666',

    success: '#32CD32',

    warning: '#FF8C00',

    error: '#FF6347',

    info: '#00CED1',
  },

  metadata: {
    accessibility: 'AA',
    contrastRatio: 5.1,
    mood: ['natural', 'calm', 'minimal'],
    tags: ['forest', 'green', 'mist'],
    industry: ['nature', 'eco', 'branding'],
    author: 'Ignix UI Team',
    version: '1.0.0',
    created: '2025-10-08',
    updated: '2025-10-08',
  },
};
