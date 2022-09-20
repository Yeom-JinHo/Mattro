import Image from "next/image";
import React, { useEffect, useState } from "react";
import LineInfoList from "../../components/subway/LineCircleList";
import LineSearch from "../../components/subway/LineSearch";
import LineSelectedBar from "../../components/subway/LineSelectedBar";
import MetroMap from "../../components/subway/MetroMap";
import styles from "./subway.module.scss";
import PlusBtn from "../../public/icons/plus.svg";
import MinusBtn from "../../public/icons/minus.svg";
import lineInfos from "../../constants/lineInfo";
import { UsedLineIdType } from "../../constants/lineType";

const Index = () => {
  const [selectedLines, setSelectedLines] = useState<UsedLineIdType[]>(
    lineInfos.map((line) => line.id)
  );

  const handleSelectedLines = (line: UsedLineIdType) => {
    const ind = selectedLines.indexOf(line);
    if (ind === -1) {
      setSelectedLines([...selectedLines, line]);
    } else {
      setSelectedLines(
        selectedLines.filter((selectedLine) => selectedLine !== line)
      );
    }
  };

  const handleLineOpacity = (lineId: UsedLineIdType, opacity: 0.1 | 1) => {
    const lines = document.querySelectorAll(`.${lineId}`);
    console.log("H!!", lineId);
    lines.forEach((line) => {
      if (line.tagName !== "LI") {
        line.style.opacity = opacity;
      }
    });
  };

  useEffect(() => {
    console.log(selectedLines);

    const unSelectedLines = lineInfos
      .map((line) => line.id)
      .filter(
        (lineId: UsedLineIdType) =>
          selectedLines.findIndex((item) => item === lineId) === -1
      );
    console.log(unSelectedLines, selectedLines);
    unSelectedLines.map((line) => handleLineOpacity(line, 0.1));
    selectedLines.map((line) => handleLineOpacity(line, 1));
  }, [selectedLines]);

  return (
    <div className={styles.subway}>
      <MetroMap />
      <div id="line-container" className="flex">
        <LineInfoList togggleSelectedLines={handleSelectedLines} />
        <LineSearch />
      </div>
      <div id="map-btn" className="flex column">
        <button type="button">
          <Image src={PlusBtn} layout="responsive" alt="확대" />
        </button>
        <button type="button">
          <Image src={MinusBtn} layout="responsive" alt="축소" />
        </button>
      </div>
      <div id="select-container" className="flex justify-center">
        <LineSelectedBar />
      </div>
    </div>
  );
};

export default Index;
