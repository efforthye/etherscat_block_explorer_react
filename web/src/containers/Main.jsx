import { useEffect, useState } from "react";
import { getBlockInfo, getLatestBlocks, getLatestTransactions } from "../api";
import MainComponent from "../components/Main";

// websocket
const Web3 = require("web3");
const websocket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));


// 마지막 블록 요청 함수
const zeroBlock = (setBlockInfo, number) => {
    // getBlockInfo : 해당 번호의 블록 상세 정보를 불러온다.
    getBlockInfo(`${number}`).then((blockInfo) => {
        setBlockInfo(Object.entries(blockInfo));
        return blockInfo;
    });
}

// 마지막 블록 6개 요청 함수
const latestBlockArr = (setLatestBlocks) => {
    // getBlockInfo : 해당 번호의 블록 상세 정보를 불러온다.
    getLatestBlocks().then((blockInfo) => {
        setLatestBlocks(blockInfo);
        return blockInfo;
    });
}

// 마지막 트랜잭션 6개 요청 함수
const latestTransactionArr = (setLatestTransactions) => {
    // 해당 트랜잭션의 상세 정보를 불러와 setState한다.
    getLatestTransactions().then((transactionInfo) => {
        setLatestTransactions(transactionInfo);
        return transactionInfo; // void
    });
}


const MainContainer = () => {

    // 블록 정보
    const [blockInfo, setBlockInfo] = useState([]);
    // 마지막 6개 블록 정보 배열
    const [latestBlocks, setLatestBlocks] = useState([]);
    // 마지막 6개 트랜잭션 정보 배열
    const [latestTransactions, setLatestTransactions] = useState([]);

    useEffect(() => {
        zeroBlock(setBlockInfo, 0);
        latestBlockArr(setLatestBlocks);
        // latestTransactionArr(setLatestTransactions);
    }, []);


    return <MainComponent blockInfo={blockInfo} latestBlocks={latestBlocks} latestTransactions={latestTransactions} />
}

export default MainContainer;