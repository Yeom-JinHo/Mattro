import React from "react";
import styles from "./Stepbar.module.scss";

export default function Stepbar({ duration }: number) {
  const num = `${duration + 1} / 5`;
  console.log(duration);

  return (
    <div className={`${styles.step} flex column`}>
      <div className={`${styles.num} notoBold fs-20`}>{num}</div>
      <div className={styles.bar}>
        <div />
      </div>
    </div>
  );
}
