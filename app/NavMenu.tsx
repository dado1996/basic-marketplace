import Link from "next/link";
import styles from "./NavMenu.module.css";
import UserDropdown from "@/components/UserDropdown";
import StoreSelect from "@/components/StoreSelect";
import CartLink from "@/components/CartLink";

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <Link href={"/"} className={styles.text_logo}>
        Basic Marketplace
      </Link>
      <StoreSelect />
      <CartLink />
      <UserDropdown />
    </nav>
  );
}
