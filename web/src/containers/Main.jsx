import { useEffect, useState } from "react";
import { getBlockInfo, getlatestBlocks } from "../api";
import MainComponent from "../components/Main";


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

const MainContainer = () => {

    // 블록 정보
    const [blockInfo, setBlockInfo] = useState([]);
    // 마지막 6개 블록 정보 배열
    const [latestBlocks, setLatestBlocks] = useState([]);

    // 0번째 블록 정보 로드
    // 가장 최근 블록으로 변경
    // 넘버 없이 보내기
    useEffect(() => {
        zeroBlock(setBlockInfo, 0);
        latestBlockArr(setLatestBlocks);
    }, []);

    return <MainComponent blockInfo={blockInfo} latestBlocks={latestBlocks} />
}

export default MainContainer;