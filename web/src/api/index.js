import axios from "axios";
axios.defaults.withCredentials = true;

const request = axios.create({
    baseURL: "http://localhost:8080/api"
});


// 테스트 데이터 요청 보내기 (db에 값 저장)
export const newBoard = async (boardData) => {
    return (await request.post("/test/new", boardData)).data;
}


// 블록 정보 가져오기 (현재블록넘버->블록해시로변경하기)
// 넘버 없이 보내기
export const getBlockInfo = async (blockNumber) => {
    console.log(blockNumber);
    return (await request.post("/block/info", blockNumber)).data;
}