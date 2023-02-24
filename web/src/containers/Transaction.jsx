import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTransactionInfo } from "../api";
import TransactionComponent from "../components/Transaction";

// 트랜잭션 상세 정보 호출 함수
const transactionInfo = (setTxInfo, search) => {
    getTransactionInfo(search).then((data) => {
        setTxInfo(data);
    });

}

const TransactionContainer = () => {

    const location = useLocation();
    const params = location.pathname.split("/");
    const [search, setSearch] = useState(params[params.length - 1]);
    const [txInfo, setTxInfo] = useState([]);

    // 페이지 로드시 상세 정보 요청 보냄 ㅇ
    useEffect(() => {
        // 스크롤 새로고침
        window.scrollTo({ top: 0, });

        // 트랜잭션 정보 요청
        transactionInfo(setTxInfo, search);
    }, []);

    // search가 변경되면 트랜잭션 혹은 그에맞는 정보 새로 요청


    // return <TransactionComponent txInfo={txInfo} setSearch={setSearch} />
    return <TransactionComponent txInfo={txInfo} />
}

export default TransactionContainer;