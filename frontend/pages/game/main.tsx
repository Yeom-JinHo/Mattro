/* eslint-disable no-shadow */
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

import { ClientToServerEvents, ServerToClientEvents } from "./api/socketio";
import OpenRoomList from "../../components/game/OpenRoomList";
import RoomLobby from "../../components/game/RoomLobby";
import RoomStart from "../../components/game/RoomStart";

// const roomList = [
//   { id: 1, number: 0, title: "방 제목 111111111111" },
//   { id: 2, number: 1, title: "방 제목 222" },
//   { id: 3, number: 2, title: "방 제목 333" },
//   { id: 4, number: 3, title: "방 제목 444" },
//   { id: 5, number: 4, title: "방 제목 555" },
//   { id: 6, number: 0, title: "방 제목 666" }
// ];

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const Main: NextPage = () => {
  const [socket, setSocket] = useState<ISocket | null>(null);
  const [roomName, setRoomName] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  // const [nickname, setNickname] = useState<string>("");
  const [nowCnt, setNowCnt] = useState<number>(1);
  const [userList, setUserList] = useState<string[]>([]);

  function addMessage(message: string) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
  }

  useEffect((): void => {
    const socket: ISocket = io("ws://localhost:8000");
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("welcome", (nickname, newCount) => {
      // const h3 = room.querySelector("h3");
      // h3.innerText = `Room ${roomName} (${newCount})`;
      // addMessage(`${nickname} 님이 입장하셨습니다!`);
      setUserList((prev) => [...prev, nickname]);
      setNowCnt(newCount);
    });
    socket.on("bye", (nickname, newCount) => {
      const h3 = room.querySelector("h3");
      h3.innerText = `Room ${roomName} (${newCount})`;
      addMessage(`${nickname} 님이 퇴장하셨습니다!`);
    });
    socket.on("new_message", addMessage);
    socket.on("room_change", (rooms) => {
      setRoomList(rooms);
    });
    socket.on("welcome_count", (newCount) => {
      const h3 = room.querySelector("h3");
      h3.innerText = `Room ${roomName} (${newCount})`;
    });
  }, [socket, roomName]);

  return (
    <div>
      {socket && isEntered ? (
        isStarted ? (
          <RoomStart />
        ) : (
          <RoomLobby
            socket={socket}
            setIsStarted={setIsStarted}
            nowCnt={nowCnt}
            nickname={nickname}
            userList={userList}
          />
        )
      ) : (
        <OpenRoomList
          roomList={roomList}
          socket={socket}
          setIsEntered={setIsEntered}
        />
      )}
    </div>
  );
};

export default Main;
