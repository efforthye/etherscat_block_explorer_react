import { Link } from "react-router-dom";
import styled from "styled-components";

// https://ssddo-story.tistory.com/15 -> 폰트어썸 변수명 카넬으로 변경
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

const HeaderComponent = ({ prices }) => {
    return (
        <>
            {/* fixed top header */}
            <TopPriceBar>
                <PriceBar>
                    <Eth>
                        ETH Price : <BlueSpan>{prices[0]}</BlueSpan>
                        {/* 이더리움 가격 */}
                        {prices[2]?.includes("+") ? <GreenSpan>{prices[2]}</GreenSpan> : <RedSpan>{prices[2]}</RedSpan>}
                    </Eth>
                    <Gas>
                        <FontAwesomeIcon icon={faGasPump} />{" "}
                        Gas : <BlueSpan>{prices[1]}</BlueSpan>
                    </Gas>
                </PriceBar>
            </TopPriceBar>

            {/* header */}
            <Header className='header'>
                <div>
                    <Link to={"/"}>
                        <LogoImg alt="logo" src="images/logo.png" />
                    </Link>
                </div>
                <RouterLink>
                    <Link to={"/block"}>Block</Link>
                    <Link to={"/transaction"}>Transaction</Link>
                    <Link to={"/wallet"}>Wallet</Link>
                    <Link to={"/mining"}>Mining</Link>
                    <Link to={"/test"}>DB</Link>
                </RouterLink>
            </Header>
        </>
    )
}

export default HeaderComponent;


const TopPriceBar = styled.div`
  z-index: 1;
  height: 65px;
  position: sticky;
  top: 0; left: 0;
  background-color: #fff;
  border-bottom: 1px solid rgb(245,245,245);
  display: flex;
  align-items: center;
`;
const PriceBar = styled.div`
  width: 75%;
  margin: 0 auto;
  font-size: small;
`;
const Eth = styled.span`
  color: gray;
  margin-right: 15px;
`;
const Gas = styled.span`
  color: gray;

`;
const Header = styled.div`
  height: 78px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  width: 75%;
  margin: 0 auto;
  box-sizing: border-box;
  a{
    color: black;
    text-decoration: none;
    margin: 0 20px;
    font-weight: 600;
  }
`;
const LogoImg = styled.img`
  width: 150px;
  cursor: pointer;
`;
const BlueSpan = styled.span`
  color: #0784c3;
`;
const RedSpan = styled.span`
  color: #dc3545;
`;
const GreenSpan = styled.span`
  color: #00a186
`;
const RouterLink = styled.div`
  a:hover{
    color: #0784c3;
    transition: all 0.5s;
  }
`;