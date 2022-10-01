import { API } from "./index";

// 취향별 맛집 추천 받기
export const themeRecommend = async (choices) => {
  const res = await API.get(`/individual/recommendation/${choices}`);
  if (res.status === 500) {
    console.log("Error");
  } else return res.data;
};

// 인덱스 기반 추천 받기
export const indexRes = async (data) => {
  console.log(data);
  const res = await API.get(`/individual/recommendation/list/${data}`);
  console.log("call");
  if (res.status === 500) {
    console.log("Error");
  } else return res.data;
};

export const ex = () => {};
