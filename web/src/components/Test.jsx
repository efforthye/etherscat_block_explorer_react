import styled from "styled-components";

// 컨테이너로부터 받아올 값
const TestComponent = ({ changeFuncs, upload, web3, request }) => {
    return (
        <>
            <AppWrap>

                <Wrap>
                    <label>
                        Title : <input type={"text"} onInput={changeFuncs.changeTitle} />
                    </label>
                    <label>
                        Text : <input type={"text"} onInput={changeFuncs.changeText} />
                    </label>
                    <button onClick={upload}>Upload</button>
                </Wrap>


                <Test2Wrap>
                    <button onClick={() => {
                        web3.eth.getAccounts().then((accounts) => {
                            console.log(accounts);
                        });
                    }}>지갑 목록</button>

                    <button onClick={async () => {
                        const accounts = await web3.eth.getAccounts();
                        for (let i = 0; i < accounts.length; ++i) {
                            const balanceWei = await web3.eth.getBalance(accounts[i]);
                            const balanceEth = web3.utils.fromWei(balanceWei);
                            console.log(`(${i}) ${accounts[i]} : ${balanceEth} ETH`);
                            <div>{`(${i}) ${accounts[i]} : ${balanceEth} ETH`}</div>
                        }
                    }}>계좌, 잔액</button>

                    <button onClick={async () => {
                        console.log(await web3.eth.getBlock(0));
                    }}>블록 영번</button>

                    <button onClick={async () => {
                        console.log(await web3.eth.getBlockNumber());
                    }}>총블록개수</button>

                    <button onClick={async () => {
                        console.log(await web3.eth.getGasPrice() + " Wei");
                        // console.log(+(await web3.eth.getGasPrice()) / Math.pow(10, 18) + "ETH");
                        // console.log(+(await web3.eth.getGasPrice()) / 1000000000000000000);
                        console.log("가스 가격 ETH로 변환하기")
                    }}>가스 가격</button>

                </Test2Wrap>

                <TestWrap>
                    <button onClick={() => {
                        console.log(web3.eth);
                    }}>전체eth메서드보기</button>
                    <button onClick={() => {
                        console.log(`admin,miner,txpool,web3,personal,eth,net`);
                    }}>사용가능한모듈</button>

                    {/* 계정 생성 */}
                    {/* https://web3js-kr.readthedocs.io/ko/latest/web3-eth-accounts.html#eth-accounts */}

                    {/* 트랜잭션 관련 */}
                    <button onClick={async () => {
                        // 블록의 transactionsRoot
                        // 거래를 통한 블록의 트랜잭션 해시여야 한다.
                        console.log(await web3.eth.getTransaction("0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"))
                    }}>트랜잭션해시-트랜잭션정보</button>

                </TestWrap>

                <BlockWrap>
                    <button onClick={async () => {
                        const block = await web3.eth.getBlock(0);
                        console.log(block);
                    }}>0번 블록의 정보</button>
                </BlockWrap>

                {/* Test2 : 잔액 보내기 */}
                <TestWrap>
                    {/* <button onClick={async () => {
                        // 블록의 transactionsRoot (?) 아님!
                        // 거래를 통한 블록의 트랜잭션 해시여야 한다.
                        console.log(await web3.eth.getTransaction("0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"))
                    }}>트랜잭션해시-트랜잭션정보</button> */}
                    {/* <button onClick={async () => {
                        // 계정 목록
                        const accounts = await web3.eth.getAccounts();

                        // 언락
                        await request({
                            data: {
                                id: 1337,
                                jsonrpc: "2.0",
                                method: "personal_unlockAccount",
                                params: [accounts[0], prompt("비밀번호를 입력해주세요.")],
                            },
                        });

                        // 트랜잭션 보낼 값
                        const from = (await web3.eth.getAccounts())[0];
                        const to = (await web3.eth.getAccounts())[1];
                        const value = web3.utils.toWei("1"); // 1ETH

                        // 트랜잭션 보내기
                        const transaction = await web3.eth.sendTransaction({ from, to, value });
                        console.log(transaction);

                        // 트랜잭션 확인
                        const transaction2 = await web3.eth.getTransaction(transaction.transactionHash);
                        console.log(transaction2);
                        // 트랜잭션 해시를 통하여 트랜잭션 확인(우분투에 트랜잭션 결과로 전송된 해시를 가져와 집어넣었다.)
                        // const transaction3 = await web3.eth.getTransaction("0x864ce3b776b57f15215eaa5a21cc82b940ef44227d879fbb8fa9904f450a4e2c");
                        // console.log(transaction3);

                    }}>트랜잭션</button> */}
                </TestWrap>


            </AppWrap>

        </>
    )
}
export default TestComponent;


const AppWrap = styled.div`
    width: 70%;
    margin: 0 auto;
    &>div{
        margin: 20px 0;
    }
`;

const Test2Wrap = styled.div`
    background-color: #6633991f;
`;
const BlockWrap = styled.div`
    background-color: #9970331f;
`;
const TestWrap = styled.div`
    background-color: #338a991f;
`;

const Wrap = styled.div`
    label {
        display: block;
        input {
            margin-left : 0.5rem;
        }
    }
`;





// const BlockComponent = () => {
//     return (
//         <div>하이</div>
//     )
// }
// export default BlockComponent;