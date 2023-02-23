import { Link } from "react-router-dom";
import styled from "styled-components";

const AllBlockComponent = ({ blocks, allPageNum, setPage, page }) => {

    // 페이지 배열
    const pagenation = (allPageNum) => {
        const pageArr = [];
        for (let i = 1; i < allPageNum + 1; i++) {
            pageArr.push(i);
        }
        return pageArr;
    }

    const pagePlus = () => {
        setPage(page + 1);
        return page;
    }

    return (
        <>
            <AllWrap>

                {blocks?.map((block, index) => (
                    <BlockWrap key={`block-${index}`}>
                        <BlockInfo>{block?.number} : {block?.hash}</BlockInfo>
                    </BlockWrap>
                ))}

                {/* 페이지 출력하는 함수 : 이전, 다음 만들기 */}
                <LinkWrap>

                    <LinkDiv>
                        <Link to={`/allBlock/1`} onClick={() => {
                            setPage(1);
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
                        }}>마지막</Link>
                    </LinkDiv>
                </LinkWrap>

            </AllWrap>
        </>
    )
}

export default AllBlockComponent;

const AllWrap = styled.div`
    margin: 0 auto;
    width: 70%;
`;
const LinkDiv = styled.div`
    display: inline-block;
    margin: 5px;
    &>a{
        color: black;
        text-decoration: none;
    }
`;
const LinkWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
`;
const BlockWrap = styled.div`

`;
const BlockInfo = styled.div`

`;