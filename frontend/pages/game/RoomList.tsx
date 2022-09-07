import type { NextPage } from "next";

import GameLayout from "../../components/GameLayout";
import styles from "./RoomList.module.scss";

const RoomList: NextPage = () => {
  return (
    <GameLayout>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <p>
              <span>0/4</span>방 제목 111
            </p>
          </li>
          <li>
            <p>
              <span>0/4</span>방 제목 111
            </p>
          </li>
          <li>
            <p>
              <span>0/4</span>방 제목 111
            </p>
          </li>
          <li>
            <p>
              <span>0/4</span>방 제목 111
            </p>
          </li>
          <li>
            <p>
              <span>0/4</span>방 제목 111
            </p>
          </li>
          <li>
            <p>
              <span>0/4</span>방 제목 111
            </p>
          </li>
        </ul>
        <button type="button">방 만들기</button>
      </div>
    </GameLayout>
  );
};

export default RoomList;
