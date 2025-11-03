import { recipe } from '@vanilla-extract/recipes';
import { themeContract } from '@/styles/theme.css';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: themeContract.borderRadius.md,
    border: '1px solid',
    paddingLeft: themeContract.spacing[2.5],
    paddingRight: themeContract.spacing[2.5],
    paddingTop: themeContract.spacing[0.5],
    paddingBottom: themeContract.spacing[0.5],
    fontSize: themeContract.fontSize.xs,
    fontWeight: themeContract.fontWeight.semibold,
    transition: 'colors 0.2s',
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${themeContract.color.ring}`,
    },
  },
  variants: {
    variant: {
      default: {
        borderColor: 'transparent',
        backgroundColor: themeContract.color.primary,
        color: themeContract.color.primaryForeground,
        boxShadow: themeContract.shadow.sm,
        ':hover': {
          backgroundColor: themeContract.color.primary,
          opacity: themeContract.opacity[80],
        },
      },
      secondary: {
        borderColor: 'transparent',
        backgroundColor: themeContract.color.secondary,
        color: themeContract.color.secondaryForeground,
        ':hover': {
          backgroundColor: themeContract.color.secondary,
          opacity: themeContract.opacity[80],
        },
      },
      destructive: {
        borderColor: 'transparent',
        backgroundColor: themeContract.color.destructive,
        color: themeContract.color.destructiveForeground,
        boxShadow: themeContract.shadow.sm,
        ':hover': {
          backgroundColor: themeContract.color.destructive,
          opacity: themeContract.opacity[80],
        },
      },
      outline: {
        borderColor: themeContract.color.border,
        color: themeContract.color.foreground,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
