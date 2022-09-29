import { API } from "./index";

// 취향별 맛집 추천 받기
export const themeRecommend = async (choices) => {
  console.log(choices);
  const res = await API.get(`/individual/recommendation/${choices}`);
  console.log(res);
  if (res.status === 500) {
    console.log("Error");
  } else return res.data;
};

// 인덱스 기반 추천 받기
export const indexRes = async (index) => {
  const res = await API.get(`/individual/recommendation/${index}`);
  if (res.status === 500) {
    console.log("Error");
  } else return res.data;
};

export const ex = () => {};
