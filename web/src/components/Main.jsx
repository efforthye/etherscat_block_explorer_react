import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BlockIcon from "../images/block2.png"
import EthereumIcon from "../images/ethereum.png"
import TransactionIcon from "../images/transaction.png"
import Transaction3Icon from "../images/transaction3.png"
import NonIcon from "../images/nog.png"
import SoIcon from "../images/2204.png"
import { Link, useNavigate } from "react-router-dom";
import ApexChart from '../components/Chart.jsx';
import { sliceHash, sliceLongHash, timestampFunc } from "../util";
import Loading from "./Loding";

const MainComponent = ({ blockInfo, latestBlocks, latestTransactions, loading, prices }) => {

    // console.log(latestTransactions);
    // console.log(latestBlocks[0]?.BlockTransactions?.length);

    // 라우터 이동
    const navigate = useNavigate();
    // 검색 
    const [filter, setFilter] = useState("block");
    const [search, setSearch] = useState("");
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setFilter(filter);
            setSearch(e.target.value);
            navigate(`/${filter}/${e.target.value}`);
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
                        <option value="block">block</option>
                        <option value="transaction">transaction</option>
                        <option value="wallet">wallet</option>

                    </SearchSelect>
                    <SearchInput placeholder="Search By Block / Txn Hash / Wallet Address" onKeyUp={(e) => {
                        setSearch(e.target.value); // input value
                        handleKeyPress(e); // enter
                    }} />
                    <SearchIconDiv onClick={() => {
                        navigate(`/${filter}/${search}`);
                    }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </SearchIconDiv>
                </SearchBox>
            </SearchBackground>

            <ALLPriceWrap className="priceWrap">
                <ThreeWrap className="threeWrap">
                    {/* 하나의 아이템 ㅇ */}
                    <PriceWrap className="priceWrap">
                        <PriceLeft className="priceLeft">
                            <img src={EthereumIcon} alt="이더리움" />
                        </PriceLeft>
                        <div>
                            <div>ETHER PRICE</div>
                            {prices ? <div>{prices[0]} {prices[2]}</div> : <div>$1,659.04 (-2.72%)</div>}

                        </div>
                    </PriceWrap>

                    {/* 하나의 아이템 ㅇ */}
                    <PriceWrap>
                        <PriceLeft className="priceLeft">
                            <img src={NonIcon} alt="" />
                        </PriceLeft>
                        <div>
                            <div>MARKET CAP</div>
                            <div>$197,960,235,163.00</div>
                        </div>
                    </PriceWrap>
                </ThreeWrap>

                <ThreeWrap>
                    <PriceWrap>
                        <PriceLeft className="priceLeft">
                            <img src={Transaction3Icon} alt="트랜잭션" />
                        </PriceLeft>
                        <div>
                            <div>Transacions</div>
                            <div>1,881.41 M (11.8 TPS)</div>
                        </div>
                    </PriceWrap>
                    <PriceWrap>
                        <PriceLeft className="priceLeft">
                            <img src={SoIcon} alt="마지막 블록" />
                        </PriceLeft>
                        <div>
                            <div>LAST FINALIZED BLOCK</div>
                            <div>{latestBlocks[0]?.number}</div>
                        </div>
                    </PriceWrap>
                </ThreeWrap>

                <ThreeWrap style={{ position: "relative" }}>
                    {/* Chart */}
                    <ApexChart />
                </ThreeWrap>
            </ALLPriceWrap>

            <InfoWrap>
                {/* 최신 블록 */}
                <BNTWrap>
                    <div>Latest Blocks</div>
                    {loading ? <Loading /> : null}
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
                                <div key={`timestamp-${index}`}>{
                                    timestampFunc(block.timestamp).text
                                } 전</div>
                            </div>

                            <div>
                                {/* 해당 채굴자 Wallet 상세 정보로 이동 */}
                                <div key={`miner-${index}`}>
                                    <LinkDiv>
                                        miner : <Link to={`/wallet/${block.miner}`}>{sliceLongHash(block.miner)}</Link>
                                    </LinkDiv>
                                </div>
                                {/* 해당 트랜잭션 상세 정보로 이동 */}
                                <div key={`transactions-${index}`}>
                                    {block?.BlockTransactions?.length} txns {block?.BlockTransactions?.length ? `in ${timestampFunc(block.timestamp).text}` : ""}
                                </div>
                            </div>
                        </OneBlock>
                    )}
                    <div>
                        <Link to={`/allBlock/1`}>VIEW ALL Blocks <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
                    </div>
                </BNTWrap>

                {/* 최신 트랜잭션 */}
                <BNTWrap>
                    <div>Latest Transactions</div>
                    {loading ? <Loading /> : null}
                    {latestTransactions.map((transaction, index) =>
                        <OneTransaction key={`transaction-${index}`} style={{ margin: "0 20px", borderBottom: "1px solid #E9ECEF" }}>
                            <IconWrap2 className="iconWrap">
                                <img src={TransactionIcon} alt={"트랜잭션"}></img>
                            </IconWrap2>
                            <div>
                                <LinkDiv key={`transactionLink-${index}`}>
                                    <Link to={`/transaction/${transaction.hash}`}>{sliceHash(transaction.hash)}</Link>
                                </LinkDiv>
                                <div style={{ height: "20px" }}>{timestampFunc(transaction.Block.timestamp).text} 전</div>
                            </div>
                            <div>
                                {/* 트랜잭션 지갑 */}
                                <div>
                                    <LinkDiv key={`walletFrom-${index}`}>
                                        from:<Link to={`/wallet/${transaction.from}`}>
                                            {`${transaction.from}`}
                                        </Link>
                                    </LinkDiv>
                                </div>
                                <div>
                                    <LinkDiv key={`walletTo-${index}`}>
                                        to:<Link to={`/wallet/${transaction.to}`}>
                                            {`${transaction.to}`}
                                        </Link>
                                    </LinkDiv>
                                </div>
                            </div>
                        </OneTransaction>
                    )}
                    <div>
                        <Link to={`/allTransaction/1`}>VIEW ALL Transactions <span style={{ fontSize: "18px" }}>&rarr;</span></Link>
                    </div>
                </BNTWrap>
            </InfoWrap>


        </>
    )
}

export default MainComponent;


const SearchBackground = styled.div`
    background-image: url("../images/background4.jpg");
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

const InfoWrap = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 180px;

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
        margin-left: 25px;
    }
`;
const OneTransaction = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 10px;
    /* 첫번째 자식 빼고 */
    &>div:not(:first-child){
        display: inline-block;
        margin-left: 25px;
        width: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &>div:last-child{
        width: 60%;
    }
`;
const IconWrap = styled.div`
    width: 60px;
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
        height: 30px;
        color: #a6afc0;
        rotate: 120deg;
        /* animation: rotate_image 10s linear infinite; */
        transform-origin: 50% 50%;
    }
    @keyframes rotate_image{
        100% {
            transform: rotate(360deg);
        }
    }
`;
const IconWrap2 = styled.div`
    width: 60px;
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
        height: 30px;
        color: #a6afc0;
        /* rotate: 120deg; */
        /* animation: rotate_image 10s linear infinite; */
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



const ALLPriceWrap = styled.div`
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
    // 1, 2
    &>div:not(:last-child){
        // 각각
        &>div{
            height: 50%;
            --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
            box-shadow: var(--bs-card-box-shadow);
        }
    }
    &>div:last-child{
        --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
        box-shadow: var(--bs-card-box-shadow);
    }
    &>div>div{
        display: flex;
        align-items: center;
        &>div:first-child{
            width: 10%;
        }
    }

`;

// 가격
const ThreeWrap = styled.div`
    width: 33%;
`;
const PriceWrap = styled.div`
    
`;
const PriceLeft = styled.div`
    width: 10%;
    margin: 0 20px;
    &>img{
        width: 30px;
    }
`;

