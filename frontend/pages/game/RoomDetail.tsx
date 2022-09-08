import type { NextPage } from "next";

import styles from "./RoomDetail.module.scss";

const userList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const RoomDetail: NextPage = () => {
  return (
    <div className={`${styles.wrapper} page-fallback`}>
      <h2 className="flex align-center coreExtra fs-34">
        <span className="flex justify-center align-center coreExtra fs-28">
          0/4
        </span>
        방 제목 111
      </h2>
      <div className={`${styles.userList}`}>
        {userList.map((user) => (
          <div
            className={`${styles.user} flex column justify-center align-center fs-32`}
            key={user.id}
          >
            {/* <img src="" alt="" /> */}
            <div className={`${styles.username} notoBold`}>
              {user.id}번 출구님
            </div>
            <span
              className={`${styles.invisible} flex justify-center align-center notoBold fs-20`}
            >
              나
            </span>
          </div>
        ))}
      </div>
      <button className="coreExtra fs-32" type="button">
        start
      </button>
    </div>
  );
};

export default RoomDetail;
