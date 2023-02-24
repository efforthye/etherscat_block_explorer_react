import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 컨테이너로부터 받아올 값
const TestComponent = ({ changeFuncs, upload, web3, request }) => {

    // ref
    const toRef = useRef(null).current;
    const ether = useRef(null).current;
    const sendTransaction = useRef(null).current;


    const [nowAccount, setNowAccount] = useState();

    useEffect(() => {
        window.ethereum.request({
            method: "eth_requestAccounts"
        }).then((data) => {
            setNowAccount(data);
        });
    }, []);


    // metamask 연결 확인
    if (window.ethereum) {
        const isConnected = window.ethereum.isConnected();
        console.log(isConnected); //false

        // 잔액 조회 함수
        const getBalance = async (accounts) => {
            console.log(accounts[0]);

            // 메타마스크에 RPC 잔액 조회 요청(params : 메타마스크 계정) / HTML에 띄움
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: accounts,
            });
            console.log(parseInt(balance) / Math.pow(10, 18) + "ETH");
        }

        // 네트워크 연결 감지
        window.ethereum.on("connect", async (connectInfo) => {
            // 연결 네트워크 확인
            console.log(connectInfo);
            console.log(parseInt(connectInfo.chainId));

            // 연결 여부
            const isConnected = window.ethereum.isConnected();
            console.log(`connect 후 isConnected : ${isConnected}`); // true

            // 블록 개수 확인
            const blockNumber = await window.ethereum.request({
                method: "eth_blockNumber",
            });
            console.log(blockNumber);

            try {
                // 확장 프로그램 계정 조회(중요)
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                alert(accounts);
                // 계정 잔액 조회
                await getBalance(accounts);
            } catch (error) {
                console.error(error);
            }
        });

        // 계정 변경 감지
        window.ethereum.on("accountsChanged", async (accounts) => {
            setNowAccount(accounts);
            console.log(nowAccount);

            // 잔액 조회
            await getBalance(accounts);
        });

        // 네트워크 변경 감지 : 0x1
        window.ethereum.on("chainChanged", (chainId) => {
            console.log(chainId);
        });

    }

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
                        console.log("가스 가격 ETH로 변환하기");
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
                    {/* <button onClick={async () => {
                        // 블록의 transactionsRoot(?)
                        // 거래를 통한 블록의 트랜잭션 해시여야 한다.
                        console.log(await web3.eth.getTransaction("0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"))
                    }}>트랜잭션해시-트랜잭션정보</button> */}

                </TestWrap>

                <BlockWrap>
                    <button onClick={async () => {
                        const block = await web3.eth.getBlock(0);
                        console.log(block);
                    }}>0번 블록의 정보</button>
                </BlockWrap>

                {/* Test2 : 잔액 보내기 */}
                <TestWrap>
                    <button onClick={async () => {

                        const accounts = await web3.eth.getAccounts();
                        // const three = (await web3.eth.getAccounts())[3];
                        const to = (await web3.eth.getAccounts())[(await web3.eth.getAccounts()).length - 1];
                        console.log(accounts);
                        console.log(to);

                        // 계정 목록
                        alert("현재 계정 : " + nowAccount);
                        alert(`${to}` + " 에게 보냅니다.")

                        window.ethereum.request({
                            method: "eth_sendTransaction",
                            params: [{
                                from: nowAccount.toString(),
                                to: to.toString(),
                                value: "0x" + (+1 * Math.pow(10, 18)).toString(16),
                            }],
                        }).then(async (result) => {
                            // 결과물
                            console.log(result);

                        }).catch((err) => {
                            console.error(err);
                        });
                    }}>트랜잭션 보내기</button>

                    <button onClick={async () => {
                        const transactionHash = prompt(`해시를 알려줘~ 
                            ex) 0x8f7df2ede8a9f8e87efd5857e972f0afcd9edf6ea3a02f6282163add4aff8db6
                        `);
                        console.log(await web3.eth.getTransaction(transactionHash));
                    }}>트랜잭션 해시로 트랜잭션 정보 확인하기</button>
                </TestWrap>

                <MiningWrap>
                    {/* <button>마이닝워랩 ㅇㅅㅇ</button> */}
                </MiningWrap>
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
const MiningWrap = styled.div`
    background-color: #6633991f;
`;





// const BlockComponent = () => {
//     return (
//         <div>하이</div>
//     )
// }
// export default BlockComponent;