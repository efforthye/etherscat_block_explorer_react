import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BlockIcon from "../images/block2.png"

const MainComponent = ({ blockInfo, latestBlocks }) => {

    // 검색 
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            alert(filter);
            alert(e.target.value);
        }
    }

    return (
        <>
            <SearchBackground>
                <div style={{ color: `#fff`, fontSize: "18px", fontWeight: "600", position: "absolute", top: "40px", left: "25%" }}>The Ethereum Blockchain Explorer</div>
                <SearchBox>
                    <SearchSelect onChange={(e) => {
                        setFilter(e.target.value);
                    }}>
                        <option value="all">All Filters</option>
                        <option value="address">Addresses</option>
                        <option value="token">Tokens</option>
                        <option value="tag">Name Tags</option>
                        <option value="label">Labels</option>
                        <option value="site">Websites</option>
                    </SearchSelect>
                    <SearchInput placeholder="Search By Address / Txn Hash / Block / Token / Domain Name" onKeyUp={(e) => {
                        setSearch(e.target.value); // input value
                        handleKeyPress(e); // enter
                    }} />
                    <SearchIconDiv onClick={() => {
                        alert(filter);
                        alert(search);
                    }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </SearchIconDiv>
                </SearchBox>
            </SearchBackground>

            <InfoWrap>
                <BlocksWrap>
                    <div>Latest Blocks</div>
                    {latestBlocks.map((block, index) =>
                        <div key={index} style={{ margin: "30px 20px", borderBottom: "1px solid #E9ECEF" }}>
                            <IconWrap>
                                <img src={BlockIcon} alt={"블록"}></img>
                            </IconWrap>

                            {/* 해당 블록 상세 정보로 이동 */}
                            <div key={`number-${index}`}>{block.number}</div>
                            <div key={`timestamp-${index}`}>{block.timestamp}</div>

                            {/* 해당 채굴자 Wallet 상세 정보로 이동 */}
                            <div key={`miner-${index}`}>{block.miner}</div>

                            {/* 해당 트랜잭션 상세 정보로 이동 */}
                            <div key={`transactions-${index}`}>{block.transactions.length}</div>
                        </div>
                    )}
                </BlocksWrap>
                <TransactionsWrap>
                    <div>Latest Transactions</div>
                    {/* 트랜잭션 띄우기(요청 보내기) */}
                    <div>하이</div>
                </TransactionsWrap>
            </InfoWrap>


        </>
    )
}

export default MainComponent;


const SearchBackground = styled.div`
    /* background-image: url("../images/background5.jpg"); */
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 10% 30%; 
    position: relative;
    display: flex;
    justify-content: center;
`;
const SearchBox = styled.div`
    position: absolute;
    top: 80px;
    background-color: #fff;
    /* box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%); */
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 30%);
    border-radius: 24px;
    cursor: text;
    height: 44px;
    width: 50%;
    /* margin: 30px auto; */
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-around;
`;
const SearchSelect = styled.select`
    margin-right: 5px;
    height: 28px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;
const SearchInput = styled.input`
    width: 80%;
    height: 28px;
    border: none;
`;
const SearchIconDiv = styled.div`
    cursor: pointer;
`;
const InfoWrap = styled.div`
    /* background-color: aliceblue; */
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 60px auto;

    &>div{
        display: inline-block;
        width: 49.4%;
        border-radius: 10px;
        --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
        box-shadow: var(--bs-card-box-shadow);
        --bs-card-border-color: var(--bs-border-color);
        border: var(--bs-card-border-width) solid var(--bs-card-border-color);
        border: 1px solid #e9ecef;
        div{
            text-overflow: ellipsis;
            overflow: hidden;
        }

    }
`;
const BlocksWrap = styled.div`

`;
const TransactionsWrap = styled.div`

`;
const IconWrap = styled.div`
    width: 60px;
    height: 60px;
    background-color: #F8F9FA;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    &>svg, &>img{
        width: 60%;
        height: 60%;
        color: #a6afc0;
        rotate: 90deg;
        animation: rotate_image 10s linear infinite;
        transform-origin: 50% 50%;
    }
    @keyframes rotate_image{
        100% {
            transform: rotate(360deg);
        }
    }
`;
