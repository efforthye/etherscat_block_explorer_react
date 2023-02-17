// import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getEthereumPrice } from './api';
import BlockContainer from './containers/Block';
import MainContainer from './containers/Main';
import TestContainer from './containers/Test';


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

  return (
    <AllWrap className='allWrap'>

      {/* 상단 고정 바 */}
      <TopPriceBar>
        <PriceBar>
          <Eth>
            ETH Price : <BlueSpan>{prices[0]}</BlueSpan>

            {/* 마이너스이면 red, 아니면 녹색으로 변경하기... */}
            <RedSpan>{prices[2]}</RedSpan>

          </Eth>
          <Gas>Gas : <BlueSpan>{prices[1]}</BlueSpan></Gas>
        </PriceBar>
      </TopPriceBar>

      {/* 헤더 컴포넌트 */}
      <Header className='header'>
        <div>
          <Link to={"/"}>
            <LogoImg alt="logo" src="images/logo.png" />
          </Link>
        </div>
        <div>
          <Link to={"/block"}>Block</Link>
          <Link to={"/transaction"}>Transaction</Link>
          <Link to={"/wallet"}>Wallet</Link>
          <Link to={"/mining"}>Mining</Link>
          <Link to={"/test"}>DB</Link>
        </div>
      </Header>

      <Wrap className="wrap">

        {/* link component 출력 */}
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
`;
const TopPriceBar = styled.div`
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