import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccountBalance, getAccountTransactions } from "../api";
import WalletComponent from "../components/Wallet";

// 해당 유저 관련 트랜잭션을 요청하는 함수
const getTransactions = (setTransactions, account) => {
    getAccountTransactions(account).then((transactions) => {
        setTransactions(transactions);
    });
}

// 해당 유저의 잔액을 요청하는 함수
const getBalance = (setBalance, account) => {
    getAccountBalance(account).then((balance) => {
        setBalance(balance);
    });
}


const WalletContainer = () => {

    // 라우터에서 가져온 값 search에 저장
    const location = useLocation();
    const params = location.pathname.split("/");
    const [search, setSearch] = useState(params[params.length - 1]);

    // 트랜잭션 
    const [transactions, setTransactions] = useState({ from: [], to: [] });

    // 잔액
    const [balance, setBalance] = useState(0);


    // 랜더링시 요청 함수 호출
    useEffect(() => {
        getTransactions(setTransactions, search);
        getBalance(setBalance, search);
    }, []);

    // 주소 변경시 리랜더링
    useEffect(() => {
        getTransactions(setTransactions, search);
        getBalance(setBalance, search);
    }, [search]);


    // 전달
    return <WalletComponent transactions={transactions} search={search} setSearch={setSearch} balance={balance} />
}

export default WalletContainer;