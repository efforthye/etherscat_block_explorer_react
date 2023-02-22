import { Link } from "react-router-dom";
import styled from "styled-components";

const BlockComponent = ({ block, setSearch }) => {

    return (
        <>
            {/* 만약 block이 있으면 해당 블록 정보 출력하고, 아니면 전체 블록을 출력한다. */}
            {/* 전체 블록 가져오는 요청.. */}
            <AllWrap>
                <div>difficulty : {block?.difficulty}</div>
                <div>extraData : {block?.extraData}</div>
                <div>gasLimit : {block?.gasLimit}</div>
                <div>gasUsed : {block?.gasUsed}</div>
                <div>hash : {block?.hash}</div>
                <div>logsBloom : {block?.logsBloom}</div>
                <div>miner : {block?.miner}</div>
                <div>mixHash : {block?.mixHash}</div>
                <div>nonce : {block?.nonce}</div>
                <div>number : {block?.number}</div>
                <div>parentHash :
                    <LinkDiv>
                        <Link to={`/block/${block.parentHash}`} onClick={(e) => {
                            setSearch(block?.parentHash);
                        }}>{block?.parentHash}</Link>
                    </LinkDiv>
                </div>
                <div>receiptsRoot : {block?.receiptsRoot}</div>
                <div>sha3Uncles : {block?.sha3Uncles}</div>
                <div>size : {block?.size}</div>
                <div>stateRoot : {block?.stateRoot}</div>
                <div>timestamp : {block?.timestamp}</div>
                <div>totalDifficulty : {block?.totalDifficulty}</div>
                <div>transactionsRoot : {block?.transactionsRoot}</div>
            </AllWrap>
        </>
    )
}
export default BlockComponent;

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