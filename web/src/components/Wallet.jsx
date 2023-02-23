import styled from "styled-components";

const WalletComponent = ({ search, setSearch, transactions, balance }) => {

    console.log(transactions);
    const from = transactions?.from[0];
    const to = transactions?.to[0];

    // {/* 여기에서 다른블록 등등 클릭하면 이동해야 하니까 setSearch도 props로 받아오기 */ }
    // Link to 로 이동할 때 setSearch 도 해주기 ㅇㅇㅇㅇㅇ(중요)

    return (
        <>
            <AllWrap>
                <MarginDiv>Address {search}</MarginDiv>

                {/* 잔액 */}
                <MarginDiv>잔액 : {balance} ETH</MarginDiv>

                {/* from.length가 있으면 보이게, 없으면 안보이게 */}
                {from?.length ? <>
                    <div>from</div>
                    <div>
                        {from?.map((item, index) => (
                            // 해시, 블록넘버, from, to, value
                            <MarginDiv key={`from-${index}`}>
                                <div>hash:</div>
                                <div>{item.hash}</div>
                                <div>blockNumber:</div>
                                <div>{item.blockNumber}</div>
                                <div>from:</div>
                                <div>{item.from}</div>
                                <div>to:</div>
                                <div>{item.to}</div>
                                <div>value:</div>
                                <div>{(item.value) / Math.pow(10, 18)}ETH</div>
                            </MarginDiv>
                        ))}
                    </div>
                </> : <></>}

                {/* to 도 from 처럼 ㄱㄱ~ */}
                {to?.length ? <>
                    <div>to</div>
                    <div>
                        {to?.map((item, index) => (
                            // 해시, 블록넘버, from, to, value
                            <MarginDiv key={`to-${index}`}>
                                <div>hash:</div>
                                <div>{item.hash}</div>
                                <div>blockNumber:</div>
                                <div>{item.blockNumber}</div>
                                <div>from:</div>
                                <div>{item.from}</div>
                                <div>to:</div>
                                <div>{item.to}</div>
                                <div>value:</div>
                                <div>{(item.value) / Math.pow(10, 18)}ETH</div>
                            </MarginDiv>
                        ))}
                    </div>
                </> : <></>}

            </AllWrap>


        </>
    )
}
export default WalletComponent;

const AllWrap = styled.div`
    width: 70%;
    margin: 0 auto;
`;
const MarginDiv = styled.div`
    background-color: rgb(245,245,245);
    margin: 20px 0;
`;