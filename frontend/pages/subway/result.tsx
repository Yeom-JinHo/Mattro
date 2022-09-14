import React from "react";
import LineLoadingBar from "../../components/subway/LineLoadingBar";
import styles from "./result.module.scss";

const result = () => {
  return (
    <div>
      <div className={`${styles.wrapper} flex`}>
        <LineLoadingBar color="LS" name="강남1" />
        <LineLoadingBar color="LS" name="강남" />
        <LineLoadingBar color="LS" name="양재" />
        <LineLoadingBar color="LS" name="양재시민의 숲" />
        <LineLoadingBar color="LS" name="청계산입구" />
        <LineLoadingBar color="LS" name="판교" />
      </div>
      <div className={styles.dimmer} />
    </div>
  );
};

export default result;
