import { useEffect, useState } from "react";
import { getBlockInfo, getEthereumPrice, getlatestBlocks } from "../api";
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
    getlatestBlocks().then((blockInfo) => {
        // console.log(blockInfo);
        // setLatestBlocks(Object.entries(blockInfo));
        setLatestBlocks(blockInfo);
        return blockInfo;
    });
}

// 블록 채굴 감지 함수
// block mining console
websocket.eth.subscribe("newBlockHeaders", (error, result) => {
    if (!error) {
        console.log("ㅇㅅㅇ");
        // latestBlockArr(setLatestBlocks);
        // 요청 보내기 .. 
        // 랜더링하게 만들기?
        // database 저장하기
    }
});


const MainContainer = () => {

    // 블록 정보
    const [blockInfo, setBlockInfo] = useState([]);
    // 마지막 6개 블록 정보 배열
    const [latestBlocks, setLatestBlocks] = useState([]);

    useEffect(() => {
        zeroBlock(setBlockInfo, 0);
        latestBlockArr(setLatestBlocks);
    }, []);


    return <MainComponent blockInfo={blockInfo} latestBlocks={latestBlocks} />
}

export default MainContainer;