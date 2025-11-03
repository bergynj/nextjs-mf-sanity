"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { lightTheme } from "@/styles/themes/light.css";
import { darkTheme } from "@/styles/themes/dark.css";

function ThemeApplier({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const themeClass = resolvedTheme === "dark" ? darkTheme : lightTheme;
    
    // Remove all theme classes first
    root.classList.remove(lightTheme, darkTheme);
    // Add the current theme class
    root.classList.add(themeClass);
  }, [resolvedTheme, mounted]);

  return <>{children}</>;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeApplier>{children}</ThemeApplier>
    </NextThemesProvider>
  );
}
