/* eslint-disable no-shadow */
/* eslint-disable no-self-assign */
/* eslint-disable no-param-reassign */
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors());

const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ httpServer });
const io = new Server(httpServer, {
  cors: {
    credentials: true
  }
});

function publicRooms() {
  const { sids, rooms } = io.sockets.adapter;
  const res = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      res.push(key);
    }
  });
  return res;
}

function whoInRoom(roomName) {
  return io.sockets.adapter.rooms.get(roomName);
}

function howManyInRoom(roomName) {
  return io.sockets.adapter.rooms.get(roomName)?.size;
}

let line;

io.on("connection", (socket) => {
  // 소켓 연결 되자마자 강제로 어떤 방으로 입장시키기
  // io.socketsJoin("어떤");
  // socket.data.nickname = `Anonymous`;
  socket.data.nickname = `익명`;
  socket.emit("room_change", publicRooms());

  socket.onAny((event) => {
    // console.log(io.sockets.adapter);
    console.log(`Socket Event : ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.emit(
      "welcome",
      roomName,
      { id: socket.id, nickname: socket.data.nickname, me: true },
      howManyInRoom(roomName)
    );
    socket
      .to(roomName)
      .emit(
        "welcome",
        roomName,
        { id: socket.id, nickname: socket.data.nickname, me: false },
        howManyInRoom(roomName)
      );
    // 방 입장할 때마다 방 개수를 emit
    io.sockets.emit("room_change", publicRooms());
  });

  socket.on("iMHere", (roomName) => {
    socket.to(roomName).emit("iMHere", {
      id: socket.id,
      nickname: socket.data.nickname,
      me: false
    });
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.id, howManyInRoom(room) - 1);
    });
  });

  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.data.nickname} : ${msg}`);
    done();
  });

  socket.on("nickname", (roomName, nickname) => {
    socket.data.nickname = nickname;
    socket.emit("nickname", socket.id, nickname);
    socket.to(roomName).emit("nickname", socket.id, nickname);
  });

  socket.on("start_lobby", (roomName) => {
    socket.to(roomName).emit("start_lobby", false);
    socket.emit("start_lobby", true);
  });

  socket.on("start_game", (roomName, line) => {
    socket.to(roomName).emit("start_game", line);
    socket.emit("start_game", line);
    line = line;
  });
  socket.on("room_change", () => {
    socket.emit("room_change", publicRooms());
  });
  socket.on("answer", (answer) => {
    // answer 체크 후 true or false
    console.log(answer);
    // true or false를 에밋~
    socket.emit("check_answer");
  });
});

const port = 8000;

httpServer.listen(port, () => {
  console.log(
    `Listening on http://localhost:${port} && Admin : https://admin.socket.io`
  );
});
