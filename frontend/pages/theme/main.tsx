import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./main.module.scss";
import title from "../../public/images/theme_title.png";

export default function themeMain() {
  return (
    <div className={`${styles.theme} flex justify-center`}>
      <div className={`${styles.contents} flex column`}>
        <div>
          <Image src={title} alt="title" />
        </div>
        <nav>
          <Link href="/">
            <div className={`${styles.btn} fs-32 coreExtra`}>
              테마별 맛집 추천받기
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
}

// export default themeMain;
