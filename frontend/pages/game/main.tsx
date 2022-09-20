/* eslint-disable no-shadow */
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { IUserList } from "./api/socketio";
import OpenRoomList from "../../components/game/OpenRoomList";
import RoomLobby from "../../components/game/RoomLobby";
import RoomStart from "../../components/game/RoomStart";

const socket = io("ws://localhost:8000");

const Main: NextPage = () => {
  // const [roomName, setRoomName] = useState<string>("");
  // const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  // const [nickname, setNickname] = useState<string>("");
  const [nowCnt, setNowCnt] = useState<number>(1);
  const [userList, setUserList] = useState<IUserList[]>([]);

  function addMessage(message: string) {
    // const ul = room.querySelector("ul");
    // const li = document.createElement("li");
    // li.innerText = message;
    // ul.appendChild(li);
  }

  useEffect(() => {
    socket.on("welcome", (users, newCount) => {
      setUserList(users);
      setNowCnt(newCount);
    });
    socket.on("bye", (nickname, newCount) => {
      // const h3 = room.querySelector("h3");
      // h3.innerText = `Room ${roomName} (${newCount})`;
      // addMessage(`${nickname} 님이 퇴장하셨습니다!`);
    });
    socket.on("new_message", addMessage);
    socket.on("room_change", (rooms) => {
      setRoomList(rooms);
    });
    // socket.on("welcome_count", (newCount) => {
    // const h3 = room.querySelector("h3");
    // h3.innerText = `Room ${roomName} (${newCount})`;
    // });
    return () => {
      socket.off("welcome");
      socket.off("bye");
      socket.off("new_message");
      socket.off("room_change");
      socket.off("welcome_count");
    };
  }, []);

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
            // nickname={nickname}
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
