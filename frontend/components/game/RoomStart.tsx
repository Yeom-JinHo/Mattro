/* eslint-disable no-shadow */
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
// import Image from "next/image";

import styles from "./RoomStart.module.scss";
// import chair1 from "../../public/images/chair1.png";
// import chair2 from "../../public/images/chair2.png";
import { IUserList, ISocket } from "../../pages/game/api/socketio";
// import lineData from "../../constants/lineData";

interface Props {
  userList: IUserList[];
  socket: ISocket;
  roomName: string;
  canStart: boolean;
  isStartedGame: boolean;
  ref: React.ForwardedRef<unknown>;
}

const lineToColor = (line: string): string => {
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
    return line;
  }
  if (line === "경의중앙") {
    return "K";
  }
  if (line === "수인분당") {
    return "B";
  }
  if (line === "신분당") {
    return "S";
  }
  if (line === "우아신설") {
    return "W";
  }
  if (line === "신림") {
    return "SL";
  }
  return "";
};

const RoomStart: React.FunctionComponent<Props> = forwardRef(
  ({ userList, socket, roomName, canStart, isStartedGame }, ref) => {
    const inputLineRef = useRef<HTMLInputElement>(null);
    // const lineRef = useRef<any>(null);
    // const circleRef = useRef<HTMLDivElement>(null);
    // const answerRef = useRef<HTMLDivElement>(null);
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
        if (inputLineRef?.current) {
          socket.emit("start_game", roomName, inputLineRef.current.value);
        }
      }, [roomName]);

    const onSubmitAnswer = useCallback((answer: string) => {
      if (!answer) return;
      socket.emit("answer", line, answer);
      setAnswer("");
    }, []);
    // Enter 누르면 submit
    useEffect(() => {
      const keyDownHandler = (e: {
        key: string;
        preventDefault: () => void;
      }) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmitAnswer(answer);
        }
      };
      document.addEventListener("keydown", keyDownHandler);
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }, [answer]);

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
          className={`${
            styles.line
          } flex justify-center align-center L${lineToColor(line)}`}
        >
          <div
            className={`${
              styles.circle
            } flex justify-center align-center L${lineToColor(line)}`}
          >
            {isStartedGame ? (
              <div className={`${styles.answer} flex align-center`}>
                <span
                  className={`${
                    styles.answer__station
                  } flex justify-center align-center coreExtra L${lineToColor(
                    line
                  )}`}
                >
                  {line}
                </span>
                <input
                  className={`${styles.answer__content} coreExtra fs-60`}
                  value={answer}
                  onChange={onChangeAnswer}
                />
              </div>
            ) : (
              <input
                ref={inputLineRef}
                className="coreExtra fs-60"
                value={line}
                onChange={onChangeLine}
              />
            )}
            {isStartedGame ? (
              <span className="coreExtra fs-60">역</span>
            ) : (
              <span className="coreExtra fs-60">(호)선</span>
            )}
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
          {/* <span className={styles.chair2}>
            <Image src={chair2} alt="chair2" />
          </span> */}
        </div>
      </div>
    );
  }
);

export default RoomStart;
