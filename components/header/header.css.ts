import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const header = style({
  position: 'sticky',
  top: '0',
  width: '100%',
  borderBottom: `1px solid ${themeContract.color.border}66`,
  backgroundColor: `${themeContract.color.background}f2`,
  zIndex: '50',
  backdropFilter: 'blur(8px)',
});

export const headerContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: themeContract.spacing[14],
});

export const desktopNav = style({
  display: 'none',
  gap: themeContract.spacing[7],
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    '(min-width: 1280px)': {
      display: 'flex',
    },
  },
});

export const mobileNav = style({
  display: 'flex',
  alignItems: 'center',
  '@media': {
    '(min-width: 1280px)': {
      display: 'none',
    },
  },
});
