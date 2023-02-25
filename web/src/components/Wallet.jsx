import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliceHash, timestampFunc } from "../util";

const WalletComponent = ({ search, setSearch, transactions, balance }) => {

    // console.log(transactions);
    const from = transactions?.from[0];
    const to = transactions?.to[0];

    // {/* 여기에서 다른블록 등등 클릭하면 이동해야 하니까 setSearch도 props로 받아오기 */ }
    // Link to 로 이동할 때 setSearch 도 해주기 ㅇㅇㅇㅇㅇ(중요)

    return (
        <>
            <AllWrap>
                <Title>
                    <div>Address <span>#{search}</span></div>
                    <div>account: <span>{balance} ETH</span></div>
                </Title>


                {/* from.length가 있으면 보이게, 없으면 안보이게 */}
                <Title style={{ color: "#1f1f1f", borderBottom: "none", fontWeight: "500" }}>Transaction From</Title>
                <Content>
                    {from?.length ? <>
                        <table border="0">
                            <th>hash</th>
                            <th>blockNumber</th>
                            <th>age</th>
                            {/* <th>from</th> */}
                            <th>to</th>
                            <th>value</th>
                            {/* for문 */}
                            {from?.map((item, index) => (
                                <Tr key={`transaction-${index}`}>
                                    <Td style={{ width: "16%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/transaction/${item?.hash}`}>
                                                {sliceHash(item?.hash)}
                                            </Link>
                                        </LinkDiv2>
                                    </Td>
                                    <Td style={{ width: "20%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/block/${item?.blockNumber}`}>
                                                {item?.blockNumber}
                                            </Link>
                                        </LinkDiv2>
                                    </Td>
                                    <Td style={{ width: "20%" }}>{item?.createdAt}</Td>
                                    {/* <Td style={{ width: "20%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/wallet/${item?.from}`}>
                                                {sliceHash(item?.from)}
                                            </Link>
                                        </LinkDiv2>
                                    </Td> */}
                                    <Td style={{ width: "20%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/wallet/${item?.to}`} onClick={() => {
                                                setSearch(item?.to);
                                            }}>
                                                {sliceHash(item?.to)}
                                            </Link>
                                        </LinkDiv2>
                                    </Td>
                                    <Td style={{ width: "20%" }}>{(item?.value) / Math.pow(10, 18)}ETH</Td>
                                </Tr>
                            ))}
                        </table>
                    </> : <>
                        <div>보낸 트랜잭션이 없습니다.</div>
                    </>}
                </Content>


                <Title style={{ color: "#1f1f1f", borderBottom: "none", marginTop: "10px" }}>Transaction To</Title>
                <Content>
                    {to?.length ? <>
                        <table border="0">
                            <th>hash</th>
                            <th>blockNumber</th>
                            <th>age</th>
                            <th>from</th>
                            {/* <th>to</th> */}
                            <th>value</th>
                            {to?.map((item, index) => (
                                <Tr key={`transaction-${index}`}>
                                    <Td style={{ width: "16%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/transaction/${item?.hash}`}>
                                                {sliceHash(item?.hash)}
                                            </Link>
                                        </LinkDiv2>
                                    </Td>
                                    <Td style={{ width: "20%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/block/${item?.blockNumber}`}>
                                                {item?.blockNumber}
                                            </Link>
                                        </LinkDiv2>
                                    </Td>
                                    <Td style={{ width: "20%" }}>{item?.createdAt}</Td>
                                    <Td style={{ width: "20%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/wallet/${item?.from}`} onClick={() => {
                                                setSearch(item?.from);
                                            }}>
                                                {sliceHash(item?.from)}
                                            </Link>
                                        </LinkDiv2>
                                    </Td>
                                    {/* <Td style={{ width: "20%", height: "60px" }}>
                                        <LinkDiv2>
                                            <Link to={`/wallet/${item?.to}`}>
                                                {sliceHash(item?.to)}
                                            </Link>
                                        </LinkDiv2>
                                    </Td> */}
                                    <Td style={{ width: "20%" }}>{(item?.value) / Math.pow(10, 18)}ETH</Td>
                                </Tr>
                            ))}
                        </table>
                    </> : <>
                        <div>받은 트랜잭션이 없습니다.</div>
                    </>}
                </Content>
            </AllWrap>
        </>
    )
}
export default WalletComponent;

const AllWrap = styled.div`
    width: 70%;
    margin: 0 auto;
    box-sizing: border-box;
`;
const MarginDiv = styled.div`
    background-color: rgb(245,245,245);
    margin: 20px 0;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #E9ECEF;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    & span{
        font-size: 15px;
        color: #6C757D;
        font-weight: 500;
    }
`;


const Content = styled.div`
    padding: 20px 10px;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 20%);
    border-radius: 10px;
    &>table{
        margin: 0 auto;
    }
`;
const Key = styled.div`
    /* background-color: rebeccapurple; */
    display: inline-block;
    width: 25%;
    color: #6C757D;

`;
const Value = styled.div`
    display: inline-block;
    &>a{
        text-decoration: none;
    }
`;
const LinkDiv = styled.div`
    display: inline-block;
    margin: 5px;
    &>a{
        color: #2c2c2c;
        text-decoration: none;
        font-weight: 600;
    }
`;
const LinkDiv2 = styled.div`
    display: inline-block;
    &>a{
        color: #0784c3;
        text-decoration: none;
    }
`;
const PageWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    margin-top: 20px;
`;
const Tr = styled.tr`
    margin: 10px 0;
`;
const Td = styled.td`
    text-align: center;
    /* overflow: hidden;
    text-overflow: ellipsis; */
`;
