import { style, styleVariants } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const starContainer = style({
  display: 'flex',
  gap: themeContract.spacing[1],
});

export const starSize = styleVariants({
  sm: {
    width: themeContract.spacing[4],
    height: themeContract.spacing[4],
  },
  lg: {
    width: themeContract.spacing[8],
    height: themeContract.spacing[8],
  },
});

export const starFilled = style({
  fill: '#facc15',
  color: '#facc15',
});

export const starEmpty = style({
  color: '#d1d5db',
});
