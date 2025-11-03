import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeContract } from './theme.css';
import { fadeUp, accordionDown, accordionUp } from './global.css';

// Container utility
export const container = style({
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: themeContract.spacing[4],
  paddingRight: themeContract.spacing[4],
  '@media': {
    '(min-width: 640px)': {
      maxWidth: '640px',
      paddingLeft: themeContract.spacing[8],
      paddingRight: themeContract.spacing[8],
    },
    '(min-width: 768px)': {
      maxWidth: '768px',
    },
    '(min-width: 1024px)': {
      maxWidth: '1024px',
    },
    '(min-width: 1280px)': {
      maxWidth: '1280px',
      paddingLeft: themeContract.spacing[16],
      paddingRight: themeContract.spacing[16],
    },
  },
});

// Animation utilities
export const animateFadeUp = style({
  animation: `${fadeUp} 0.7s ease-out forwards`,
  opacity: 0,
});

export const animateAccordionDown = style({
  animation: `${accordionDown} 0.2s ease-out`,
});

export const animateAccordionUp = style({
  animation: `${accordionUp} 0.2s ease-out`,
});

// Flex utilities
export const flex = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
      rowReverse: { flexDirection: 'row-reverse' },
      columnReverse: { flexDirection: 'column-reverse' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
    wrap: {
      wrap: { flexWrap: 'wrap' },
      nowrap: { flexWrap: 'nowrap' },
      wrapReverse: { flexWrap: 'wrap-reverse' },
    },
    gap: {
      0: { gap: themeContract.spacing[0] },
      1: { gap: themeContract.spacing[1] },
      2: { gap: themeContract.spacing[2] },
      3: { gap: themeContract.spacing[3] },
      4: { gap: themeContract.spacing[4] },
      5: { gap: themeContract.spacing[5] },
      6: { gap: themeContract.spacing[6] },
      8: { gap: themeContract.spacing[8] },
      10: { gap: themeContract.spacing[10] },
    },
  },
});

// Grid utilities
export const grid = recipe({
  base: {
    display: 'grid',
  },
  variants: {
    cols: {
      1: { gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' },
      2: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
      3: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
      4: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
      6: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
      12: { gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' },
    },
    gap: {
      0: { gap: themeContract.spacing[0] },
      1: { gap: themeContract.spacing[1] },
      2: { gap: themeContract.spacing[2] },
      3: { gap: themeContract.spacing[3] },
      4: { gap: themeContract.spacing[4] },
      5: { gap: themeContract.spacing[5] },
      6: { gap: themeContract.spacing[6] },
      8: { gap: themeContract.spacing[8] },
      10: { gap: themeContract.spacing[10] },
    },
  },
});

// Typography utilities
export const text = recipe({
  variants: {
    size: {
      xs: { fontSize: themeContract.fontSize.xs },
      sm: { fontSize: themeContract.fontSize.sm },
      base: { fontSize: themeContract.fontSize.base },
      lg: { fontSize: themeContract.fontSize.lg },
      xl: { fontSize: themeContract.fontSize.xl },
      '2xl': { fontSize: themeContract.fontSize['2xl'] },
      '3xl': { fontSize: themeContract.fontSize['3xl'] },
      '4xl': { fontSize: themeContract.fontSize['4xl'] },
      '5xl': { fontSize: themeContract.fontSize['5xl'] },
      '6xl': { fontSize: themeContract.fontSize['6xl'] },
    },
    weight: {
      normal: { fontWeight: themeContract.fontWeight.normal },
      medium: { fontWeight: themeContract.fontWeight.medium },
      semibold: { fontWeight: themeContract.fontWeight.semibold },
      bold: { fontWeight: themeContract.fontWeight.bold },
      extrabold: { fontWeight: themeContract.fontWeight.extrabold },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
  },
});

// Common utility styles
export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
});

export const rounded = recipe({
  variants: {
    size: {
      none: { borderRadius: themeContract.borderRadius.none },
      sm: { borderRadius: themeContract.borderRadius.sm },
      base: { borderRadius: themeContract.borderRadius.base },
      md: { borderRadius: themeContract.borderRadius.md },
      lg: { borderRadius: themeContract.borderRadius.lg },
      xl: { borderRadius: themeContract.borderRadius.xl },
      '2xl': { borderRadius: themeContract.borderRadius['2xl'] },
      full: { borderRadius: themeContract.borderRadius.full },
    },
  },
});
