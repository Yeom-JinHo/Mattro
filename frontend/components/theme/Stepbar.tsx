import React from "react";
import styles from "./Stepbar.module.scss";

export default function Stepbar({ duration: number }) {
  const num = `${number + 1} / 5`;
  return (
    <div className={`${styles.step} flex column`}>
      <div className={`${styles.num} notoBold fs-20`}>{num}</div>
      <div className={styles.bar}>
        <div />
      </div>
    </div>
  );
}
