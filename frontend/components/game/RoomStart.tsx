/* eslint-disable react/display-name */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect
} from "react";
import Image from "next/image";

import styles from "./RoomStart.module.scss";
import chair1 from "../../public/images/chair1.png";
import chair2 from "../../public/images/chair2.png";
import { IUserList, ISocket } from "../../pages/game/api/socketio";
import lineData from "../../constants/lineData";

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
    const inputRef = useRef<HTMLInputElement>(null);
    const lineRef = useRef<any>(null);
    const circleRef = useRef<HTMLDivElement>(null);
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
        if (inputRef?.current?.value) {
          socket.emit("start_game", roomName, inputRef.current.value);
        }
      }, [roomName]);

    const onSubmitAnswer: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      if (!answer) return;
      socket.emit("answer", answer);
    };

    useEffect(() => {
      if (
        line === "1" ||
        line === "2" ||
        line === "3" ||
        line === "4" ||
        line === "5" ||
        line === "6" ||
        line === "7" ||
        line === "8" ||
        line === "9"
      ) {
        if (lineRef?.current && circleRef?.current) {
          lineRef.current.className = `${styles.line} flex justify-center align-center L${line}`;
          circleRef.current.className = `${styles.circle} flex justify-center align-center L${line}`;
        }
      }
    }, [line]);

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
        <div
          ref={lineRef}
          className={`${styles.line} flex justify-center align-center L1`}
        >
          <div
            ref={circleRef}
            className={`${styles.circle} flex justify-center align-center L1`}
          >
            <input
              className="coreExtra fs-60"
              ref={inputRef}
              value={line}
              onChange={onChangeLine}
            />
            <span className="coreExtra fs-60">(호)선</span>
          </div>
        </div>
        <div className={`${styles.footer}`}>
          {/* <span className={styles.chair1}>
            <Image src={chair1} alt="chair1" />
          </span> */}
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
              <button type="submit">submit</button>
            </form>
          )}
          {/* <span className={styles.chair2}>
            <Image src={chair2} alt="chair2" />
          </span> */}
        </div>
      </div>
    );
  }
);

export default RoomStart;
