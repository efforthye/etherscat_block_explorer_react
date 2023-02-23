import { useEffect, useState } from "react";
import { getAllBlock, getAllBlockCount } from "../api";
import AllBlockComponent from "../components/AllBlock";
import { useLocation } from 'react-router-dom';

// 블록 개수 요청 함수
const getCount = (setBlockCount) => {
    getAllBlockCount().then((count) => {
        setBlockCount(+count);
    });
}

// 모든 블록 요청(페이지, setState)
const getBlocks = (page, setBlocks) => {
    getAllBlock(page).then((allBlock) => {
        setBlocks(allBlock);
    });
}


const AllBlockContainer = () => {

    // 블록 개수, 몇 개씩 띄울지 생각해보고 페이지 나누기
    const [blockCount, setBlockCount] = useState(0);
    // 총 페이지 개수
    const allPageNum = parseInt(blockCount / 20) - 1;

    // 해당 페이지의 블록들
    const [blocks, setBlocks] = useState([]);

    // 라우터에서 받아온 유저 선택 페이지 정보
    const location = useLocation();
    const params = location.pathname.split("/");
    const [page, setPage] = useState(+(params[params.length - 1]));

    // 페이지 로드시 요청
    useEffect(() => {
        getCount(setBlockCount);
        getBlocks(page, setBlocks);
    }, []);


    // 페이지 바뀌면 다시 요청
    useEffect(() => {
        getCount(setBlockCount);
        getBlocks(page, setBlocks);
    }, [page]);


    return (
        <>
            {/* props 보내기, 해당 페이지 버튼 만들기 ㅇㅇ */}
            <AllBlockComponent blocks={blocks} allPageNum={allPageNum} setPage={setPage} page={page} />
        </>
    )
}

export default AllBlockContainer;