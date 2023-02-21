// import logo from './logo.svg';
// import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import BlockContainer from './containers/Block';
import FooterContainer from './containers/Footer';
import HeaderContainer from './containers/Header';
import MainContainer from './containers/Main';
import TestContainer from './containers/Test';


// websocket (DB 설정 다하고 Redux에 저장하여 랜더링하기.)
// const Web3 = require("web3");
// const websocket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));
// websocket.eth.subscribe("newBlockHeaders", (error, result) => {
//   if (!error) {
//     console.log(result);
//   }
// });
// 서버로부터 웹소켓 요청을 받아 리랜더링하기(Redux 혹은 Database 혹은 직접적인 정보 받아와 출력)
// 블록 생성 시 리랜더링, 트랜잭션 발생 시 리랜더링 등


function App() {

  return (
    <AllWrap className='allWrap'>

      {/* Header */}
      <HeaderContainer />

      <Wrap className="wrap">
        {/* linked component */}
        <Routes>
          <Route path='/' element={<MainContainer />} />
          {/* AllBlockCantainer 생성 */}
          <Route path='/block' element={<BlockContainer />} />
          <Route path='/block/:blockNumber' element={<BlockContainer />} />
          <Route path='/test' element={<TestContainer />} />
        </Routes>
      </Wrap>

      {/* footer */}
      <FooterContainer />

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
const Wrap = styled.div`
  margin: 0 auto;
  background-color: white;
  border-top: 1px solid rgb(245,245,245);
  border-bottom: 1px solid rgb(245,245,245);
  /* width: 80%; */

  /* height: 700px;  */
`;