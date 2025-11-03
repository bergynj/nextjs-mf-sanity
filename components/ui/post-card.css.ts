import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const postCard = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${themeContract.color.border}`,
  borderRadius: themeContract.borderRadius['2xl'],
  padding: themeContract.spacing[4],
  ':hover': {
    borderColor: themeContract.color.primary,
  },
});

export const postCardContent = style({
  display: 'flex',
  flexDirection: 'column',
});

export const postCardImage = style({
  marginBottom: themeContract.spacing[4],
  position: 'relative',
  height: '15rem',
  borderRadius: themeContract.borderRadius['2xl'],
  overflow: 'hidden',
  '@media': {
    '(min-width: 640px)': {
      height: '20rem',
    },
    '(min-width: 768px)': {
      height: '25rem',
    },
    '(min-width: 1024px)': {
      height: '9.5rem',
    },
    '(min-width: 1280px)': {
      height: '12rem',
    },
  },
});

export const postCardHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: themeContract.spacing[4],
});

export const postCardTitle = style({
  fontWeight: themeContract.fontWeight.bold,
  fontSize: '1.5rem',
  lineHeight: '1.2',
});

export const postCardFooter = style({
  marginTop: themeContract.spacing[3],
  width: themeContract.spacing[10],
  height: themeContract.spacing[10],
  border: `1px solid ${themeContract.color.border}`,
  borderRadius: themeContract.borderRadius.full,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    '(min-width: 1280px)': {
      marginTop: themeContract.spacing[6],
    },
  },
  selectors: {
    [`${postCard}:hover &`]: {
      borderColor: themeContract.color.primary,
    },
  },
});

export const postCardIcon = style({
  color: themeContract.color.border,
  selectors: {
    [`${postCard}:hover &`]: {
      color: themeContract.color.primary,
    },
  },
});
