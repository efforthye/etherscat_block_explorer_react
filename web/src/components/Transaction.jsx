import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TransactionComponent = ({ txInfo }) => {

    // 상위 파람스가 transaction이면 어쩌구저쩌구 ㅇㅇ
    // isAll

    // if (!txInfo) {
    //     alert("전체");
    // } else {
    //     alert("있다는데.?");
    // }

    return (
        <>
            <AllWrap>
                Vv 트랜잭션 vV
                <div>hash : {txInfo?.hash}</div>
                <div>
                    <LinkDiv>
                        blockHash:
                        <Link to={`/block/${txInfo.blockHash}`}>
                            {txInfo?.blockHash}
                        </Link>
                    </LinkDiv>
                </div>
                <div>blockNumber : {txInfo?.blockNumber}</div>
                <div>chainId : {txInfo?.chainId}</div>
                <div>createdAt : {txInfo?.createdAt}</div>
                <div>deletedAt : {txInfo?.deletedAt}</div>
                <div>gas : {txInfo?.gas}</div>
                <div>gasPrice : {txInfo?.gasPrice}</div>
                <div>id : {txInfo?.id}</div>
                <div>input : {txInfo?.input}</div>
                <div>nonce : {txInfo?.nonce}</div>
                <div>r : {txInfo?.r}</div>
                <div>s : {txInfo?.s}</div>
                <div>v : {txInfo?.v}</div>
                <div>
                    <LinkDiv>
                        from:
                        <Link to={`/wallet/${txInfo.from}`}>
                            {txInfo?.from}
                        </Link>
                    </LinkDiv>
                </div>
                <div>
                    <LinkDiv>
                        to:
                        <Link to={`/wallet/${txInfo.to}`}>
                            {txInfo?.to}
                        </Link>
                    </LinkDiv>
                </div>
                <div>transactionIndex : {txInfo?.transactionIndex}</div>
                <div>type : {txInfo?.type}</div>
                <div>updatedAt : {txInfo?.updatedAt}</div>
                <div>value : {txInfo?.value}</div>
            </AllWrap>
        </>
    )
}
export default TransactionComponent;

const AllWrap = styled.div`
    width: 70%;
    margin: 0 auto;
`;
const LinkDiv = styled.div`
    &>a{
        color: #0784c3;
        text-decoration: none;
    }
`;