import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/images/logo/logo.png";
// import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import before from "../../public/icons/before_menu.svg";
// import DarkMode from "./DarkMode";

export default function Navbar() {
  const { pathname } = useRouter();
  const menuRef = useRef();
  const itemsRef = useRef();

  // let body;
  // const body = document.querySelector("body");
  // const init = function init() {
  //   const body = document.querySelector("body");
  // };

  // console.log(body);

  // const toggleClass = (element, stringClass) => {
  //   // 해당 요소의 클래스 속성값을 추가, 같은 캘래스 명 있는 경우 무시
  //   if (element.classList.contains(stringClass)) {
  //     element.classList.remove(stringClass);
  //     console.log("dd");
  //   }
  // };

  // const clickBtn = () => {
  //   console.log("a");
  //   toggleClass(body, "nav_active");
  // };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.nav__content}>
          <ul className={styles.nav__list}>
            <li className={`${styles.nav__list_item} ${styles.active_nav}`}>
              <div className={styles.hover_target}>home</div>
            </li>
            <li className={styles.nav__list_item}>
              <div className={styles.hover_target}>subway</div>
            </li>
            <li className={styles.nav__list_item}>
              <div className={styles.hover_target}>theme</div>
            </li>
            <li className={styles.nav__list_item}>
              <div className={styles.hover_target}>game</div>
            </li>
          </ul>
        </div>
      </div>

      <nav
        className={
          pathname === "/"
            ? `${styles.navbar_main} flex`
            : `${styles.navbar} flex`
        }
      >
        <Link href="/">
          <div className={styles.logo}>
            <Image src={logo} alt="logo" className={styles.img} />
          </div>
        </Link>
        <div className={styles.nav_wrap}>
          <div
            // ref={menuRef}
            // onClick={clickBtn}
            className={`${styles.menu_icon} ${styles.hover_target}`}
          >
            <span
              className={`${styles.menu_icon__line} ${styles.menu_icon__line_left}`}
            />
            <span className={`${styles.menu_icon__line}`} />
            <span
              className={`${styles.menu_icon__line} ${styles.menu_icon__line_right}`}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
