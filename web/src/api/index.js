import axios from "axios";
axios.defaults.withCredentials = true;

const request = axios.create({
    baseURL: "http://localhost:8080/api"
});


// 테스트 데이터 요청 (db 값 저장)
export const newBoard = async (boardData) => {
    return (await request.post("/test/new", boardData)).data;
}

// 이더리움 가격 정보 요청
export const getEthereumPrice = async () => {
    return (await request.post("/test/crawler")).data;
}


// 블록 정보 가져오기 (현재블록넘버->블록해시로변경하기)
// 넘버 없이 보내기
export const getBlockInfo = async (blockNumber) => {
    return (await request.post("/block/info", { value: blockNumber })).data;
}


// 마지막 블록 6개 가져오는 요청 ㅇ
export const getLatestBlocks = async () => {
    return (await request.post("/block/latest")).data;
}

// 마지막 트랜잭션 6개 가져오는 요청 ㅇ
export const getLatestTransactions = async () => {
    return (await request.post("/transaction/latest")).data;
}