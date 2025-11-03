import { style, styleVariants } from '@vanilla-extract/css';
import { themeContract } from './theme.css';
import { fadeUp } from './global.css';

// Animation delay utilities
export const animationDelay = styleVariants({
  100: { animationDelay: '100ms' },
  200: { animationDelay: '200ms' },
  300: { animationDelay: '300ms' },
  400: { animationDelay: '400ms' },
  500: { animationDelay: '500ms' },
  600: { animationDelay: '600ms' },
  700: { animationDelay: '700ms' },
  800: { animationDelay: '800ms' },
});

export const fadeUpAnimation = style({
  animation: `${fadeUp} 0.7s ease-out forwards`,
  opacity: 0,
});

// Common block patterns
export const hero = {
  container: style({
    paddingTop: themeContract.spacing[20],
    paddingBottom: themeContract.spacing[20],
    '@media': {
      '(min-width: 1024px)': {
        paddingTop: themeContract.spacing[40],
      },
    },
  }),
  grid: style({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: themeContract.spacing[10],
    '@media': {
      '(min-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  }),
  flexCol: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  tagline: style({
    lineHeight: '0',
    fontFamily: 'var(--font-sans)',
  }),
  taglineText: style({
    fontSize: themeContract.fontSize.base,
    fontWeight: themeContract.fontWeight.semibold,
  }),
  title: style({
    marginTop: themeContract.spacing[6],
    fontWeight: themeContract.fontWeight.bold,
    lineHeight: '1.1',
    fontSize: '2.25rem',
    '@media': {
      '(min-width: 768px)': {
        fontSize: '3rem',
      },
      '(min-width: 1024px)': {
        fontSize: '3.75rem',
      },
    },
  }),
  body: style({
    fontSize: themeContract.fontSize.lg,
    marginTop: themeContract.spacing[6],
  }),
  links: style({
    marginTop: themeContract.spacing[10],
    display: 'flex',
    flexWrap: 'wrap',
    gap: themeContract.spacing[4],
  }),
  image: style({
    borderRadius: themeContract.borderRadius.xl,
  }),
};

// Grid utilities
export const gridCols = styleVariants({
  1: {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  },
  2: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  3: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
  4: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
});

// Responsive grid
export const gridResponsive = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media': {
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

// Common spacing utilities
export const mt = styleVariants({
  3: { marginTop: themeContract.spacing[3] },
  4: { marginTop: themeContract.spacing[4] },
  6: { marginTop: themeContract.spacing[6] },
  8: { marginTop: themeContract.spacing[8] },
  10: { marginTop: themeContract.spacing[10] },
  12: { marginTop: themeContract.spacing[12] },
});

export const mb = styleVariants({
  3: { marginBottom: themeContract.spacing[3] },
  4: { marginBottom: themeContract.spacing[4] },
  6: { marginBottom: themeContract.spacing[6] },
  8: { marginBottom: themeContract.spacing[8] },
  10: { marginBottom: themeContract.spacing[10] },
  12: { marginBottom: themeContract.spacing[12] },
});

export const gap = styleVariants({
  2: { gap: themeContract.spacing[2] },
  3: { gap: themeContract.spacing[3] },
  4: { gap: themeContract.spacing[4] },
  5: { gap: themeContract.spacing[5] },
  6: { gap: themeContract.spacing[6] },
  8: { gap: themeContract.spacing[8] },
  10: { gap: themeContract.spacing[10] },
});

export const py = styleVariants({
  16: { paddingTop: themeContract.spacing[16], paddingBottom: themeContract.spacing[16] },
  20: { paddingTop: themeContract.spacing[20], paddingBottom: themeContract.spacing[20] },
  24: { paddingTop: themeContract.spacing[24], paddingBottom: themeContract.spacing[24] },
});

export const px = styleVariants({
  4: { paddingLeft: themeContract.spacing[4], paddingRight: themeContract.spacing[4] },
  6: { paddingLeft: themeContract.spacing[6], paddingRight: themeContract.spacing[6] },
  8: { paddingLeft: themeContract.spacing[8], paddingRight: themeContract.spacing[8] },
});

// Flex utilities
export const flexCol = style({
  display: 'flex',
  flexDirection: 'column',
});

export const flexRow = style({
  display: 'flex',
  flexDirection: 'row',
});

export const flexWrap = style({
  flexWrap: 'wrap',
});

export const justifyCenter = style({
  justifyContent: 'center',
});

export const itemsCenter = style({
  alignItems: 'center',
});

export const textCenter = style({
  textAlign: 'center',
});
