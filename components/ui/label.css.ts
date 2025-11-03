import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const label = style({
  fontSize: themeContract.fontSize.sm,
  lineHeight: '1',
  fontWeight: themeContract.fontWeight.medium,
  userSelect: 'none',
  selectors: {
    '&[data-disabled="true"]': {
      pointerEvents: 'none',
      opacity: themeContract.opacity[50],
    },
    '.group[data-disabled="true"] &': {
      pointerEvents: 'none',
      opacity: themeContract.opacity[50],
    },
    '&:has(~ :disabled)': {
      cursor: 'not-allowed',
      opacity: themeContract.opacity[50],
    },
  },
});
