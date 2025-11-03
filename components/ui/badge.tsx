import * as React from "react"
import { type RecipeVariants } from "@vanilla-extract/recipes"

import { cn } from "@/lib/utils"
import { badge } from "./badge.css"

type BadgeVariants = RecipeVariants<typeof badge>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badge({ variant }), className)} {...props} />
  )
}

export { Badge, badge as badgeVariants }
