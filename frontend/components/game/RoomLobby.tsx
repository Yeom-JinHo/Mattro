import React, { useCallback, useState } from "react";
import Image from "next/image";

import styles from "./RoomLobby.module.scss";
import chair1 from "../../public/images/chair1.png";
import chair2 from "../../public/images/chair2.png";
import subway1 from "../../public/images/subway1.svg";
import subway2 from "../../public/images/subway2.svg";
import { ISocket, IUserList } from "../../pages/game/api/socketio";

interface Props {
  socket: ISocket;
  nowCnt: number;
  userList: IUserList[];
  roomName: string;
}

const RoomLobby: React.FunctionComponent<Props> = ({
  socket,
  nowCnt,
  userList,
  roomName
}) => {
  const [nickname, setNickname] = useState("익명");
  const onChangeNickname: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      e.preventDefault();
      setNickname(e.target.value);
    }, []);
  const onStartLobby: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (roomName) {
        socket.emit("start_lobby", roomName);
      }
    }, [roomName]);

  const onSubmitNickname: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (nickname && roomName) {
        socket.emit("nickname", roomName, nickname);
      }
    },
    [roomName, nickname]
  );

  return (
    <div className={`${styles.wrapper} flex column align-center`}>
      <h2 className="align-center coreExtra fs-30">
        <span
          className={`${styles.room__num} flex justify-center align-center coreExtra fs-28`}
        >
          {nowCnt}/4
        </span>
        <span className={`${styles.room__title}`}>
          {roomName.length > 9 ? `${roomName.slice(0, 9)}...` : roomName}
        </span>
        <span className={`${styles.subway1}`}>
          <Image src={subway1} alt="subway1" />
        </span>
      </h2>
      <div className={`${styles.userList}`}>
        {userList.map((user) => {
          if (user.me) {
            return (
              <div
                className={`${styles.user} flex column justify-center align-center fs-32`}
                key={user.id}
              >
                <span className={`${styles.subway2}`}>
                  <Image src={subway2} alt="subway2" />
                </span>
                <div className={`${styles.username} notoBold`}>
                  {user.nickname}님
                </div>
                <span
                  className={`${styles.visible} flex justify-center align-center notoBold fs-20`}
                >
                  나
                </span>
              </div>
            );
          }
          return (
            <div
              className={`${styles.user} flex column justify-center align-center fs-32`}
              key={user.nickname}
            >
              <span className={`${styles.subway2}`}>
                <Image src={subway2} alt="subway2" />
              </span>
              <div className={`${styles.username} notoBold`}>
                {user.nickname}님
              </div>
              <span
                className={`${styles.invisible} flex justify-center align-center notoBold fs-20`}
              >
                나
              </span>
            </div>
          );
        })}
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
      <form onSubmit={onSubmitNickname}>
        <input value={nickname} onChange={onChangeNickname} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default RoomLobby;
