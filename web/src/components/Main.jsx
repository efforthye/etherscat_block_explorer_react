import styled from "styled-components";

const MainComponent = ({ blockInfo, latestBlocks }) => {
    return (
        <>
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
            {/* <div>
                <SearchBackground src="../images/background5.jpg" alt="space" />
            </div> */}


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
                    <div>하이</div>
                    <div>하이</div>
                    <div>하이</div>
                    <div>하이</div>
                </TransactionsWrap>
            </InfoWrap>


        </>
    )
}

export default MainComponent;


const SearchBox = styled.div`
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    border-radius: 24px;
    cursor: text;
    height: 40px;
    width: 500px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;
const SearchSelect = styled.select`
    margin-right: 7px;
    height: 25px;
    border-radius: 5px;
`;
const SearchInput = styled.input`
    width: 400px;
    height: 20px;
    border: none;
`;
const SearchBackground = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 10% 30%; 
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
`;
const TransactionsWrap = styled.div`
    display: inline-block;
    width: 49.4%;
    border-radius: 10px;
    --bs-card-box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
    box-shadow: var(--bs-card-box-shadow);
`;