import { globalStyle, style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';
import { srOnly } from '@/styles/utils.css';

export const breadcrumbList = style({
  color: themeContract.color.mutedForeground,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: themeContract.spacing[1.5],
  fontSize: themeContract.fontSize.sm,
  wordBreak: 'break-word',
  '@media': {
    '(min-width: 640px)': {
      gap: themeContract.spacing[2.5],
    },
  },
});

export const breadcrumbItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: themeContract.spacing[1.5],
});

export const breadcrumbLink = style({
  transition: 'colors 0.2s',
  ':hover': {
    color: themeContract.color.foreground,
  },
});

export const breadcrumbPage = style({
  color: themeContract.color.foreground,
  fontWeight: themeContract.fontWeight.normal,
});

export const breadcrumbSeparator = style({});

// Global style for SVG children
globalStyle(`${breadcrumbSeparator} > svg`, {
  width: themeContract.spacing[3.5],
  height: themeContract.spacing[3.5],
});

export const breadcrumbEllipsis = style({
  display: 'flex',
  width: themeContract.spacing[9],
  height: themeContract.spacing[9],
  alignItems: 'center',
  justifyContent: 'center',
});

export { srOnly };
