import { useEffect, useState } from "react";
import { getEthereumPrice } from "../api";
import HeaderComponent from "../components/Header";


// 이더리움 가격 등의 정보 조회 함수
const ethereumPrice = (setPrices) => {
    // getBlockInfo : 해당 번호의 블록 상세 정보를 불러온다.
    getEthereumPrice().then((prices) => {
        setPrices(prices);
    });
}

const HeaderContainer = () => {

    // 이더리움 가격 정보(이더가격, 퍼센트, 가스비용)
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        ethereumPrice(setPrices);
    }, []);

    // 15초마다 가격 불러온다.
    useEffect(() => {
        setTimeout(() => {
            ethereumPrice(setPrices);
        }, 15000);
    });

    return <HeaderComponent prices={prices} />
}

export default HeaderContainer;