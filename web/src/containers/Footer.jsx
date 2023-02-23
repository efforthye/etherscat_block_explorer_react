import FooterComponent from "../components/Footer";

import Web3 from "web3";
import axios from "axios";
import { useEffect, useState } from "react";
const web3 = new Web3("http://localhost:8081");

const FooterContainer = () => {

    // geth 요청
    const request = axios.create({
        method: "POST",
        baseURL: "http://localhost:8081",
        headers: {
            "Content-Type": "application/json"
        }
    });



    const [nowAccount, setNowAccount] = useState();

    useEffect(() => {
        window.ethereum.request({
            method: "eth_requestAccounts"
        }).then((data) => {
            setNowAccount(data);
        });
    }, []);



    const moveTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return <FooterComponent moveTop={moveTop} web3={web3} request={request} nowAccount={nowAccount} />
}

export default FooterContainer