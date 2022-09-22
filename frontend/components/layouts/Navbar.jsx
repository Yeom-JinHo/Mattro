import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/images/logo/logo_gray.png";
import logoNav from "../../public/images/logo/logo_nav.png";
import sound from "../../public/icons/volume_off.svg";
// import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
// import DarkMode from "./DarkMode";

export default function Navbar() {
  // console.log(document.querySelector("body"));
  const { pathname } = useRouter();
  const router = useRouter();
  const menuRef = useRef();
  const itemsRef = useRef();
  const bodyRef = useRef();
  const [clicked, setClicked] = useState(false);

  const toggleClass = (element, stringClass) => {
    // 해당 요소의 클래스 속성값을 추가, 같은 캘래스 명 있는 경우 무시
    if (element.current.classList.contains(stringClass)) {
      element.current.classList.remove(stringClass);
      setClicked(false);
    } else {
      element.current.classList.add(stringClass);
      setClicked(true);
    }
  };

  const clickBtn = () => {
    return toggleClass(bodyRef, styles.nav_active); // "nav-active");
  };

  const movePage = (url) => {
    router.push(url);
    setTimeout(function () {
      if (bodyRef.current.classList.contains(styles.nav_active)) {
        bodyRef.current.classList.remove(styles.nav_active);
        setClicked(false);
      }
    }, 1000);
  };

  return (
    <span ref={bodyRef} className="flex align-center justify-center column">
      <nav
        className={
          pathname === "/"
            ? `${styles.navbar_main} flex`
            : `${styles.navbar} flex`
        }
      >
        <Link href="/">
          <div className={styles.logo}>
            {clicked && (
              <Image src={logoNav} alt="logo" className={styles.img} />
            )}
            {!clicked && <Image src={logo} alt="logo" className={styles.img} />}
          </div>
        </Link>
        <div className={`${styles.nav_wrap} flex align-center justify-center`}>
          {/* <button type="button">
            <Image src={sound} alt="sound" />
          </button> */}
          <button
            type="button"
            ref={menuRef}
            onClick={clickBtn}
            className={`${styles.menu_icon} ${styles.hover_target}`}
          >
            <span
              className={`${styles.menu_icon__line} ${styles.menu_icon__line_left}`}
            />
            <span className={`${styles.menu_icon__line}`} />
            <span
              className={`${styles.menu_icon__line} ${styles.menu_icon__line_right}`}
            />
          </button>
        </div>
      </nav>

      <div className={`${styles.nav} flex justify-center`}>
        <div className={styles.nav__content}>
          <ul className={styles.nav__list}>
            <li
              ref={itemsRef}
              className={
                pathname === "/"
                  ? `${styles.nav__list_item} ${styles.active_nav}`
                  : `${styles.nav__list_item}`
              }
            >
              <button
                type="button"
                onClick={() => {
                  movePage("/");
                }}
                className={`${styles.hover_target} fs-60 coreExtra`}
              >
                HOME
              </button>
            </li>
            <li
              ref={itemsRef}
              className={
                pathname === "/subway"
                  ? `${styles.nav__list_item} ${styles.active_nav}`
                  : styles.nav__list_item
              }
            >
              <button
                type="button"
                onClick={() => {
                  movePage("/subway");
                }}
                className={`${styles.hover_target} fs-60 coreExtra`}
              >
                SUBWAY
              </button>
            </li>
            <li
              ref={itemsRef}
              className={
                pathname === "/theme/main"
                  ? `${styles.nav__list_item} ${styles.active_nav}`
                  : styles.nav__list_item
              }
            >
              <button
                type="button"
                onClick={() => {
                  movePage("/theme/main");
                }}
                className={`${styles.hover_target} fs-60 coreExtra`}
              >
                THEME
              </button>
            </li>
            <li
              ref={itemsRef}
              className={
                pathname === "/game"
                  ? `${styles.nav__list_item} ${styles.active_nav}`
                  : styles.nav__list_item
              }
            >
              <button
                type="button"
                onClick={() => {
                  movePage("/game");
                }}
                className={`${styles.hover_target} fs-60 coreExtra`}
              >
                GAME
              </button>
            </li>
          </ul>
        </div>
      </div>
    </span>
  );
}
