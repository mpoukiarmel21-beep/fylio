/**
 * Palette Fylio — extraite par analyse colorimétrique des maquettes D:\FYLIO\PAGES
 * Direction artistique : monochrome bleu décliné en intensités
 */

export const colors = {
  // Accent principal — boutons, CTA
  primary: '#005EFE',
  primaryPressed: '#0049C8',
  primaryDisabled: '#A8C6FE',

  // Fonds
  background: '#F1F8FE',
  surface: '#FFFFFF',
  surfaceAlt: '#E8F2FE',

  // Éléments clairs — cartes, illustrations
  skyLight: '#C0E3FD',
  skyMedium: '#97D0FD',

  // Texte
  text: '#1A2B45',
  textSecondary: '#5A7396',
  textOnPrimary: '#FFFFFF',

  // États
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',

  // Bordures
  border: '#D6E8FD',

  // Mode sombre
  dark: {
    background: '#0B1B33',
    surface: '#12244A',
    surfaceAlt: '#1A3260',
    text: '#E8F1FE',
    textSecondary: '#7E9CC7',
    border: '#24427A',
  },
} as const;

export type Colors = typeof colors;
