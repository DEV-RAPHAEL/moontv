// Matches the CSS variables in the web app's src/app/globals.css.
export const colors = {
  bgPrimary: '#050b07',
  bgSecondary: '#08170c',
  bgTertiary: '#0c2112',
  textPrimary: '#ffffff',
  textSecondary: '#a3b8aa',
  accentGold: '#d8b642',
  accentGoldHover: '#f0cd56',
  buttonGreen: '#145927',
  buttonGreenHover: '#1b7333',
  border: '#1a3321',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;
