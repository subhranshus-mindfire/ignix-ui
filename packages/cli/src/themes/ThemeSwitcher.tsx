import React from 'react';
import { useTheme } from './ThemeProvider';
import type { ThemeConfig } from '../types/theme';

import { cyberpunk } from './presets/cyberPunk';
import { forestMist } from './presets/forestMist';
import { holo } from './presets/holographic';

const availableThemes: ThemeConfig[] = [cyberpunk, forestMist, holo];

export const ThemeSwitcher: React.FC = () => {
  const { state, setTheme } = useTheme();

  const handleThemeSelect = (theme: ThemeConfig) => {
    setTheme(theme);
    localStorage.setItem('ignix-theme', theme.id);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-surface border border-border rounded-xl shadow-sm transition-all">
      <h4 className="text-text-secondary font-semibold">Theme</h4>

      <div className="flex gap-3 flex-wrap">
        {availableThemes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleThemeSelect(t)}
            title={t.name}
            aria-label={`Switch to ${t.name} theme`}
            className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              state.currentTheme?.id === t.id
                ? 'ring-2 ring-accent scale-110'
                : 'hover:scale-105 hover:ring-1 hover:ring-border'
            }`}
            style={{ backgroundColor: t.colors.primary }}
          >
            <span className="sr-only">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
