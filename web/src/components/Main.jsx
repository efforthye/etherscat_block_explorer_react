import styled from "styled-components";

const MainComponent = ({ blockInfo }) => {
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

            <div>메인정보</div>

            {/* 블록 정보 map 돌려 출력하기 */}
            <div>
                {blockInfo.map((item, index) =>
                    <div key={index}>{item[0]} : {item[1]}</div>
                )}
            </div>

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
    margin: 10px auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;
const SearchSelect = styled.select`
    margin-right: 15px;
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