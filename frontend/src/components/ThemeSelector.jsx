import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Check } from 'lucide-react';

export const THEME_PRESETS = [
  {
    id: 'cyber-violet',
    name: 'Cyber Violet & Cyan (Default)',
    bgDark: '#050507',
    bgCard: '#0A0A0F',
    accentGrad: 'from-purple-500 to-cyan-400',
    dotColor: 'bg-purple-500'
  },
  {
    id: 'cobalt-blue',
    name: 'Deep Space Cobalt',
    bgDark: '#030712',
    bgCard: '#0F172A',
    accentGrad: 'from-blue-500 to-cyan-400',
    dotColor: 'bg-blue-500'
  },
  {
    id: 'crimson-ember',
    name: 'Solar Crimson Ember',
    bgDark: '#090406',
    bgCard: '#1A0C13',
    accentGrad: 'from-rose-500 to-amber-400',
    dotColor: 'bg-rose-500'
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest Jade',
    bgDark: '#02140E',
    bgCard: '#0A261D',
    accentGrad: 'from-emerald-500 to-teal-300',
    dotColor: 'bg-emerald-500'
  },
  {
    id: 'amethyst-gold',
    name: 'Royal Amethyst Gold',
    bgDark: '#0B0410',
    bgCard: '#190A24',
    accentGrad: 'from-purple-600 to-amber-400',
    dotColor: 'bg-purple-600'
  }
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('cyber-violet');

  const applyTheme = (theme) => {
    setActiveThemeId(theme.id);
    document.documentElement.style.setProperty('--bg-dark', theme.bgDark);
    document.documentElement.style.setProperty('--bg-card', theme.bgCard);
    document.body.style.backgroundColor = theme.bgDark;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#0A0A12]/90 border border-brand-violet/40 text-brand-cyan shadow-2xl backdrop-blur-xl hover:scale-105 transition-all group"
      >
        <Palette className="w-5 h-5 group-hover:rotate-45 transition-transform text-brand-cyan" />
        <span className="text-xs font-mono font-bold text-white">Try Themes</span>
      </button>

      {/* Theme Drawer Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-[#0A0A12]/95 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              Live Theme Playground
            </span>
            <span className="text-[10px] text-slate-400">Click to preview</span>
          </div>

          <div className="space-y-2">
            {THEME_PRESETS.map((t) => {
              const isActive = activeThemeId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => applyTheme(t)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-white/10 border-brand-cyan text-white shadow-glow-cyan'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full ${t.dotColor}`} />
                    <span className="text-xs font-medium">{t.name}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-brand-cyan" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
