import { Badge } from "@/components/ui/badge";
import * as styles from "./missing-sanity-page.css";
import { cn } from "@/lib/utils";

export default function MissingSanityPage({
  document,
  slug,
}: {
  document: string;
  slug: string;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Missing{" "}
          <Badge variant="outline" className={styles.badgeText}>
            {document}
          </Badge>{" "}
          document with slug{" "}
          <Badge variant="outline" className={styles.badgeText}>
            {slug}
          </Badge>{" "}
          in Sanity Studio
        </h1>
      </div>
    </div>
  );
}
