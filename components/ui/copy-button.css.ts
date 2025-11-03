import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const copyButton = style({
  padding: themeContract.spacing[2],
  borderRadius: themeContract.borderRadius.md,
  transition: 'colors 0.2s',
  ':hover': {
    backgroundColor: `${themeContract.color.mutedForeground}1a`,
  },
});

export const copyIcon = style({
  width: themeContract.spacing[4],
  height: themeContract.spacing[4],
  color: themeContract.color.mutedForeground,
});

export const checkIcon = style({
  width: themeContract.spacing[4],
  height: themeContract.spacing[4],
  color: '#22c55e', // green-500
});
