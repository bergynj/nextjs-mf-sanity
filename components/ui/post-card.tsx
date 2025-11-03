import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";
import { POSTS_QUERYResult } from "@/sanity.types";
import * as styles from "./post-card.css";

type PostCard = NonNullable<POSTS_QUERYResult[number]>;

interface PostCardProps extends Omit<PostCard, "slug"> {
  className?: string;
}

export default function PostCard({
  className,
  title,
  excerpt,
  image,
}: PostCardProps) {
  return (
    <div className={cn(styles.postCard, className)}>
      <div className={styles.postCardContent}>
        {image && image.asset?._id && (
          <div className={styles.postCardImage}>
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        )}
        {title && (
          <div className={styles.postCardHeader}>
            <h3 className={styles.postCardTitle}>{title}</h3>
          </div>
        )}
        {excerpt && <p>{excerpt}</p>}
      </div>
      <div className={styles.postCardFooter}>
        <ChevronRight
          className={styles.postCardIcon}
          size={24}
        />
      </div>
    </div>
  );
}
