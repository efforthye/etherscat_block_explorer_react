import React from 'react';
import styled from 'styled-components';

import Spinner from '../images/sample.gif';

export const Loading = () => {
  return (
    <>
      <Wrap>
        <div style={{ fontWeight: "600" }}>잠시만 기다려 주세요.</div>
        <img src={Spinner} alt="로딩중" width="5%" />
      </Wrap>
    </>
  )
};

export default Loading;

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: inline-block;
`;