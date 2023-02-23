import { Link } from "react-router-dom";
import styled from "styled-components";
import { timestampFunc } from "../util";
import Loading from "./Loding";

const AllTransactionComponent = ({ transactions, allPageNum, setPage, page, loading }) => {

    // console.log(transactions);
    // console.log(transactions[0]?.Block?.timestamp);

    // 페이지 배열
    const pagenation = (allPageNum) => {
        const pageArr = [];
        for (let i = 1; i < allPageNum + 1; i++) {
            pageArr.push(i);
        }
        return pageArr;
    }

    // 스크롤을 올리는 함수 -> utils로 빼기
    const moveTop = () => {
        window.scrollTo({
            top: 100,
            behavior: "smooth",
        });
    };

    // 해시를 잘라 단축하는 함수 -> utils로 빼기
    const sliceHash = (hash) => {
        const left = hash.slice(0, 6);
        const right = hash.slice(-6);
        const newHash = `${left}...${right}`;
        return newHash;
    }


    return (
        <>
            <AllWrap>

                {loading ? <Loading /> : null}

                {/* 현재 트랜잭션 넘버 구해서 올리기 */}
                <Title>Transactions</Title>


                <table border="0">
                    <th>Txn Hash</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    {/* <th>Txn Fee</th> */}

                    {/* for문 */}
                    {transactions?.map((transaction, index) => (
                        <Tr key={`transaction-${index}`}>
                            <Td style={{ width: "16%", height: "60px" }}>
                                <LinkDiv2>
                                    <Link to={`/transaction/${transaction?.hash}`}>
                                        {sliceHash(transaction?.hash)}
                                    </Link>
                                </LinkDiv2>
                            </Td>
                            <Td style={{ width: "20%", height: "60px" }}>
                                <LinkDiv2>
                                    <Link to={`/transaction/${transaction?.blockNumber}`}>
                                        {transaction?.blockNumber}
                                    </Link>
                                </LinkDiv2>
                            </Td>
                            <Td style={{ width: "20%" }}>{timestampFunc(transaction?.Block.timestamp).text} 전</Td>

                            <Td style={{ width: "20%", height: "60px" }}>
                                <LinkDiv2>
                                    <Link to={`/wallet/${transaction?.from}`}>
                                        {sliceHash(transaction?.from)}
                                    </Link>
                                </LinkDiv2>
                            </Td>
                            <Td style={{ width: "20%", height: "60px" }}>
                                <LinkDiv2>
                                    <Link to={`/wallet/${transaction?.to}`}>
                                        {sliceHash(transaction?.to)}
                                    </Link>
                                </LinkDiv2>
                            </Td>
                            <Td style={{ width: "20%" }}>{(transaction?.value) / Math.pow(10, 18)}ETH</Td>
                        </Tr>
                    ))}
                </table>


                {/* 페이지 출력하는 함수 : 이전, 다음 만들기 */}
                <PageWrap>
                    <LinkDiv>
                        <Link to={`/allTransaction/1`} onClick={() => {
                            setPage(1);
                            moveTop();
                        }}>처음</Link>
                    </LinkDiv>
                    <LinkDiv>
                        <Link to={`/allTransaction/${page <= 1 ? page : page - 1}`} onClick={() => {
                            if (page <= 1) return;
                            setPage(page - 1);
                        }}>이전</Link>
                    </LinkDiv>
                    {pagenation(allPageNum).map((num, index) => (
                        <span style={{ marginRight: "5px" }} key={`page-${index}`}>
                            <LinkDiv>
                                <Link to={`/allTransaction/${num}`} onClick={() => {
                                    setPage(num);
                                }}>{num}</Link>
                            </LinkDiv>
                        </span>
                    ))}
                    <LinkDiv>
                        <Link to={`/allTransaction/${page >= allPageNum ? page : page + 1}`} onClick={() => {
                            if (page >= allPageNum) return;
                            setPage(page + 1);
                        }}>다음</Link>
                    </LinkDiv>
                    <LinkDiv>
                        <Link to={`/allTransaction/${allPageNum}`} onClick={() => {
                            setPage(allPageNum);
                            moveTop();
                        }}>마지막</Link>
                    </LinkDiv>
                </PageWrap>

            </AllWrap>
        </>
    )
}

export default AllTransactionComponent;

const AllWrap = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 20%);
    border-radius: 10px;
    margin-top: 45px;
`;
const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #E9ECEF;
    padding: 20px 0;
    &>span{
        font-size: 15px;
        color: #6C757D;
        font-weight: 500;
    }
    margin-bottom: 16px;
`;
const BlocksWrap = styled.div`

`;
const BlockWrap = styled.div`
    margin: 30px 0;
`;
const InfoWrap = styled.div`

`;
// const Information = styled.div`
//     padding-right: 50px;
//     display: flex;
//     justify-content: space-between;
// `;
const BlockInfo = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    &>span{
        margin-right: 20px;
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






                // {/* 테이블로 바꾸기 */}
                // {/* <BlocksWrap>
                //     {transactions?.map((transaction, index) => (
                //         <BlockWrap key={`block-${index}`}>
                //             <BlockInfo>
                //                 <span>{transaction?.value}</span>
                //                 <LinkDiv2>
                //                     <Link to={`/block/${transaction?.blockNumber}`}>
                //                         {transaction?.blockNumber}
                //                     </Link>
                //                 </LinkDiv2>
                //                 <LinkDiv2>
                //                     <Link to={`/wallet/${transaction?.from}`}>
                //                         from:{transaction?.from}
                //                     </Link>
                //                 </LinkDiv2>
                //                 <LinkDiv2>
                //                     <Link to={`/wallet/${transaction?.to}`}>
                //                         to:{transaction?.to}
                //                     </Link>
                //                 </LinkDiv2>
                //             </BlockInfo>
                //         </BlockWrap>
                //     ))}
                // </BlocksWrap> */}