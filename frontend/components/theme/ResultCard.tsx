import Image from "next/image";
import { useEffect } from "react";
import styles from "./ResultCard.module.scss";
import temp from "../../public/images/foodTemp.jpeg";
import star from "../../public/images/star.png";
import kakao from "../../public/images/kakao.svg";
import { storeDataType } from "../../constants/storeData";

const ResultCard = ({
  id,
  mainImageURL,
  menuImageUrl,
  menuList,
  name,
  rating,
  searchKeyword,
  storUrl,
  storeIdx,
  역명
}: storeDataType) => {
  // 카카오톡 공유하기 기능
  console.log(typeof mainImageURL);
  const shareKakao = () => {
    const shareUrl = `/theme/share/${id}`; // 공유페이지 위해서
    const { Kakao, location } = window;

    console.log(location.href + id);
    if (!window.Kakao.isInitialized()) {
      // 공유하기 기능을 위해 initialize 마운트 될때 적용
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: { name },
        description: "테스트 입니당",
        imageUrl: mainImageURL !== null ? { mainImageURL } : { menuImageUrl },
        link: {
          // mobileWebUrl: "http://localhost:3000/theme/share" + { id },
          mobileUrl: location.href,
          webUrl: location.href
          // webUrl: "http://localhost:3000/theme/share" + { id }
        }
      }
    });
  };

  return (
    <div className={`${styles.card} flex column align-center justify-center`}>
      <div className={`${styles.num} coreExtra fs-18 flex align-center`}>
        <p>1</p>
        <div className="coreBold fs-24 flex ">{name}</div>
      </div>

      <div className={`${styles.img} flex align-center justify-center`}>
        {mainImageURL !== null && (
          <Image
            src={mainImageURL}
            alt="food"
            className={styles.sub}
            unoptimized={true}
            width="400px"
            height="300px"
          />
        )}
        {mainImageURL === null && menuImageUrl !== null && (
          <Image
            src={menuImageUrl}
            alt="food"
            className={styles.sub}
            unoptimized={true}
            width="400px"
            height="300px"
          />
        )}
        {mainImageURL === null && menuImageUrl === null && (
          <Image src={temp} alt="food" className={styles.sub} />
        )}
      </div>
      <div className={`${styles.detail} flex column justify-center`}>
        <div className={`${styles.txt} flex  notoMid`}>
          <span>주소</span>
          <span>{searchKeyword}</span>
        </div>
        <div className={`${styles.txt} flex fs-15 notoMid`}>
          <span>대표 메뉴</span>
          <span>{menuList}</span>
        </div>
        <div className={`${styles.txt} flex fs-15 notoMid`}>
          <span>가까운 역</span>
          <span>{역명}</span>
        </div>
        <div className={`${styles.txt} flex fs-15 notoMid`}>
          <span>별점</span>
          <span>{rating}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={shareKakao}
        className="flex notoBold align-center justify-center"
      >
        <div className="flex align-center justify-center">
          <Image src={kakao} alt="kakao" className={styles.icon} />
        </div>
        <p className={styles.btn_txt}>카카오톡 공유하기</p>
      </button>
    </div>
  );
};
export default ResultCard;
