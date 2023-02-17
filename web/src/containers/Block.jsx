import axios from "axios";
import BlockComponent from "../components/Block";
import Web3 from "web3";

const web3 = new Web3("http://localhost:8081");

// geth의 기본 정보
const request = axios.create({
    method: "POST",
    baseURL: "http://localhost:8081",
    headers: {
        "Content-Type": "application/json"
    }
});

const BlockContainer = () => {
    return <BlockComponent web3={web3} request={request} />
}

export default BlockContainer;