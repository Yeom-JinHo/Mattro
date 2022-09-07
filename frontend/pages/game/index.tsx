import type { NextPage } from "next";
import Link from "next/link";

import GameLayout from "../../components/GameLayout";
import styles from "./index.module.scss";

const index: NextPage = () => {
  return (
    <GameLayout>
      <div className={styles.wrapper}>
        <h1>지하철 미니 게임</h1>
        <Link href="/game/RoomList">
          <div>start</div>
        </Link>
        <button type="button">게임 설명</button>
      </div>
    </GameLayout>
  );
};

export default index;
