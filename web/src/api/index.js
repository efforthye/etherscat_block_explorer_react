import axios from "axios";
axios.defaults.withCredentials = true;

const request = axios.create({
    baseURL: "http://localhost:8080/api"
});

// 테스트 데이터 요청 보내기
export const newBoard = async (boardData) => {
    console.log("하이");
    return (await request.post("/test/new", boardData)).data;
}