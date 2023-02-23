import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TransactionComponent = ({ txInfo }) => {

    return (
        <>
            <AllWrap>
                <Title>Transaction Details </Title>

                <Content>
                    <Key>hash :</Key>
                    <Value>{txInfo?.hash}</Value>
                </Content>

                <Content>
                    <Key>blockHash :</Key>
                    <Value>
                        <LinkDiv>
                            <Link to={`/block/${txInfo.blockHash}`}>
                                {txInfo?.blockHash}
                            </Link>
                        </LinkDiv>
                    </Value>
                </Content>

                <Content>
                    <Key>blockNumber :</Key>
                    <Value>{txInfo?.blockNumber}</Value>
                </Content>


                <Content>
                    <Key>chainId :</Key>
                    <Value>{txInfo?.chainId}</Value>
                </Content>


                <Content style={{ borderBottom: "1px solid #E9ECEF" }}>
                    <Key>createdAt :</Key>
                    <Value>{txInfo?.createdAt}</Value>
                </Content>
                <Content>
                    <Key>gas :</Key>
                    <Value>{txInfo?.gas}</Value>
                </Content>
                <Content>
                    <Key>gasPrice :</Key>
                    <Value>{txInfo?.gasPrice}</Value>
                </Content>
                <Content>
                    <Key>id :</Key>
                    <Value>{txInfo?.id}</Value>
                </Content>
                <Content>
                    <Key>input :</Key>
                    <Value>{txInfo?.input}</Value>
                </Content>
                <Content style={{ borderBottom: "1px solid #E9ECEF" }}>
                    <Key>nonce :</Key>
                    <Value>{txInfo?.nonce}</Value>
                </Content>
                <Content>
                    <Key>r :</Key>
                    <Value>{txInfo?.r}</Value>
                </Content>
                <Content>
                    <Key>s :</Key>
                    <Value>{txInfo?.s}</Value>
                </Content>
                <Content>
                    <Key>v :</Key>
                    <Value>{txInfo?.v}</Value>
                </Content>
                <Content>
                    <Key>from :</Key>
                    <Value>
                        <LinkDiv>
                            <Link to={`/wallet/${txInfo.from}`}>
                                {txInfo?.from}
                            </Link>
                        </LinkDiv>
                    </Value>
                </Content>
                <Content style={{ borderBottom: "1px solid #E9ECEF" }}>
                    <Key>to :</Key>
                    <Value>
                        <LinkDiv>
                            <Link to={`/wallet/${txInfo.to}`}>
                                {txInfo?.to}
                            </Link>
                        </LinkDiv>
                    </Value>
                </Content>
                <Content>
                    <Key>transactionIndex :</Key>
                    <Value>{txInfo?.transactionIndex}</Value>
                </Content>
                <Content>
                    <Key>type :</Key>
                    <Value>{txInfo?.type}</Value>
                </Content>
                <Content>
                    <Key>value :</Key>
                    <Value>{txInfo?.value}</Value>
                </Content>
            </AllWrap>

            <BottomText>
                💬 A transaction is a cryptographically signed instruction that changes the blockchain state. Block explorers track the details of all transactions in the network. Learn more about transactions in our <LinkDiv><Link to={"/"}>Knowledge Base</Link></LinkDiv>.
            </BottomText>
        </>
    )
}
export default TransactionComponent;

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