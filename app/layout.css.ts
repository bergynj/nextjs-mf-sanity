import { style } from '@vanilla-extract/css';

export const htmlRoot = style({
  vars: {
    '--font-sans': 'var(--font-sans)',
  },
});

export const body = style({
  minHeight: '100vh',
  fontFamily: 'var(--font-sans)',
  WebkitFontSmoothing: 'antialiased',
  overscrollBehavior: 'none',
});
