import styled from "styled-components";

// const BlockComponent = ({ mineStart }) => {
const BlockComponent = ({ web3, request }) => {
    return (
        <>
            <AllWrap>
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

            </AllWrap>

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
                <button onClick={async () => {
                    // 블록의 transactionsRoot (?)
                    // 거래를 통한 블록의 트랜잭션 해시여야 한다.
                    console.log(await web3.eth.getTransaction("0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"))
                }}>트랜잭션해시-트랜잭션정보</button>

            </TestWrap>

        </>
    )
}
export default BlockComponent;

const AllWrap = styled.div`
    background-color: #6633991f;
`;
const BlockWrap = styled.div`
    background-color: #9970331f;
`;
const TestWrap = styled.div`
    background-color: #338a991f;
`;