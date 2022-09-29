import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ResultCard from "../../../components/theme/ResultCard";
import styles from "./result.module.scss";
import Loading from "../../../components/layouts/Loading";
import { indexRes } from "../../apis/recommend";
import loading from "../../../components/layouts/Loading";
type ResultType = {};

const Result = ({}: ResultType) => {
  const food = "떡볶이";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // api 호출
  useEffect(() => {
    // 인덱스로 접근
    async function indexFind() {
      //  api 호출
      const res = await indexRes(index);
    }
    indexFind();
    loading(false);
  }, []);

  return (
    <div className={`${styles.result} flex justify-center`}>
      <div className={`${styles.contents} flex column align-center`}>
        {!isLoading && (
          <div>
            <div className={`${styles.title} fs-24 coreBold flex align-center`}>
              <div>이번역은</div>
              <div className={`${styles.food} coreExtra`}>
                <span>{food}</span> 역
              </div>
              <div>입니다.</div>
            </div>
            <ResultCard />
            <div className={`${styles.btns} flex`}>
              <button
                onClick={() => {
                  router.push("/theme");
                }}
                type="button"
                className={`${styles.btn} notoBold `}
              >
                다른 메뉴 추천 받기
              </button>
              <button
                onClick={() => {
                  router.push("/");
                }}
                type="button"
                className={`${styles.btn} notoBold `}
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        )}
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Result;
