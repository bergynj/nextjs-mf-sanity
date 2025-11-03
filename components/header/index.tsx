import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";
import { container } from "@/styles/utils.css";
import * as styles from "./header.css";

export default async function Header() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();
  return (
    <header className={styles.header}>
      <div className={`${container} ${styles.headerContainer}`}>
        <Link href="/" aria-label="Home page">
          <Logo settings={settings} />
        </Link>
        <div className={styles.desktopNav}>
          <DesktopNav navigation={navigation} />
          <ModeToggle />
        </div>
        <div className={styles.mobileNav}>
          <ModeToggle />
          <MobileNav navigation={navigation} settings={settings} />
        </div>
      </div>
    </header>
  );
}
