import React from "react";
import LineInfoList from "../../components/subway/LineCircleList";
import LineSearch from "../../components/subway/LineSearch";
import LineSelectedBar from "../../components/subway/LineSelectedBar";
import MetroMap from "../../components/subway/MetroMap";
import styles from "./subway.module.scss";

const index = () => {
  return (
    <div className={styles.subway}>
      <MetroMap />
      <div id="line-container" className="flex">
        <LineInfoList />
        <LineSearch />
      </div>
      <div id="select-container" className="flex justify-center">
        <LineSelectedBar />
      </div>
    </div>
  );
};

export default index;
