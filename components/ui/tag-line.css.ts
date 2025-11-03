import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const tagLine = style({
  display: 'inline-block',
  lineHeight: '0',
  fontSize: themeContract.fontSize.base,
  fontWeight: themeContract.fontWeight.semibold,
});
