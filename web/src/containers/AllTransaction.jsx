import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllTransaction, getAllTransactionCount } from "../api";
import AllTransactionComponent from "../components/AllTransaction";


// 모든 트랜잭션 개수 요청 함수(setState)
const getCount = (setTxCount) => {
    // api 요청 및 라우터 처리
    getAllTransactionCount().then((count) => {
        setTxCount(+count);
    });
}

// 모든 트랜잭션 요청 함수(페이지, setState)
const getTransactions = (page, setTransactions, setLoading) => {
    // 해당 페이지의 
    getAllTransaction(page).then((transactions) => {
        setTransactions(transactions);
        setLoading(false);
    });
}


const AllTransactionContainer = () => {

    const [loading, setLoading] = useState(true);

    // 페이징 처리를 위한 모든 트랜잭션 개수
    const [transactionCount, setTransactionCount] = useState(0);
    // 총 페이지 개수
    const allPageNum = parseInt(transactionCount / 10) - 1;

    // 해당 페이지의 트랜잭션들
    const [transactions, setTransactions] = useState([]);

    // 라우터에서 받아온 유저 선택 페이지 정보
    const location = useLocation();
    const params = location.pathname.split("/");
    const [page, setPage] = useState(+(params[params.length - 1]));

    useEffect(() => {
        getCount(setTransactionCount);
        getTransactions(page, setTransactions, setLoading);
    }, []);

    // 페이지 바뀌면 다시 요청
    useEffect(() => {
        getCount(setTransactionCount);
        getTransactions(page, setTransactions, setLoading);
    }, [page]);

    return (
        <>
            <AllTransactionComponent transactions={transactions} allPageNum={allPageNum} setPage={setPage} page={page} loading={loading} />
        </>
    )
}

export default AllTransactionContainer;