import Logo from "@/components/logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";
import { NAVIGATION_QUERYResult } from "@/sanity.types";
import * as styles from "./footer.css";

type SanityLink = NonNullable<NAVIGATION_QUERYResult[0]["links"]>[number];

export default async function Footer() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();

  return (
    <footer>
      <div className={styles.footer}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Home page"
        >
          <Logo settings={settings} />
        </Link>
        <div className={styles.navLinks}>
          {navigation[0]?.links?.map((navItem: SanityLink) => (
            <Link
              key={navItem._key}
              href={navItem.href || "#"}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className={cn(
                buttonVariants({
                  variant: navItem.buttonVariant || "default",
                }),
                navItem.buttonVariant === "ghost" && styles.ghostLink
              )}
            >
              {navItem.title}
            </Link>
          ))}
        </div>
        <div className={styles.copyright}>
          <div className={styles.copyrightText}>
            <span>&copy; {new Date().getFullYear()}</span>
            {settings?.copyright && (
              <span className={styles.copyrightContent}>
                <PortableTextRenderer value={settings.copyright} />
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
