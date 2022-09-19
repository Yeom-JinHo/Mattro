import React, { useCallback, useState } from "react";
import Image from "next/image";

import styles from "./RoomStart.module.scss";
import chair1 from "../../public/images/chair1.png";
import chair2 from "../../public/images/chair2.png";

const userList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const RoomStart: React.FunctionComponent = () => {
  const [line, setLine] = useState<string>("경의중앙");
  const onChangeLine: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLine(e.target.value);
  };
  const onStartGame: React.MouseEventHandler<HTMLButtonElement> | undefined =
    useCallback(() => {
      console.log("start ========================");
    }, []);

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
            1번 출구님
          </div>
        ))}
      </div>
      <div className={`${styles.line} flex justify-center align-center`}>
        <div className={`${styles.circle} flex justify-center align-center`}>
          <input
            className="coreExtra fs-60"
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
        <button className="coreExtra fs-80" type="button" onClick={onStartGame}>
          Start!
        </button>
        <span className={styles.chair2}>
          <Image src={chair2} alt="chair2" />
        </span>
      </div>
    </div>
  );
};

export default RoomStart;
