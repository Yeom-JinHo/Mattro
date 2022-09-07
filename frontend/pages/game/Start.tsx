import type { NextPage } from "next";

import GameLayout from "../../components/GameLayout";
import styles from "./Start.module.scss";

const userList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Start: NextPage = () => {
  return (
    <GameLayout>
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
          <input className="coreExtra fs-60" value="1호선" />
        </div>
        <button className="coreExtra fs-80" type="button">
          Start !
        </button>
      </div>
    </GameLayout>
  );
};

export default Start;
