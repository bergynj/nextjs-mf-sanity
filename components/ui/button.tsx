import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type RecipeVariants } from "@vanilla-extract/recipes";

import { cn } from "@/lib/utils";
import { button } from "./button.css";

type ButtonVariants = RecipeVariants<typeof button>;

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariants & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, button as buttonVariants };
