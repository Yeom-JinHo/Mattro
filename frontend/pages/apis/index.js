import axios from "axios";
export const BASE_URL = "http://j7c206.p.ssafy.io:9090";

export const API = axios.create({
  baseURL: BASE_URL,
  header: {
    "Access-Control-Allow-Origin": "http://j7c206.p.ssafy.io:9090",
    withCredentials: true
  }
});
