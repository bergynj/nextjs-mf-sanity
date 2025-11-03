import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { BreadcrumbLink as BreadcrumbLinkType } from "@/types";
import * as styles from "./breadcrumbs.css";

const BreadcrumbCustomItem = ({
  label,
  href,
  isCurrent,
}: BreadcrumbLinkType & { isCurrent?: boolean }) => {
  return (
    <>
      <BreadcrumbItem className={styles.breadcrumbItemPrimary}>
        {!isCurrent ? (
          <BreadcrumbLink className={styles.breadcrumbLinkHover} asChild>
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage>{label}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
      {!isCurrent && <BreadcrumbSeparator className={styles.breadcrumbSeparatorPrimary} />}
    </>
  );
};

export default function Breadcrumbs({
  links,
}: {
  links: BreadcrumbLinkType[];
}) {
  return (
    <Breadcrumb className={styles.breadcrumbsContainer}>
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbCustomItem
            key={link.label}
            {...link}
            isCurrent={index === links.length - 1}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
