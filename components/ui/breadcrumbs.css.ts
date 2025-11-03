import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const breadcrumbsContainer = style({
  marginBottom: themeContract.spacing[3],
  '@media': {
    '(min-width: 1024px)': {
      marginBottom: themeContract.spacing[6],
    },
  },
});

export const breadcrumbItemPrimary = style({
  fontWeight: themeContract.fontWeight.bold,
  color: themeContract.color.primary,
});

export const breadcrumbLinkHover = style({
  ':hover': {
    color: themeContract.color.primary,
    opacity: themeContract.opacity[80],
  },
});

export const breadcrumbSeparatorPrimary = style({
  color: themeContract.color.primary,
});
