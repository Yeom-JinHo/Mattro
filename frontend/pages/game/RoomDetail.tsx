import type { NextPage } from "next";

import GameLayout from "../../components/GameLayout";
import styles from "./RoomDetail.module.scss";

const RoomList: NextPage = () => {
  return (
    <GameLayout>
      <div className={`${styles.wrapper} page-fallback`}>
        <h2 className="fs-34">
          <span className="fs-28">0/4</span>방 제목 111
        </h2>
        <ul>
          <li>1번 출구님</li>
          <li>2번 출구님</li>
          <li>3번 출구님</li>
          <li>4번 출구님</li>
        </ul>
        <button type="button">start</button>
      </div>
    </GameLayout>
  );
};

export default RoomList;
