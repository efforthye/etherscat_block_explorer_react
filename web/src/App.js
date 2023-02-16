// import logo from './logo.svg';
// import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import TestContainer from './containers/Test';

function App() {
  return (
    <Wrap className="App">

      {/* 헤더 컴포넌트로 교체 */}
      <Header>
        <Link to={"/"}>Home</Link>
        <Link to={"/block"}>Block</Link>
        <Link to={"/transaction"}>Transaction</Link>
      </Header>

      <Routes>
        <Route path='/' element={<TestContainer />} />
        {/* <Route path='/test' element={<TestContainer />} />
        <Route path='/block' element={<TestContainer />} /> */}
      </Routes>

    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  margin: 0 auto;
  width: 80%;
  background-color: rgb(245,245,245);
  /* 임시 */
  height: 1200px; 
`;

const Header = styled.div`
  a{
    color: black;
    text-decoration: none;
    margin: 0 20px;
  }
`;