import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loding";

const AllBlockComponent = ({ blocks, allPageNum, setPage, page, loading }) => {

    // console.log(blocks);

    // 페이지 배열
    const pagenation = (allPageNum) => {
        const pageArr = [];
        for (let i = 1; i < allPageNum + 1; i++) {
            pageArr.push(i);
        }
        return pageArr;
    }


    // 스크롤을 올리는 함수
    const moveTop = () => {
        window.scrollTo({
            top: 100,
            behavior: "smooth",
        });
    };


    return (
        <>
            <AllWrap>

                {loading ? <Loading /> : null}

                {/* 현재 블록 넘버 구해서 올리기 */}
                <Title>Blocks</Title>

                {/* 테이블로 바꾸기 */}
                <BlocksWrap>
                    <InfoWrap>
                        {/* <Information>
                            <span>ㅇㅅㅇ</span>
                            <span>ㅇㅅㅇ</span>
                            <span>ㅇㅅㅇ</span>
                        </Information> */}
                    </InfoWrap>
                    {/* 하나하나의 블록 정보 */}
                    {blocks?.map((block, index) => (
                        <BlockWrap key={`block-${index}`}>
                            <BlockInfo>
                                <span>{block?.number}</span>
                                <span>{block?.hash}</span>
                                <LinkDiv2>
                                    <Link to={`/wallet/${block?.miner}`}>
                                        {block?.miner}
                                    </Link>
                                </LinkDiv2>
                            </BlockInfo>
                        </BlockWrap>
                    ))}
                </BlocksWrap>
                {/* 페이지 출력하는 함수 : 이전, 다음 만들기 */}
                <PageWrap>
                    <LinkDiv>
                        <Link to={`/allBlock/1`} onClick={() => {
                            setPage(1);
                            moveTop();
                        }}>처음</Link>
                    </LinkDiv>
                    <LinkDiv>
                        {/* <Link to={`/allBlock/${page < 1 ? page - 1 : page}`} onClick={() => { */}
                        <Link to={`/allBlock/${page <= 1 ? page : page - 1}`} onClick={() => {
                            if (page <= 1) return;
                            setPage(page - 1);
                        }}>이전</Link>
                    </LinkDiv>
                    {pagenation(allPageNum).map((num, index) => (
                        <span style={{ marginRight: "5px" }} key={`page-${index}`}>
                            <LinkDiv>
                                <Link to={`/allBlock/${num}`} onClick={() => {
                                    setPage(num);
                                }}>{num}</Link>
                            </LinkDiv>
                        </span>
                    ))}
                    <LinkDiv>
                        <Link to={`/allBlock/${page >= allPageNum ? page : page + 1}`} onClick={() => {
                            if (page >= allPageNum) return;
                            setPage(page + 1);
                        }}>다음</Link>
                    </LinkDiv>
                    <LinkDiv>
                        <Link to={`/allBlock/${allPageNum}`} onClick={() => {
                            setPage(allPageNum);
                            moveTop();
                        }}>마지막</Link>
                    </LinkDiv>
                </PageWrap>

            </AllWrap>
        </>
    )
}

export default AllBlockComponent;

const AllWrap = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 20%);
    border-radius: 10px;
    margin-top: 45px;
`;
const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #E9ECEF;
    padding: 20px 0;
    &>span{
        font-size: 15px;
        color: #6C757D;
        font-weight: 500;
    }
`;
const BlocksWrap = styled.div`

`;
const BlockWrap = styled.div`
    margin: 30px 0;
`;
const InfoWrap = styled.div`

`;
// const Information = styled.div`
//     padding-right: 50px;
//     display: flex;
//     justify-content: space-between;
// `;
const BlockInfo = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    &>span{
        margin-right: 20px;
    }
`;
const LinkDiv = styled.div`
    display: inline-block;
    margin: 5px;
    &>a{
        color: #2c2c2c;
        text-decoration: none;
        font-weight: 600;
    }
`;
const LinkDiv2 = styled.div`
    display: inline-block;
    &>a{
        color: #0784c3;
        text-decoration: none;
    }
`;
const PageWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    margin-top: 20px;
`;