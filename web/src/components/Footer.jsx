import styled from "styled-components";
import EthereumIcon from "../images/ethereum2.png"

const FooterComponent = ({ moveTop, web3, request, nowAccount }) => {
    return (
        <>
            <AllWrap className="allWrap">
                <ContentWrap className="contentWrap">
                    <FooterTop className="footerTop">
                        <div>
                            <div>🔗</div>
                            <div>💻</div>
                            <div>🔌</div>
                            <div>📷</div>
                        </div>
                        <div onClick={moveTop}><span style={{ fontSize: "18px" }}>&uarr; </span>Back to Top</div>
                    </FooterTop>
                    <FooterContent className="footerContent">
                        <ContentsDiv>
                            {/* <span>💲 Powered by Ethereum</span> */}
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <img src={EthereumIcon} alt={"트랜잭션"} style={{ width: "30px" }} />
                                Powered by Ethereum</span>
                            <span>
                                Etherscat is a Block Explorer and Analytics Platform for Ethereum,
                                a decentralized smart contracts platform.
                            </span>
                        </ContentsDiv>
                        <ContentsDiv>
                            <span>Company</span>
                            <span>About us</span>
                            <span>Brand Assets</span>
                            <span>Contact Us</span>
                            <span>Careers</span>
                            <span>Terms of Service</span>
                            <span>Bug Bounty</span>
                        </ContentsDiv>
                        <ContentsDiv>
                            <span>Community</span>
                            <span>API Documentation</span>
                            <span>Knowledge Base</span>
                            <span>Network Status</span>
                            <span>Newsletters</span>
                            <span>Disqus Comments</span>
                            <span></span>
                        </ContentsDiv>
                        <ContentsDiv>
                            <span>Products & Services</span>
                            <span>Advertise</span>
                            <span>Explorer-as-a-Service (EaaS)</span>
                            <span>API Plans</span>
                            <span>Priority Support</span>
                            <span>Blockscan </span>
                            <span>Blockscan Chat </span>
                        </ContentsDiv>
                    </FooterContent>
                    <FooterBottom>
                        <div>Etherscat @2023 (F1)</div>
                        <div>Donations : <span onClick={async () => {
                            const accounts = await web3.eth.getAccounts();
                            const to = (await web3.eth.getAccounts())[(await web3.eth.getAccounts()).length - 1];

                            alert("현재 계정 : " + nowAccount);
                            alert(`${to}` + " 님에게 1ETH를 보냅니다.")

                            window.ethereum.request({
                                method: "eth_sendTransaction",
                                params: [{
                                    from: nowAccount.toString(),
                                    to: to.toString(),
                                    value: "0x" + (+1 * Math.pow(10, 18)).toString(16),
                                }],
                            }).then(async (result) => {
                                console.log(result);
                            }).catch((err) => {
                                console.error(err);
                            });
                        }}>ㅇ0ㅇ</span>❤</div>
                    </FooterBottom>
                </ContentWrap>
            </AllWrap>
        </>
    )
}

export default FooterComponent;

const AllWrap = styled.div`
  margin-top: 150px;
  width: 100%;
  background-color: #F8F9FA;
  cursor: default;
  font-size: 14px;
  color: #212529;
`;

const ContentWrap = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const FooterTop = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #E9ECEF;
    &>div{
        cursor: pointer;
    }
    &>div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 10%;
    }
    &>div:last-child {
        width: fit-content;
        &:hover {
            cursor: pointer;
            color: #0784c3;
        }
    }
`;

const FooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2% 0;
    width: 100%;
`;

// 원투쓰리포 각각 -> 살짝 변경하기
const ContentsDiv = styled.div`
    width: 20%;
    &:first-child{
        width: 37%;
    }
    &>span{
        padding: 5px 0;
        display: block;
        &:first-child{
            font-weight: 600;
            font-size: 16px;
        }
        &:not(:first-of-type):hover {
            cursor: pointer;
            color: #0784c3;
        }
    }
`;

const FooterBottom = styled.div`
    border-top: 1px solid #E9ECEF;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div>a, &>div>span{
        text-decoration: none;
        color: #0784c3;
        cursor: pointer;
    }
`;