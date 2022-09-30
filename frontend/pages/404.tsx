import React from "react";
// import Image from "next/image";
// import page from "../public/images/404page.png";
import styles from "./404page.module.scss";

const result = () => {
  return (
    <div className={`${styles.back} flex`}>
      <button
        type="button"
        className={`${styles.btn} flex align-center justify-center notoBold`}
      >
        홈으로 이동하기
      </button>
    </div>
  );
};

export default result;
