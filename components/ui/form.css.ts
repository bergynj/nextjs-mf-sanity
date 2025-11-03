import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const formItem = style({
  display: 'grid',
  gap: themeContract.spacing[2],
});

export const formLabel = style({
  selectors: {
    '&[data-error="true"]': {
      color: themeContract.color.destructive,
    },
  },
});

export const formDescription = style({
  color: themeContract.color.mutedForeground,
  fontSize: themeContract.fontSize.sm,
});

export const formMessage = style({
  color: themeContract.color.destructive,
  fontSize: themeContract.fontSize.sm,
  fontWeight: themeContract.fontWeight.medium,
});
