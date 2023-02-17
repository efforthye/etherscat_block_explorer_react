import { useEffect, useState } from "react";
import { getBlockInfo } from "../api";
import MainComponent from "../components/Main";


// 0번째 블록 요청 함수
const zeroBlock = (setBlockInfo, number) => {
    // getBlockInfo : 해당 번호의 블록 상세 정보를 불러온다.
    getBlockInfo(`${number}`).then((blockInfo) => {
        setBlockInfo(Object.entries(blockInfo));
        return blockInfo;
    });
}

const MainContainer = () => {

    // 블록 정보
    const [blockInfo, setBlockInfo] = useState([]);

    // 0번째 블록 정보 로드
    // 가장 최근 블록으로 변경
    // 넘버 없이 보내기
    useEffect(() => {
        zeroBlock(setBlockInfo, 0);
    }, []);

    return <MainComponent blockInfo={blockInfo} />
}

export default MainContainer;