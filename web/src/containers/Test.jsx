import { useState } from "react";
import TestComponent from "../components/Test.jsx";
import { redirect } from "react-router-dom";

// api
import { newBoard } from "../api/index.js";

const TestContainer = () => {
    const [testData, setTestData] = useState({
        title: "",
        text: "",
    });
    const changeTitle = (e) => {
        setTestData((state) => ({ ...state, title: e.target.value }));
    }
    const changeText = (e) => {
        setTestData((state) => ({ ...state, text: e.target.value }));
    }
    const upload = async () => {
        console.log(testData); // 잘 뜸
        const result = await newBoard(testData);
        if (result.isError === false) {
            redirect("/");
        }
    }

    return <TestComponent changeFuncs={{ changeTitle, changeText }} upload={upload} />
}

export default TestContainer;





// const BlockComponent = require("../components/Block.jsx");

// const BlockContainer = () => {
//     return <BlockComponent />
// }

// export default BlockContainer;