import { CardDesign, ProductType } from '../types';

export const IDENTITY_TEMPLATES: CardDesign[] = [
  {
    id: 'id-emerald',
    name: 'Emerald Corporate (Standard)',
    themeClass: 'from-[#065F46] to-[#047857]',
    headerBg: 'bg-emerald-900',
    bodyBg: 'bg-emerald-50/30',
    textColor: 'text-slate-900',
    subtitleColor: 'text-emerald-700',
    accentColor: '#10B981',
    borderClass: 'border-emerald-500',
    badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    patternType: 'guilloche',
  },
  {
    id: 'id-midnight',
    name: 'Midnight Cyber',
    themeClass: 'from-[#0F172A] to-[#1E293B]',
    headerBg: 'bg-slate-950',
    bodyBg: 'bg-slate-900',
    textColor: 'text-slate-100',
    subtitleColor: 'text-cyan-400',
    accentColor: '#06B6D4',
    borderClass: 'border-cyan-500/50',
    badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    patternType: 'grid',
  },
  {
    id: 'id-royal',
    name: 'Royal Amethyst',
    themeClass: 'from-[#581C87] to-[#6B21A8]',
    headerBg: 'bg-purple-950',
    bodyBg: 'bg-purple-50/40',
    textColor: 'text-slate-900',
    subtitleColor: 'text-purple-700',
    accentColor: '#A855F7',
    borderClass: 'border-purple-400',
    badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
    patternType: 'geometric',
  },
  {
    id: 'id-slate',
    name: 'Minimal Stark',
    themeClass: 'from-[#1E293B] to-[#334155]',
    headerBg: 'bg-slate-800',
    bodyBg: 'bg-slate-50',
    textColor: 'text-slate-900',
    subtitleColor: 'text-slate-500',
    accentColor: '#64748B',
    borderClass: 'border-slate-300',
    badgeStyle: 'bg-slate-100 text-slate-800 border-slate-200',
    patternType: 'minimal',
  },
];

export const ACCESS_TEMPLATES: CardDesign[] = [
  {
    id: 'acc-summit',
    name: 'Vanguard Eco-Summit',
    themeClass: 'from-[#0F5132] to-[#198754]',
    headerBg: 'bg-green-950',
    bodyBg: 'bg-stone-50',
    textColor: 'text-slate-900',
    subtitleColor: 'text-green-800',
    accentColor: '#198754',
    borderClass: 'border-green-600',
    badgeStyle: 'bg-green-100 text-green-900 border-green-200',
    patternType: 'geometric',
  },
  {
    id: 'acc-red',
    name: 'Metro Tech Expo',
    themeClass: 'from-[#991B1B] to-[#DC2626]',
    headerBg: 'bg-red-950',
    bodyBg: 'bg-zinc-50',
    textColor: 'text-zinc-900',
    subtitleColor: 'text-red-700',
    accentColor: '#EF4444',
    borderClass: 'border-red-500',
    badgeStyle: 'bg-red-50 text-red-700 border-red-200',
    patternType: 'dots',
  },
  {
    id: 'acc-cosmic',
    name: 'Cosmic VIP Gala',
    themeClass: 'from-[#1E1B4B] to-[#312E81]',
    headerBg: 'bg-indigo-950',
    bodyBg: 'bg-indigo-950/90',
    textColor: 'text-indigo-100',
    subtitleColor: 'text-indigo-300',
    accentColor: '#6366F1',
    borderClass: 'border-indigo-400/40',
    badgeStyle: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    patternType: 'guilloche',
  },
];

export const PRODUCT_TEMPLATES: CardDesign[] = [
  {
    id: 'prod-seal',
    name: 'Premium Authenticity Seal',
    themeClass: 'from-[#14532D] to-[#166534]',
    headerBg: 'bg-emerald-950',
    bodyBg: 'bg-orange-50/20',
    textColor: 'text-slate-900',
    subtitleColor: 'text-emerald-800 font-semibold',
    accentColor: '#15803D',
    borderClass: 'border-amber-400',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300',
    patternType: 'guilloche',
  },
  {
    id: 'prod-modern',
    name: 'Electric Holo-Label',
    themeClass: 'from-[#1E3A8A] to-[#1D4ED8]',
    headerBg: 'bg-blue-950',
    bodyBg: 'bg-blue-50/30',
    textColor: 'text-slate-900',
    subtitleColor: 'text-blue-700',
    accentColor: '#3B82F6',
    borderClass: 'border-blue-500',
    badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
    patternType: 'grid',
  },
  {
    id: 'prod-nature',
    name: 'Pure Eco-Trust Label',
    themeClass: 'from-[#365314] to-[#4D7C0F]',
    headerBg: 'bg-lime-950',
    bodyBg: 'bg-[#F2F4EE]',
    textColor: 'text-[#2D3319]',
    subtitleColor: 'text-[#4D7C0F]',
    accentColor: '#65A30D',
    borderClass: 'border-lime-700',
    badgeStyle: 'bg-lime-100 text-lime-900 border-lime-200',
    patternType: 'dots',
  },
];

export function getTemplatesForProduct(type: ProductType): CardDesign[] {
  switch (type) {
    case 'identity':
      return IDENTITY_TEMPLATES;
    case 'access':
      return ACCESS_TEMPLATES;
    case 'product':
      return PRODUCT_TEMPLATES;
  }
}
