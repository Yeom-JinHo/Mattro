import React from "react";
import LineInfoList from "../../components/subway/LineCircleList";
import MetroMap from "../../components/subway/MetroMap";
import styles from "./subway.module.scss";

const index = () => {
  return (
    <div className={styles.subway}>
      <LineInfoList />

      {/* <MetroMap /> */}
    </div>
  );
};

export default index;
