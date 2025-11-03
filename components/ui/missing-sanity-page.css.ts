import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';
import { container } from '@/styles/utils.css';

export const wrapper = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const heading = style({
  textAlign: 'center',
  fontSize: themeContract.fontSize['2xl'],
});

export const badgeText = style({
  fontSize: themeContract.fontSize.lg,
});

export { container };
