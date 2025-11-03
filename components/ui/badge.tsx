import * as React from "react"
import { type RecipeVariants } from "@vanilla-extract/recipes"

import { cn } from "@/lib/utils"
import { badge } from "./badge.css"

type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariants['variant'];
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badge({ variant }), className)} {...props} />
  )
}

export { Badge, badge as badgeVariants }
