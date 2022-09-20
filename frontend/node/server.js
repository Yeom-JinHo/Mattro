/* eslint-disable no-param-reassign */
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors());

const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ httpServer });
const wsServer = new Server(httpServer, {
  cors: {
    credentials: true
  }
});

function publicRooms() {
  const { sids, rooms } = wsServer.sockets.adapter;
  const res = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      res.push(key);
    }
  });
  return res;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

const candidates = ["1", "2", "3", "4"];

const users = [];

wsServer.on("connection", (socket) => {
  // 소켓 연결 되자마자 강제로 어떤 방으로 입장시키기
  // wsServer.socketsJoin("어떤");
  // socket.data.nickname = `Anonymous`;
  socket.emit("room_change", publicRooms());

  socket.onAny((event) => {
    // console.log(wsServer.sockets.adapter);
    console.log(`Socket Event : ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.data.nickname = `익명${candidates.splice(0, 1)}`;
    // socket.emit("welcome", socket.data.nickname, countRoom(roomName));
    users.push({ id: Date.now(), nickname: socket.data.nickname });
    // 자신 or 방에 있는 다름 사람에게 참여자 목록과 숫자를 emit
    socket.emit("welcome", users, countRoom(roomName));
    socket.to(roomName).emit("welcome", users, countRoom(roomName));
    // socket
    //   .to(roomName)
    //   .emit("welcome", socket.data.nickname, countRoom(roomName));
    // socket.emit("welcome_count", countRoom(roomName));
    // 방 입장할 때마다 방 개수를 emit
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.data.nickname, countRoom(room) - 1);
    });
    if (socket.data?.nickname) {
      candidates.push(socket.data.nickname[socket.data.nickname.length - 1]);
      candidates.sort();
      const idx = users.indexOf(
        users.filter((user) => user.nickname === socket.data.nickname)
      );
      users.splice(idx, 1);
    }
  });

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.data.nickname} : ${msg}`);
    done();
  });

  // socket.on("nickname", (nickname) => {
  //   socket.data.nickname = nickname;
  // });
});

const port = 8000;

httpServer.listen(port, () => {
  console.log(
    `Listening on http://localhost:${port} && Admin : https://admin.socket.io`
  );
});
