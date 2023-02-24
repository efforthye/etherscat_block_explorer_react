import { useState } from "react";
import TestComponent from "../components/Test.jsx";
import { redirect } from "react-router-dom";
import axios from "axios";

// api
import { newBoard } from "../api/index.js";

// web3
import Web3 from "web3";
const web3 = new Web3("http://localhost:8081");

// geth 요청 기본 정보
const request = axios.create({
    method: "POST",
    baseURL: "http://localhost:8081",
    headers: {
        "Content-Type": "application/json"
    }
});


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

    return <TestComponent changeFuncs={{ changeTitle, changeText }} upload={upload} web3={web3} request={request} />
}

export default TestContainer;





// const BlockComponent = require("../components/Block.jsx");

// const BlockContainer = () => {
//     return <BlockComponent />
// }

// export default BlockContainer;