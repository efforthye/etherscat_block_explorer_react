import axios from "axios";
axios.defaults.withCredentials = true;

const request = axios.create({
    baseURL: "http://localhost:8080/api"
});


// 테스트 데이터 요청 (database저장)
export const newBoard = async (boardData) => {
    return (await request.post("/test/new", boardData)).data;
}
// 크롤링 이더리움 가격 정보 요청
export const getEthereumPrice = async () => {
    // return (await request.post("/test/crawler")).data;
    const info = ["$1,649.62", "35 Gwei", " (+0.68%)"];
    return info;
}
// 지갑 잔액 요청 (해시)
export const getAccountBalance = async (account) => {
    return (await request.post("/test/getBalance", { account: account })).data;
}


// Block
// 마지막 블록 6개 가져오는 요청 
export const getLatestBlocks = async () => {
    return (await request.post("/block/latest")).data;
}
// 블록 정보 요청 (블록넘버or블록해시)
export const getBlockInfo = async (numberOrHash) => {
    return (await request.post("/block/info", { value: numberOrHash })).data;
}
// 모든 블록 개수를 가져오는 요청
export const getAllBlockCount = async () => {
    return (await request.post("/block/allCount")).data;
}
// 모든 블록을 가져오는 요청 (해당 페이지)
export const getAllBlock = async (page) => {
    return (await request.post("/block/pageBlock", { page: page })).data;
}


// Transaction
// 트랜잭션 정보 요청 (해시)
export const getTransactionInfo = async (txHash) => {
    return (await request.post("/transaction/info", { hash: txHash })).data;
}
// 마지막 트랜잭션 6개 가져오는 요청 
export const getLatestTransactions = async () => {
    return (await request.post("/transaction/latest")).data;
}
// 해당 유저의 모든 트랜잭션을 가져오는 요청 (계정)
export const getAccountTransactions = async (account) => {
    return (await request.post("/transaction/account", { account: account })).data;
}
// 모든 트랜잭션 개수 요청
export const getAllTransactionCount = async () => {
    return (await request.post("/transaction/allCount")).data;
}
// 해당 페이지의 트랜잭션들 요청
export const getAllTransaction = async (page) => {
    return (await request.post("/transaction/allTransaction", { page: page })).data;
}
