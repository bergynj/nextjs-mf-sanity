import { recipe } from '@vanilla-extract/recipes';
import { themeContract } from '@/styles/theme.css';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: themeContract.spacing[2],
    whiteSpace: 'nowrap',
    borderRadius: themeContract.borderRadius.md,
    fontSize: themeContract.fontSize.sm,
    fontWeight: themeContract.fontWeight.medium,
    transition: 'color 0.2s, box-shadow 0.2s',
    outline: `1px solid transparent`,
    outlineOffset: '0',
    ':disabled': {
      pointerEvents: 'none',
      opacity: themeContract.opacity[50],
    },
    selectors: {
      '&[data-slot="button"] svg': {
        pointerEvents: 'none',
      },
      '&[data-slot="button"] svg:not([class*="size-"])': {
        width: themeContract.spacing[4],
        height: themeContract.spacing[4],
      },
      '&[data-slot="button"] svg': {
        flexShrink: '0',
      },
      '&:focus-visible': {
        outlineWidth: '1px',
        outlineStyle: 'solid',
        outlineColor: `${themeContract.color.ring}80`,
        boxShadow: `0 0 0 4px ${themeContract.color.ring}1a`,
      },
      '&[aria-invalid="true"]:focus-visible': {
        boxShadow: 'none',
      },
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: themeContract.color.primary,
        color: themeContract.color.primaryForeground,
        boxShadow: themeContract.shadow.sm,
        ':hover': {
          backgroundColor: themeContract.color.primary,
          opacity: themeContract.opacity[90],
        },
      },
      destructive: {
        backgroundColor: themeContract.color.destructive,
        color: themeContract.color.destructiveForeground,
        boxShadow: themeContract.shadow.xs,
        ':hover': {
          backgroundColor: themeContract.color.destructive,
          opacity: themeContract.opacity[90],
        },
      },
      outline: {
        border: `1px solid ${themeContract.color.input}`,
        backgroundColor: themeContract.color.background,
        boxShadow: themeContract.shadow.xs,
        ':hover': {
          backgroundColor: themeContract.color.accent,
          color: themeContract.color.accentForeground,
        },
      },
      secondary: {
        backgroundColor: themeContract.color.secondary,
        color: themeContract.color.secondaryForeground,
        boxShadow: themeContract.shadow.xs,
        ':hover': {
          backgroundColor: themeContract.color.secondary,
          opacity: themeContract.opacity[80],
        },
      },
      ghost: {
        ':hover': {
          backgroundColor: themeContract.color.accent,
          color: themeContract.color.accentForeground,
        },
      },
      link: {
        color: themeContract.color.primary,
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        ':hover': {
          textDecoration: 'underline',
        },
      },
    },
    size: {
      default: {
        height: themeContract.spacing[9],
        paddingLeft: themeContract.spacing[4],
        paddingRight: themeContract.spacing[4],
        paddingTop: themeContract.spacing[2],
        paddingBottom: themeContract.spacing[2],
        selectors: {
          '&:has(> svg)': {
            paddingLeft: themeContract.spacing[3],
            paddingRight: themeContract.spacing[3],
          },
        },
      },
      sm: {
        height: themeContract.spacing[8],
        borderRadius: themeContract.borderRadius.md,
        paddingLeft: themeContract.spacing[3],
        paddingRight: themeContract.spacing[3],
        selectors: {
          '&:has(> svg)': {
            paddingLeft: themeContract.spacing[2.5],
            paddingRight: themeContract.spacing[2.5],
          },
        },
      },
      lg: {
        height: themeContract.spacing[10],
        borderRadius: themeContract.borderRadius.md,
        paddingLeft: themeContract.spacing[6],
        paddingRight: themeContract.spacing[6],
        selectors: {
          '&:has(> svg)': {
            paddingLeft: themeContract.spacing[4],
            paddingRight: themeContract.spacing[4],
          },
        },
      },
      icon: {
        width: themeContract.spacing[9],
        height: themeContract.spacing[9],
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
