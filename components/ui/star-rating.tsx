import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import * as styles from "./star-rating.css";

export function StarRating({
  size = "sm",
  rating,
}: {
  size?: "sm" | "lg";
  rating: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className={cn(styles.starSize[size], styles.starFilled)}
            />
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className={cn(styles.starSize[size], styles.starFilled)}
            />
          );
        }
        return (
          <Star
            key={i}
            className={cn(styles.starSize.sm, styles.starEmpty)}
          />
        );
      })}
    </div>
  );
}
