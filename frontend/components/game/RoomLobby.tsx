import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import styles from "./RoomLobby.module.scss";
import chair1 from "../../public/images/chair1.png";
import chair2 from "../../public/images/chair2.png";
import subway1 from "../../public/images/subway1.svg";
import subway2 from "../../public/images/subway2.svg";
import type { ISocket } from "../../pages/game/main";

const room = {
  title: "방 제목 111111111111"
};

const candidates = new Array(4).fill(0).map((_, index) => index + 1);

interface Props {
  socket: ISocket;
  setIsStarted: (a: boolean) => void;
  nowCnt: number;
  nickname: string;
  userList: string[];
}

const RoomLobby: React.FunctionComponent<Props> = ({
  socket,
  setIsStarted,
  nowCnt,
  nickname,
  userList
}) => {
  const onStartLobby: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setIsStarted(true);
    }, []);

  return (
    <div className={`${styles.wrapper} flex column align-center`}>
      <h2 className="align-center coreExtra fs-30">
        <span
          className={`${styles.room__num} flex justify-center align-center coreExtra fs-28`}
        >
          {nowCnt}/4
        </span>
        <span className={`${styles.room__title}`}>
          {room.title.length > 9 ? `${room.title.slice(0, 9)}...` : room.title}
        </span>
        <span className={`${styles.subway1}`}>
          <Image src={subway1} alt="subway1" />
        </span>
      </h2>
      <div className={`${styles.userList}`}>
        {userList.map((user) => (
          <div
            className={`${styles.user} flex column justify-center align-center fs-32`}
            key={user.id}
          >
            <span className={`${styles.subway2}`}>
              <Image src={subway2} alt="subway2" />
            </span>
            <div className={`${styles.username} notoBold`}>
              {user.nickname}번 출구님
            </div>
            <span
              className={`${styles.invisible} flex justify-center align-center notoBold fs-20`}
            >
              나
            </span>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <span className={styles.chair1}>
          <Image src={chair1} alt="chair1" />
        </span>
        <button
          className="flex align-center justify-center coreExtra fs-32"
          type="button"
          onClick={onStartLobby}
        >
          start
        </button>
        <span className={styles.chair2}>
          <Image src={chair2} alt="chair1" />
        </span>
      </footer>
    </div>
  );
};

export default RoomLobby;
