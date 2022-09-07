import React from "react";
import styles from "./LineCircle.module.scss";

type LineCircleProps = {
  id: string;
  name: string;
};

const LineCircle = ({ id, name }: LineCircleProps) => {
  return (
    <span
      className={`${id} ${styles.circle} coreBlack fs-10 flex align-center justfiy-center`}
    >
      {name}
    </span>
  );
};

export default LineCircle;
