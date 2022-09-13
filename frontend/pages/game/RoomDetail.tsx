import type { NextPage } from "next";
import Image from "next/image";

import styles from "./RoomDetail.module.scss";
import chair1 from "../../public/images/chair1.png";
import chair2 from "../../public/images/chair2.png";
import subway1 from "../../public/images/subway1.svg";
import subway2 from "../../public/images/subway2.svg";

const userList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const RoomDetail: NextPage = () => {
  return (
    <div className={`${styles.wrapper} flex column align-center`}>
      <h2 className="flex align-center coreExtra fs-34">
        <span className="flex justify-center align-center coreExtra fs-28">
          0/4
        </span>
        <span className={`${styles.room__title}`}>방 제목 111</span>
        <span className={`${styles.subway1}`}>
          <Image src={subway1} alt="subway1" />
        </span>
      </h2>
      <div className={`${styles.userList}`}>
        {userList.map((user) => (
          <div
            className={`${styles.user} flex column justify-center align-center fs-32`}
            key={user.id}
          >
            <span className={`${styles.subway2}`}>
              <Image src={subway2} alt="subway2" />
            </span>
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
      <footer className={styles.footer}>
        <span className={styles.chair1}>
          <Image src={chair1} alt="chair1" />
        </span>
        <button className="coreExtra fs-32" type="button">
          start
        </button>
        <span className={styles.chair2}>
          <Image src={chair2} alt="chair1" />
        </span>
      </footer>
    </div>
  );
};

export default RoomDetail;
