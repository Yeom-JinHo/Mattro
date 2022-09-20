import { Socket } from "socket.io-client";

export interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  welcome: (nickname: string, newCount: number) => void;
  bye: (nickname: string, newCount: number) => void;
  new_message: (message: string) => void;
  room_change: (rooms: []) => void;
  welcome_count: (newCount: number) => void;
}

export interface ClientToServerEvents {
  enter_room: (roomName: string, done: () => void) => void;
  disconnecting: () => void;
  disconnect: () => void;
  new_message: (msg: string, room: object, done: () => void) => void;
  nickname: (nickname: string) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  nickname: string;
}

export interface IUserList {
  id: number;
  nickname: string;
}

export interface IRoomList {
  title: string;
}
