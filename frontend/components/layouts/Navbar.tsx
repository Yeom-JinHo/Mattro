import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import before from "../../public/icons/before_menu.svg";
// import DarkMode from "./DarkMode";

export default function Navbar() {
  const transition = () => {
    console.log("aa");
  };
  return (
    <header className={styles.navbar}>
      <Link href="/">
        <div>LOGO</div>
      </Link>
      <div className="flex align-center justify-center">
        <div>{/* <DarkMode /> */}</div>
        <button type="button" className={styles.menu} onClick={transition}>
          <Image src={before} alt="menu" />
          {/* <span className={styles.stick} />
          <span className={styles.stick} />
          <span className={styles.stick} /> */}
        </button>
      </div>
    </header>
  );
}
