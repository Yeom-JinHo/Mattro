import { FunctionComponent, ReactNode } from "react";

import styles from "./GameLayout.module.scss";

type Props = {
  children: ReactNode;
};

const GameLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      {/* Navbar */}
      <div className={styles.wrapper}>{children}</div>
    </>
  );
};

export default GameLayout;
