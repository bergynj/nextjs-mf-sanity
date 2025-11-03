import { globalStyle, style } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';
import { animateAccordionDown, animateAccordionUp } from '@/styles/utils.css';

export const accordionItem = style({
  borderBottom: `1px solid ${themeContract.color.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const accordionTrigger = style({
  display: 'flex',
  flex: '1',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: themeContract.spacing[4],
  borderRadius: themeContract.borderRadius.md,
  paddingTop: themeContract.spacing[4],
  paddingBottom: themeContract.spacing[4],
  textAlign: 'left',
  fontSize: themeContract.fontSize.sm,
  fontWeight: themeContract.fontWeight.medium,
  transition: 'all 0.2s',
  outline: `1px solid transparent`,
  outlineOffset: '0',
  ':hover': {
    textDecoration: 'underline',
  },
  ':focus-visible': {
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: `${themeContract.color.ring}80`,
    boxShadow: `0 0 0 4px ${themeContract.color.ring}1a`,
  },
  ':disabled': {
    pointerEvents: 'none',
    opacity: themeContract.opacity[50],
  },
});

export const accordionTriggerOpen = style({
  // Applied when accordion is open
});

export const accordionHeader = style({
  display: 'flex',
});

export const accordionContent = style({
  overflow: 'hidden',
  fontSize: themeContract.fontSize.sm,
  selectors: {
    '&[data-state="closed"]': {
      animation: animateAccordionUp,
    },
    '&[data-state="open"]': {
      animation: animateAccordionDown,
    },
  },
});

export const accordionContentInner = style({
  paddingTop: '0',
  paddingBottom: themeContract.spacing[4],
});

export const chevronIcon = style({
  color: themeContract.color.mutedForeground,
  pointerEvents: 'none',
  width: themeContract.spacing[4],
  height: themeContract.spacing[4],
  flexShrink: '0',
  transform: 'translateY(0.125rem)',
  transition: 'transform 0.2s',
});

// Handle open state rotation via global style
globalStyle(`${accordionTrigger}[data-state="open"] svg`, {
  transform: 'rotate(180deg) translateY(0.125rem)',
});
