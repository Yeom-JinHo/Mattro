/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import { IUserList } from "./api/socketio";
import OpenRoomList from "../../components/game/OpenRoomList";
import RoomLobby from "../../components/game/RoomLobby";
import RoomStart from "../../components/game/RoomStart";

const socket = io("ws://localhost:8000");

const Main: NextPage = () => {
  const childRef = useRef<{ setLine: (line: string) => void }>(null);
  const [roomName, setRoomName] = useState<string>("");
  // const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [isStartedLobby, setIsStartedLobby] = useState<boolean>(false);
  const [nowCnt, setNowCnt] = useState<number>(1);
  const [userList, setUserList] = useState<IUserList[]>([]);
  const [canStart, setCanStart] = useState<boolean>(false);
  const [isStartedGame, setIsStartedGame] = useState<boolean>(false);

  function addMessage(message: string) {
    // const ul = room.querySelector("ul");
    // const li = document.createElement("li");
    // li.innerText = message;
    // ul.appendChild(li);
  }

  useEffect(() => {
    socket.emit("room_change");
    socket.on("welcome", (roomName, newUser, newCount) => {
      setRoomName(roomName);
      setUserList((prev) => [...prev, newUser]);
      setNowCnt(newCount);
      socket.emit("iMHere", roomName);
    });
    socket.on("iMHere", (newUser) => {
      setUserList((prev) => {
        const filteredPrev = prev.filter((user) => user.id !== newUser.id);
        return [...filteredPrev, newUser];
      });
    });
    socket.on("bye", (socketId, newCount) => {
      setUserList((prev) => [...prev].filter((user) => user.id !== socketId));
      setNowCnt(newCount);
    });
    socket.on("new_message", addMessage);
    socket.on("room_change", (rooms) => {
      setRoomList(rooms);
    });
    socket.on("start_lobby", (canStart) => {
      setCanStart(canStart);
      setIsStartedLobby(true);
    });
    socket.on("start_game", (line) => {
      setIsStartedGame(true);
      childRef.current?.setLine(line);
    });
    socket.on("nickname", (socketId, nickname) => {
      setUserList((prev) => {
        const copy = [...prev];
        copy.forEach((user) => {
          if (user.id === socketId) {
            user.nickname = nickname;
          }
        });
        return copy;
      });
    });
    return () => {
      socket.off("welcome");
      socket.off("iMHere");
      socket.off("bye");
      socket.off("new_message");
      socket.off("room_change");
      socket.off("start_lobby");
      socket.off("start_game");
      socket.off("nickname");
    };
  }, []);

  return (
    <div>
      {socket && isEntered ? (
        isStartedLobby ? (
          <RoomStart
            userList={userList}
            socket={socket}
            roomName={roomName}
            canStart={canStart}
            isStartedGame={isStartedGame}
            ref={childRef}
          />
        ) : (
          <RoomLobby
            socket={socket}
            nowCnt={nowCnt}
            userList={userList}
            roomName={roomName}
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
