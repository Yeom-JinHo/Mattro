/* eslint-disable react/display-name */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import Image from "next/image";

import styles from "./RoomStart.module.scss";
import chair1 from "../../public/images/chair1.png";
import chair2 from "../../public/images/chair2.png";
import { IUserList, ISocket } from "../../pages/game/api/socketio";

interface Props {
  userList: IUserList[];
  socket: ISocket;
  roomName: string;
  canStart: boolean;
  isStartedGame: boolean;
  ref: React.ForwardedRef<unknown>;
}

const RoomStart: React.FunctionComponent<Props> = forwardRef(
  ({ userList, socket, roomName, canStart, isStartedGame }, ref) => {
    const lineRef = useRef<HTMLInputElement>(null);
    const [line, setLine] = useState<string>("경의중앙");
    const [answer, setAnswer] = useState<string>("");
    useImperativeHandle(ref, () => ({
      setLine
    }));
    const onChangeLine: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (isStartedGame) return;
      setLine(e.target.value);
    };
    const onChangeAnswer: React.ChangeEventHandler<HTMLInputElement> =
      useCallback((e) => {
        setAnswer(e.target.value);
      }, []);
    const onStartGame: React.MouseEventHandler<HTMLButtonElement> | undefined =
      useCallback(() => {
        if (!roomName) return;
        if (lineRef?.current?.value) {
          socket.emit("start_game", roomName, lineRef.current.value);
        }
      }, [roomName]);

    const onSubmitAnswer: React.FormEventHandler<HTMLFormElement> = useCallback(
      (e) => {
        e.preventDefault();
        if (!answer) return;
        socket.emit("answer", answer);
      },
      [answer]
    );

    return (
      <div className={`${styles.wrapper} flex column align-center`}>
        <h2 className="flex justify-center align-center coreExtra fs-34">
          <span>1번 출구</span>님 차례
        </h2>
        <div className={`${styles.userList}`}>
          {userList.map((user) => (
            <div
              className={`${styles.user} flex justify-center align-center coreExtra fs-24`}
              key={user.id}
            >
              {user.nickname}님
            </div>
          ))}
        </div>
        <div className={`${styles.line} flex justify-center align-center`}>
          <div className={`${styles.circle} flex justify-center align-center`}>
            <input
              className="coreExtra fs-60"
              ref={lineRef}
              value={line}
              onChange={onChangeLine}
            />
            <span className="coreExtra fs-60">(호)선</span>
          </div>
        </div>
        <div className={`${styles.footer}`}>
          <span className={styles.chair1}>
            <Image src={chair1} alt="chair1" />
          </span>
          {!isStartedGame && canStart && (
            <button
              className="coreExtra fs-80"
              type="button"
              onClick={onStartGame}
            >
              Start!
            </button>
          )}
          {isStartedGame && (
            <form onSubmit={onSubmitAnswer}>
              <input value={answer} onChange={onChangeAnswer} />
            </form>
          )}
          <span className={styles.chair2}>
            <Image src={chair2} alt="chair2" />
          </span>
        </div>
      </div>
    );
  }
);

export default RoomStart;
