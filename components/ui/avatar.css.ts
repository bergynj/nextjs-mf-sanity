import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const avatar = style({
  position: 'relative',
  display: 'flex',
  width: themeContract.spacing[8],
  height: themeContract.spacing[8],
  flexShrink: '0',
  overflow: 'hidden',
  borderRadius: themeContract.borderRadius.full,
});

export const avatarImage = style({
  aspectRatio: '1 / 1',
  width: '100%',
  height: '100%',
});

export const avatarFallback = style({
  backgroundColor: themeContract.color.muted,
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: themeContract.borderRadius.full,
});
