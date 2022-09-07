import React from "react";
import LineInfoList from "../../components/subway/LineCircleList";
import LineSearch from "../../components/subway/LineSearch";
import MetroMap from "../../components/subway/MetroMap";
import styles from "./subway.module.scss";

const index = () => {
  return (
    <div className={styles.subway}>
      <LineInfoList />
      <LineSearch />
      {/* <MetroMap /> */}
    </div>
  );
};

export default index;
