import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowLeftIcon from "../images/arrow-left-solid.svg";
import ArrowRightIcon from "../images/arrow-right-solid.svg";

const BlockComponent = ({ block, setSearch }) => {

    return (
        <>
            {/* 만약 block이 있으면 해당 블록 정보 출력하고, 아니면 전체 블록을 출력한다. */}
            {/* 전체 블록 가져오는 요청.. */}
            <AllWrap>
                <BlockNumber>Block <span>#{block?.number}</span> </BlockNumber>
                <ContentWrap>
                    <Content>
                        <Key>Block Height:</Key>
                        <Value>
                            {block?.number}

                            {/* 예외처리하기(첫번째/마지막블록이면더이상안가지게) */}
                            <Link to={`/block/${(block?.number) - 1}`} onClick={() => {
                                setSearch(block?.parentHash);
                            }}><img style={{ width: "11px", margin: "0 10px" }} src={ArrowLeftIcon} alt="왼쪽" /></Link>

                            <Link to={`/block/${(block?.number) + 1}`} onClick={() => {
                                setSearch((block?.number) + 1);
                            }}><img style={{ width: "11px" }} src={ArrowRightIcon} alt="오른쪽" /></Link>
                        </Value>
                    </Content>
                    <Content>
                        <Key>difficulty :</Key>
                        <Value>{block?.difficulty}</Value>
                    </Content>

                    <Content>
                        <Key>extraData :</Key>
                        <Value>{block?.extraData}</Value>
                    </Content>


                    <Content>
                        <Key>gasLimit :</Key>
                        <Value>{block?.gasLimit}</Value>
                    </Content>


                    <Content style={{ borderBottom: "1px solid #E9ECEF" }}>
                        <Key>gasUsed :</Key>
                        <Value>{block?.gasUsed}</Value>
                    </Content>

                    <Content>
                        <Key>hash :</Key>
                        <Value>{block?.hash}</Value>
                    </Content>
                    {/* 이동 */}
                    <Content>
                        <Key>miner :</Key>
                        <Value>{block?.miner}</Value>
                    </Content>
                    <Content>
                        <Key>mixHash :</Key>
                        <Value>{block?.mixHash}</Value>
                    </Content>
                    <Content>
                        <Key>nonce :</Key>
                        <Value>{block?.nonce}</Value>
                    </Content>

                    {/* <div>logsBloom : {block?.logsBloom}</div> */}
                    <Content style={{ borderBottom: "1px solid #E9ECEF" }}>
                        <Key>
                            parentHash :
                        </Key>
                        <Value>
                            <LinkDiv>
                                <Link to={`/block/${block.parentHash}`} onClick={(e) => {
                                    setSearch(block?.parentHash);
                                }}>{block?.parentHash}</Link>
                            </LinkDiv>
                        </Value>
                    </Content>

                    <Content>
                        <Key>receiptsRoot :</Key>
                        <Value>{block?.receiptsRoot}</Value>
                    </Content>
                    <Content>
                        <Key>sha3Uncles :</Key>
                        <Value>{block?.sha3Uncles}</Value>
                    </Content>
                    <Content>
                        <Key>size :</Key>
                        <Value>{block?.size}</Value>
                    </Content>
                    <Content>
                        <Key>stateRoot :</Key>
                        <Value>{block?.stateRoot}</Value>
                    </Content>
                    <Content style={{ borderBottom: "1px solid #E9ECEF" }}>
                        <Key>timestamp :</Key>
                        <Value>{block?.timestamp}</Value>
                    </Content>
                    <Content>
                        <Key>totalDifficulty :</Key>
                        <Value>{block?.totalDifficulty}</Value>
                    </Content>
                    <Content>
                        <Key>transactionsRoot :</Key>
                        <Value>{block?.transactionsRoot}</Value>
                    </Content>
                </ContentWrap>
            </AllWrap>
            <BottomText>
                💬 Blocks are batches of transactions linked via cryptographic hashes. Any tampering of a block would invalidate all following blocks as all subsequent hashes would change. Learn more about this page in our <LinkDiv><Link to={"/"}>Knowledge Base</Link></LinkDiv>.
            </BottomText>
        </>
    )
}
export default BlockComponent;

const BottomText = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    color: #6C757D;
    font-size: 13px;
    cursor: default;

`;
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
const LinkDiv = styled.div`
    display: inline-block;
    &>a{
        color: #0784c3;
        text-decoration: none;
    }
`;

const BlockNumber = styled.div`
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #E9ECEF;
    padding: 20px 0;
    &>span{
        font-size: 15px;
        color: #6C757D;
        font-weight: 500;
    }
`;

const ContentWrap = styled.div`
    margin: 10px 0;
    overflow: hidden;
`;
const Content = styled.div`
    padding: 20px 10px;
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