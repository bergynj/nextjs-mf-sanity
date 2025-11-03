import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const footer = style({
  paddingBottom: themeContract.spacing[5],
  textAlign: 'center',
  '@media': {
    '(min-width: 1280px)': {
      paddingBottom: themeContract.spacing[5],
    },
  },
});

export const logoLink = style({
  display: 'inline-block',
  textAlign: 'center',
});

export const navLinks = style({
  marginTop: themeContract.spacing[8],
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: themeContract.spacing[7],
  color: themeContract.color.primary,
});

export const ghostLink = style({
  transition: 'colors 0.2s',
  fontSize: themeContract.fontSize.sm,
  padding: '0',
  height: 'auto',
  ':hover': {
    backgroundColor: 'transparent',
    color: `${themeContract.color.foreground}cc`,
  },
  selectors: {
    '&&': {
      color: `${themeContract.color.foreground}99`,
    },
  },
});

export const copyright = style({
  marginTop: themeContract.spacing[8],
  display: 'flex',
  flexDirection: 'row',
  gap: themeContract.spacing[6],
  justifyContent: 'center',
  fontSize: themeContract.fontSize.xs,
  borderTop: `1px solid ${themeContract.color.border}`,
  paddingTop: themeContract.spacing[8],
  '@media': {
    '(min-width: 1024px)': {
      marginTop: themeContract.spacing[5],
    },
  },
});

export const copyrightText = style({
  display: 'flex',
  alignItems: 'center',
  gap: themeContract.spacing[2],
  color: `${themeContract.color.foreground}99`,
});

export const copyrightContent = style({
  selectors: {
    '& p': {
      margin: '0 !important',
    },
  },
});
