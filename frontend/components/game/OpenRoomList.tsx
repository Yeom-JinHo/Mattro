import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import station from "../../public/images/station.png";
import chair1 from "../../public/images/chair1.png";
import styles from "./OpenRoomList.module.scss";
import type { ISocket } from "../../pages/game/main";

interface Props {
  roomList: [
    {
      id: number;
      number: number;
      title: string;
    }
  ];
  socket: ISocket;
  setIsEntered: (a: boolean) => void;
}

const Rooms: React.FunctionComponent<Props> = ({
  roomList,
  socket,
  setIsEntered
}) => {
  const onMakeRoom = useCallback(() => {
    socket.emit("enter_room", "roomName", () => {
      setIsEntered(true);
    });
  }, [socket]);

  return (
    <div className={`${styles.wrapper} flex column align-center`}>
      <span className={styles.station}>
        <Image src={station} alt="station" />
      </span>
      <div className={styles.roomList}>
        {roomList.map((room) => (
          <Link href="/game/room/1" key={room.id}>
            <div className={`${styles.room} flex align-center`}>
              <p className="flex align-center fs-34 coreExtra">
                <span className="flex justify-center align-center fs-24 coreExtra">
                  {room.number}/4
                </span>
                {room.title.length > 10
                  ? `${room.title.slice(0, 10)}...`
                  : room.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.chair1}>
          <Image src={chair1} alt="chair1" />
        </span>
        <button className="fs-24 coreExtra" type="button" onClick={onMakeRoom}>
          방 만들기
        </button>
      </div>
    </div>
  );
};

export default Rooms;
