import { useEffect, useState } from "react";
import { getBlockInfo, getEthereumPrice, getLatestBlocks, getLatestTransactions } from "../api";
import MainComponent from "../components/Main";

// websocket
const Web3 = require("web3");
// const websocket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));


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
const latestTransactionArr = (setLatestTransactions, setLoading) => {
    // 해당 트랜잭션의 상세 정보를 불러와 setState한다.
    getLatestTransactions().then((transactionInfo) => {
        setLatestTransactions(transactionInfo);
        setLoading(false);
        return transactionInfo; // void
    });
}

// 이더리움 가격 등의 정보 조회 함수
const ethereumPrice = (setPrices) => {
    // getBlockInfo : 해당 번호의 블록 상세 정보를 불러온다.
    getEthereumPrice().then((prices) => {
        setPrices(prices);
    });
}

const MainContainer = () => {

    const [loading, setLoading] = useState(true);

    // 1초
    useEffect(() => {
        setTimeout(() => {
            zeroBlock(setBlockInfo, 0);
            latestBlockArr(setLatestBlocks);
            latestTransactionArr(setLatestTransactions, setLoading);
        }, 1000);
    });

    // 블록 정보
    const [blockInfo, setBlockInfo] = useState([]);
    // 마지막 6개 블록 정보 배열
    const [latestBlocks, setLatestBlocks] = useState([]);
    // 마지막 6개 트랜잭션 정보 배열
    const [latestTransactions, setLatestTransactions] = useState([]);
    // 이더리움 가격 정보(이더가격, 퍼센트, 가스비용)
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        zeroBlock(setBlockInfo, 0);
        latestBlockArr(setLatestBlocks);
        latestTransactionArr(setLatestTransactions, setLoading);
        ethereumPrice(setPrices);
    }, []);

    // 15초마다 가격 불러온다.
    useEffect(() => {
        setTimeout(() => {
            ethereumPrice(setPrices);
        }, 15000);
    });

    return <MainComponent blockInfo={blockInfo} latestBlocks={latestBlocks} latestTransactions={latestTransactions} loading={loading} prices={prices} />
}

export default MainContainer;