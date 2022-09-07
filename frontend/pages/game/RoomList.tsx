import type { NextPage } from "next";

import GameLayout from "../../components/GameLayout";
import styles from "./RoomList.module.scss";

const roomList = [
  { id: 1, number: 0, title: "방 제목 111" },
  { id: 2, number: 1, title: "방 제목 222" },
  { id: 3, number: 2, title: "방 제목 333" },
  { id: 4, number: 3, title: "방 제목 444" },
  { id: 5, number: 4, title: "방 제목 555" },
  { id: 6, number: 0, title: "방 제목 666" }
];

const RoomList: NextPage = () => {
  return (
    <GameLayout>
      <div
        className={`${styles.wrapper} flex column justify-center align-center`}
      >
        <div className={styles.roomList}>
          {roomList.map((room) => (
            <div className={`${styles.room} flex align-center`} key={room.id}>
              <p className="flex align-center fs-34 coreExtra">
                <span className="flex justify-center align-center fs-24 coreExtra">
                  {room.number}/4
                </span>
                {room.title}
              </p>
            </div>
          ))}
        </div>
        <button className="fs-24 coreExtra" type="button">
          방 만들기
        </button>
      </div>
    </GameLayout>
  );
};

export default RoomList;
