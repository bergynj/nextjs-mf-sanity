import { globalStyle } from '@vanilla-extract/css';
import { themeContract } from '@/styles/theme.css';

// Global styles for Sonner toast library
globalStyle('.toaster.group', {
  // Container styles if needed
});

globalStyle('.toaster .toast', {
  backgroundColor: themeContract.color.background,
  color: themeContract.color.foreground,
  borderColor: themeContract.color.border,
  border: `1px solid ${themeContract.color.border}`,
  boxShadow: themeContract.shadow.lg,
});

globalStyle('.toaster .toast [data-description]', {
  color: themeContract.color.mutedForeground,
});

globalStyle('.toaster .toast [data-button]', {
  backgroundColor: themeContract.color.primary,
  color: themeContract.color.primaryForeground,
});

globalStyle('.toaster .toast [data-cancel-button]', {
  backgroundColor: themeContract.color.muted,
  color: themeContract.color.mutedForeground,
});
