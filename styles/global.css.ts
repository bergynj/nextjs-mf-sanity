import { globalStyle, keyframes } from '@vanilla-extract/css';
import { themeContract } from './theme.css';

// Keyframe animations
export const accordionDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' },
});

export const accordionUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' },
});

export const fadeUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

// Global styles
globalStyle('*', {
  borderColor: themeContract.color.border,
  outlineColor: `${themeContract.color.ring}80`, // 50% opacity
});

globalStyle('body', {
  backgroundColor: themeContract.color.background,
  color: themeContract.color.foreground,
  fontFamily: 'var(--font-sans)',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('h1', {
  fontFamily: 'var(--font-sans)',
  fontSize: '2.5rem',
  lineHeight: '1.2',
  fontWeight: '700',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '3.5rem',
    },
  },
});

globalStyle('h2', {
  fontFamily: 'var(--font-sans)',
  fontSize: '2rem',
  lineHeight: '1.2',
  fontWeight: '700',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

globalStyle('h3', {
  fontFamily: 'var(--font-sans)',
  fontSize: '1.5rem',
  lineHeight: '1.2',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '2rem',
    },
  },
});

globalStyle('h4', {
  fontFamily: 'var(--font-sans)',
  fontSize: '1.25rem',
  lineHeight: '1.3',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.5rem',
    },
  },
});

globalStyle('h5', {
  fontFamily: 'var(--font-sans)',
  fontSize: '1.125rem',
  lineHeight: '1.4',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
});

globalStyle('h6', {
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  lineHeight: '1.4',
});
