export const BRAND_COLORS = {
  primary: '#F86213',
  secondary: '#E5580F',
  accent: '#FF8C42',
  light: '#FFF4EE',
  dark: '#1A1A1A',
  white: '#FFFFFF',
} as const;

export const TEXT_COLORS = {
  primary: '#222222',
  secondary: '#666666',
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;
export type TextColor = keyof typeof TEXT_COLORS;
