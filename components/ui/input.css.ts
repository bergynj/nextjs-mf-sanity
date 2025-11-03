import { style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

export const input = style({
  display: 'flex',
  height: themeContract.spacing[9],
  width: '100%',
  minWidth: '0',
  borderRadius: themeContract.borderRadius.md,
  border: `1px solid ${themeContract.color.input}`,
  backgroundColor: 'transparent',
  paddingLeft: themeContract.spacing[3],
  paddingRight: themeContract.spacing[3],
  paddingTop: themeContract.spacing[1],
  paddingBottom: themeContract.spacing[1],
  fontSize: themeContract.fontSize.base,
  boxShadow: themeContract.shadow.xs,
  transition: 'color 0.2s, box-shadow 0.2s',
  outline: `1px solid transparent`,
  outlineOffset: '0',
  ':focus-visible': {
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: `${themeContract.color.ring}80`,
    boxShadow: `0 0 0 4px ${themeContract.color.ring}1a`,
  },
  ':disabled': {
    pointerEvents: 'none',
    cursor: 'not-allowed',
    opacity: themeContract.opacity[50],
  },
  selectors: {
    '&::placeholder': {
      color: themeContract.color.mutedForeground,
    },
    '&::selection': {
      backgroundColor: themeContract.color.primary,
      color: themeContract.color.primaryForeground,
    },
    '&[type="file"]': {
      border: '0',
      backgroundColor: 'transparent',
      fontSize: themeContract.fontSize.sm,
      fontWeight: themeContract.fontWeight.medium,
    },
    '&[type="file"]::file-selector-button': {
      display: 'inline-flex',
      height: themeContract.spacing[7],
      border: '0',
      backgroundColor: 'transparent',
      fontSize: themeContract.fontSize.sm,
      fontWeight: themeContract.fontWeight.medium,
    },
    '&[aria-invalid="true"]': {
      outlineColor: `${themeContract.color.destructive}99`,
      boxShadow: `0 0 0 3px ${themeContract.color.destructive}33`,
      borderColor: `${themeContract.color.destructive}99`,
    },
    '&[aria-invalid="true"]:focus-visible': {
      outlineWidth: '0',
      boxShadow: `0 0 0 4px ${themeContract.color.destructive}66`,
    },
  },
  '@media': {
    '(min-width: 768px)': {
      fontSize: themeContract.fontSize.sm,
    },
  },
});
