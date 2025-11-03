import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const card = style({
  backgroundColor: themeContract.color.card,
  color: themeContract.color.cardForeground,
  borderRadius: themeContract.borderRadius.xl,
  border: `1px solid ${themeContract.color.border}`,
  boxShadow: themeContract.shadow.sm,
});

export const cardHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: themeContract.spacing[1.5],
  padding: themeContract.spacing[6],
});

export const cardTitle = style({
  lineHeight: '1',
  fontWeight: themeContract.fontWeight.semibold,
  letterSpacing: '-0.025em',
});

export const cardDescription = style({
  color: themeContract.color.mutedForeground,
  fontSize: themeContract.fontSize.sm,
});

export const cardContent = style({
  padding: themeContract.spacing[6],
  paddingTop: '0',
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  padding: themeContract.spacing[6],
  paddingTop: '0',
});
