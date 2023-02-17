import styled from "styled-components";
import background from "../images/background5.jpg";

const MainComponent = ({ blockInfo, latestBlocks }) => {
    return (
        <>
            {/* <SearchBackgroundImg src="../images/background5.jpg" alt="space" /> */}
            <SearchBackground>
                <div style={{ color: `#fff`, fontSize: "18px", fontWeight: "600", position: "absolute", top: "40px", left: "25%" }}>The Ethereum Blockchain Explorer</div>
                <SearchBox>
                    <SearchSelect name="" id="">
                        <option value="all">All Filters</option>
                        <option value="address">Addresses</option>
                        <option value="token">Tokens</option>
                        <option value="tag">Name Tags</option>
                        <option value="label">Labels</option>
                        <option value="site">Websites</option>
                    </SearchSelect>
                    <SearchInput placeholder="Search By Address / Txn Hash / Block / Token / Domain Name" />
                </SearchBox>
            </SearchBackground>


            {/* 마지막 블록 정보 */}
            {/* <div>
                {blockInfo.map((item, index) =>
                    <div key={index}>{item[0]} : {item[1]}</div>
                )}
            </div> */}

            {/* Latest Blocks */}
            {/* <div>Latest Blocks</div>
            {console.log(latestBlocks)}
            {latestBlocks.map((block, index) =>
                <div key={index}>{block.hash}</div>
            )} */}

            <InfoWrap>
                <BlocksWrap>
                    <div>Latest Blocks</div>
                    {latestBlocks.map((block, index) =>
                        <div key={index}>{block.hash}</div>
                    )}

                </BlocksWrap>
                <TransactionsWrap>
                    <div>Latest Transactions</div>
                    {/* <div>{prices[0]}</div> */}
                    <div>하이</div>
                </TransactionsWrap>
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
`;
const SearchBox = styled.div`
    position: absolute;
    top: 80px;
    background-color: #fff;
    /* box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%); */
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 100%);
    border-radius: 24px;
    cursor: text;
    height: 44px;
    width: 50%;
    /* margin: 30px auto; */
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;
const SearchSelect = styled.select`
    margin-right: 10px;
    height: 25px;
    border-radius: 5px;
    border: none;
`;
const SearchInput = styled.input`
    width: 80%;
    height: 25px;
    border: none;
`;
const InfoWrap = styled.div`
    /* background-color: aliceblue; */
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 60px auto;
`;
const BlocksWrap = styled.div`
    display: inline-block;
    width: 49.4%;
    border-radius: 10px;
    --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
    box-shadow: var(--bs-card-box-shadow);
    div{
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;
const TransactionsWrap = styled.div`
    display: inline-block;
    width: 49.4%;
    border-radius: 10px;
    --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
    box-shadow: var(--bs-card-box-shadow);
`;