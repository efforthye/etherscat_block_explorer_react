import styled from "styled-components";

// 컨테이너로부터 받아올 값
const TestComponent = ({ changeFuncs, upload }) => {
    return (
        <>
            <Wrap>
                <label>
                    Title : <input type={"text"} onInput={changeFuncs.changeTitle} />
                </label>
                <label>
                    Text : <input type={"text"} onInput={changeFuncs.changeText} />
                </label>
                <button onClick={upload}>Upload</button>
            </Wrap>
        </>
    )
}
export default TestComponent;


const Wrap = styled.div`
    label {
        display: block;
        input {
            margin-left : 0.5rem;
        }
    }
`;