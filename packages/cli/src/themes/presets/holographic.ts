import type { ThemeConfig } from '../../types/theme';

export const holo: ThemeConfig = {
  id: 'holographic-chrome',
  name: 'Holographic Chrome',
  category: 'futuristic',
  description: 'Iridescent chrome theme with metallic gradients and shine.',

  colors: {
    primary: '#C0C0C0',
    primaryHover: '#D3D3D3',
    primaryActive: '#A9A9A9',

    secondary: '#E6E6FA',
    secondaryHover: '#D8BFD8',
    secondaryActive: '#C0C0C0',

    accent: '#B0E0E6',
    accentHover: '#AFEEEE',
    accentActive: '#ADD8E6',

    background: '#1A1A1A',
    backgroundAlt: '#121212',

    surface: '#2A2A2A',
    surfaceAlt: '#333333',

    text: '#FFFFFF',
    textSecondary: '#DDDDDD',
    textMuted: '#BBBBBB',
    textInverse: '#000000',

    border: '#444444',
    borderLight: '#555555',
    borderHover: '#666666',

    success: '#7CFC00',

    warning: '#FFD700',

    error: '#FF4500',

    info: '#87CEEB',
  },

  dark: {
    primary: '#B0B0B0',
    primaryHover: '#C0C0C0',
    primaryActive: '#A9A9A9',

    secondary: '#D8BFD8',
    secondaryHover: '#E6E6FA',
    secondaryActive: '#C0C0C0',

    accent: '#AFEEEE',
    accentHover: '#B0E0E6',
    accentActive: '#87CEEB',

    background: '#000000',
    backgroundAlt: '#0D0D0D',

    surface: '#111111',
    surfaceAlt: '#1A1A1A',

    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textMuted: '#999999',
    textInverse: '#000000',

    border: '#555555',
    borderLight: '#666666',
    borderHover: '#777777',

    success: '#32CD32',

    warning: '#FFD700',

    error: '#FF6347',

    info: '#00CED1',
  },

  metadata: {
    accessibility: 'AA',
    contrastRatio: 4.5,
    mood: ['futuristic', 'shiny', 'modern'],
    tags: ['chrome', 'metallic', 'gradient'],
    industry: ['tech', 'fashion', 'luxury'],
    author: 'Ignix UI Team',
    version: '1.0.0',
    created: '2025-10-08',
    updated: '2025-10-08',
  },
};
