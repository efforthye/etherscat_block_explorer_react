import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BlockIcon from "../images/block2.png"
import { Link } from "react-router-dom";

const MainComponent = ({ blockInfo, latestBlocks, latestTransactions }) => {

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

            <PriceWrap className="priceWrap">
                ETHER PRICE
            </PriceWrap>

            <InfoWrap>
                <BNTWrap>
                    <div>Latest Blocks</div>
                    {latestBlocks.map((block, index) =>
                        <OneBlock key={index} style={{ margin: "0 20px", borderBottom: "1px solid #E9ECEF" }}>
                            <IconWrap className="iconWrap">
                                <img src={BlockIcon} alt={"블록"}></img>
                            </IconWrap>

                            {/* 해당 블록 상세 정보로 이동 : 링크? 라우터? 필요함! */}
                            <div>
                                <LinkDiv key={`number-${index}`}>
                                    <Link to={`/block/${block.number}`}>{block.number}</Link>
                                </LinkDiv>
                                {/* 시간 moment 라이브러리 사용하여 변환하기 */}
                                <div key={`timestamp-${index}`}>{block.timestamp}</div>
                            </div>

                            <div>
                                {/* 해당 채굴자 Wallet 상세 정보로 이동 */}
                                <div key={`miner-${index}`}>{block.miner}</div>
                                {/* 해당 트랜잭션 상세 정보로 이동 */}
                                <div key={`transactions-${index}`}>{block.transactions.length} txns in n secs</div>
                            </div>
                        </OneBlock>
                    )}
                    <div>
                        <Link to={`/block`}>VIEW ALL Blocks 👉🏻</Link>
                    </div>
                </BNTWrap>
                <BNTWrap>
                    <div>Latest Transactions</div>

                    {/* 트랜잭션 띄우기(요청 보내기) */}
                    <OneBlock>ㅇㅅㅇ</OneBlock>
                    <OneBlock>ㅇㅅㅇ</OneBlock>
                    <OneBlock>ㅇㅅㅇ</OneBlock>
                    <OneBlock>ㅇㅅㅇ</OneBlock>
                    <OneBlock>ㅇㅅㅇ</OneBlock>
                    <OneBlock>ㅇㅅㅇ</OneBlock>

                    <div>하이</div>
                </BNTWrap>
            </InfoWrap>


        </>
    )
}

export default MainComponent;


const SearchBackground = styled.div`
    background-image: url("../images/background5.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 10% 30%; 
    position: relative;
    display: flex;
    justify-content: center;
    position: relative;
`;
const SearchBox = styled.div`
    position: absolute;
    top: 80px;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 30%);
    border-radius: 24px;
    cursor: text;
    height: 44px;
    width: 50%;
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

const PriceWrap = styled.div`
    background-color: white;
    height: 180px;
    left: 15%;
    top: 324px;
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 60px auto;
    border-radius: 10px;
    position: absolute;
    --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
    box-shadow: var(--bs-card-box-shadow);
    --bs-card-border-color: var(--bs-border-color);
    border: var(--bs-card-border-width) solid var(--bs-card-border-color);
    border: 1px solid #e9ecef;
`;

const InfoWrap = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 60px auto;
    margin-top: 160px;

    &>div{
        display: inline-block;
        width: 49.4%;
        border-radius: 15px;
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
// Block And Transaction Wrap
const BNTWrap = styled.div`

    /* Latest Blocks Title */
    &>div:first-child{
        border-bottom: 1px solid #e9ecef;
        padding: 13px 16px;
        font-weight: 600;
        color: #212529;
    }
    &>div:last-child{
        text-align: center;
        padding: 13px 16px;
        padding-bottom: 16px;
        font-size: 14px;
        &>a{
            color: #383838;
            text-decoration: none;
            display: block;
        }
    }

`;
const OneBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    /* 첫번째 자식 빼고 */
    &>div:not(:first-child){
        display: inline-block;
        margin-left: 12px;
    }
`;
const IconWrap = styled.div`
    width: 70px;
    height: 60px;
    background-color: #F8F9FA;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: relative;
    display: flex;   
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    &>svg, &>img{
        position: absolute;
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
const LinkDiv = styled.div`
    &>a{
        color: #0784c3;
        text-decoration: none;
    }
`;