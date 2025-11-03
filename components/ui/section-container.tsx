import { cn } from "@/lib/utils";
import { SectionPadding, ColorVariant } from "@/sanity.types";
import * as styles from "./section-container.css";

interface SectionContainerProps {
  color?: ColorVariant | null;
  padding?: SectionPadding | null;
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  color = "background",
  padding,
  children,
  className,
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        styles.sectionBase,
        color && styles.colorVariants[color as keyof typeof styles.colorVariants],
        padding?.top && styles.sectionPaddingTop,
        padding?.bottom && styles.sectionPaddingBottom,
        className
      )}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
}
