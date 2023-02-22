import BlockComponent from "../components/Block";
import { useLocation } from 'react-router-dom';
import { getBlockInfo } from "../api";
import { useEffect, useState } from "react";

// 블록 조회 함수
const getBlock = (setBlock, search) => {
    getBlockInfo(search).then((block) => {
        console.log(block);
        setBlock(block);
    });
}

const BlockContainer = () => {

    const location = useLocation();
    const params = location.pathname.split("/");
    // const search = params[params.length - 1];
    const [search, setSearch] = useState(params[params.length - 1]);

    // 해당 검색에 맞는 블록을 찾아 출력하여 컴포넌트에 보내준다.
    const [block, setBlock] = useState([]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });

        if (search == "block") {
            // 전체 블록 요청(?)(페이지를 보낸다.)

        } else {
            getBlock(setBlock, search);
        }

    }, []);

    // 주소값 바뀔시 블록 다시 불러옴
    useEffect(() => {
        getBlock(setBlock, search);
    }, [search]);

    return <BlockComponent block={block} setSearch={setSearch} />
}

export default BlockContainer;