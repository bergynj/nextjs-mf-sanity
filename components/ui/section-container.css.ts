import { style, styleVariants } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';
import { container } from '@/styles/utils.css';

export const sectionBase = style({
  position: 'relative',
});

export const sectionPaddingTop = style({
  paddingTop: themeContract.spacing[16],
  '@media': {
    '(min-width: 1280px)': {
      paddingTop: themeContract.spacing[20],
    },
  },
});

export const sectionPaddingBottom = style({
  paddingBottom: themeContract.spacing[16],
  '@media': {
    '(min-width: 1280px)': {
      paddingBottom: themeContract.spacing[20],
    },
  },
});

export const colorVariants = styleVariants({
  background: {
    backgroundColor: themeContract.color.background,
  },
  muted: {
    backgroundColor: themeContract.color.muted,
  },
  card: {
    backgroundColor: themeContract.color.card,
  },
  primary: {
    backgroundColor: themeContract.color.primary,
  },
  secondary: {
    backgroundColor: themeContract.color.secondary,
  },
  accent: {
    backgroundColor: themeContract.color.accent,
  },
});

export { container };
