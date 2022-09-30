import { useEffect } from "react";
import styles from "./BarTimer.module.scss";

const BarTimer = () => {
  const speed = 15;
  let indexPB = speed * 60; // 900
  const getPercentage = (current, max) => {
    return (current * 100) / (max * 60);
  };
  const progressBar = (percentage) => {
    const progress = document.querySelector(".progress__inner");
    progress.style = `width: ${`${percentage}%`}`;
  };
  const myFunction = () => {
    indexPB -= 1;
    const percentage = getPercentage(indexPB, speed);
    progressBar(percentage);
    if (indexPB !== 0) {
      window.requestAnimationFrame(myFunction);
    }
  };
  useEffect(() => {
    window.requestAnimationFrame(myFunction);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.progress}>
        <div className={`${styles.progress__inner} progress__inner`} />
      </div>
    </div>
  );
};

export default BarTimer;
