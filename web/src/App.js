// import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getEthereumPrice } from './api';
import BlockContainer from './containers/Block';
import MainContainer from './containers/Main';
import TestContainer from './containers/Test';

// https://ssddo-story.tistory.com/15 -> 폰트어썸 변수명 카넬으로 변경
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

// websocket (DB 설정 다하고 Redux에 저장하여 랜더링하기.)
const Web3 = require("web3");
const websocket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));
websocket.eth.subscribe("newBlockHeaders", (error, result) => {
  if (!error) {
    console.log(result);
    // latestBlockArr(setLatestBlocks);
    // 랜더링하게 만들기
    // database 저장하기
  }
});


// 이더리움 가격 등의 정보 조회 함수
const ethereumPrice = (setPrices) => {
  // getBlockInfo : 해당 번호의 블록 상세 정보를 불러온다.
  getEthereumPrice().then((prices) => {
    setPrices(prices);
  });
}

function App() {

  // 이더리움 가격 정보(이더가격, 퍼센트, 가스비용)
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    ethereumPrice(setPrices);
  }, []);

  // 10초마다 가격 불러온다.
  useEffect(() => {
    setTimeout(() => {
      ethereumPrice(setPrices);
    }, 10000);
  });

  return (
    <AllWrap className='allWrap'>

      {/* fixed top header */}
      <TopPriceBar>
        <PriceBar>
          <Eth>
            ETH Price : <BlueSpan>{prices[0]}</BlueSpan>
            {/* 이더리움 가격 */}
            {prices[2]?.includes("+") ? <GreenSpan>{prices[2]}</GreenSpan> : <RedSpan>{prices[2]}</RedSpan>}
          </Eth>
          <Gas>
            <FontAwesomeIcon icon={faGasPump} />{" "}
            Gas : <BlueSpan>{prices[1]}</BlueSpan>
          </Gas>
        </PriceBar>
      </TopPriceBar>

      {/* header */}
      <Header className='header'>
        <div>
          <Link to={"/"}>
            <LogoImg alt="logo" src="images/logo.png" />
          </Link>
        </div>
        <RouterLink>
          <Link to={"/block"}>Block</Link>
          <Link to={"/transaction"}>Transaction</Link>
          <Link to={"/wallet"}>Wallet</Link>
          <Link to={"/mining"}>Mining</Link>
          <Link to={"/test"}>DB</Link>
        </RouterLink>
      </Header>

      <Wrap className="wrap">

        {/* linked component */}
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/block' element={<BlockContainer />} />
          <Route path='/test' element={<TestContainer />} />
        </Routes>

      </Wrap>

      {/* footer */}
      <Footer className='footer' src='images/footer.png' />

    </AllWrap>
  );
}

export default App;

const AllWrap = styled.div`
  /* background-color: rgb(245,245,245); */
  *::selection{
    /* background: #CDE6F3; */
    background: #0784c3;
    color: white;
  }
`;
const TopPriceBar = styled.div`
  z-index: 1;
  height: 65px;
  position: sticky;
  top: 0; left: 0;
  background-color: #fff;
  border-bottom: 1px solid rgb(245,245,245);
  display: flex;
  align-items: center;
`;
const PriceBar = styled.div`
  width: 75%;
  margin: 0 auto;
  font-size: small;
`;
const Eth = styled.span`
  color: gray;
  margin-right: 15px;
`;
const Gas = styled.span`
  color: gray;

`;
const Wrap = styled.div`
  margin: 0 auto;
  background-color: white;
  border-top: 1px solid rgb(245,245,245);
  border-bottom: 1px solid rgb(245,245,245);
  /* width: 80%; */

  /* height: 700px;  */
`;
const Header = styled.div`
  height: 78px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  width: 75%;
  margin: 0 auto;
  box-sizing: border-box;
  a{
    color: black;
    text-decoration: none;
    margin: 0 20px;
    font-weight: 600;
  }
`;
const Footer = styled.img`
  width: 100%;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
`;
const LogoImg = styled.img`
  width: 150px;
  cursor: pointer;
`;
const BlueSpan = styled.span`
  color: #0784c3;
`;
const RedSpan = styled.span`
  color: #dc3545;
`;
const GreenSpan = styled.span`
  color: #00a186
`;
const RouterLink = styled.div`
  a:hover{
    color: #0784c3;
    transition: all 0.5s;
  }
`;