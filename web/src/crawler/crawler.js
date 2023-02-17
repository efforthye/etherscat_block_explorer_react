import { useState } from "react";
const axios = require("axios");
const { Cheerio } = require("cheerio");

// 이더리움 가격, 가스비 로드 함수
export default async function PriceCrawler() {
    const [ethPrice, setEthPrice] = useState("");
    const [ethPersent, setEthPersent] = useState("");
    const [ethGas, setEthGas] = useState("");

    const [resp, setResp] = useState();

    await axios.get("https://etherscan.io/").then((data) => {
        console.log(data);
    });
    // const resp = await axios.get(
    //     'https://etherscan.io/'
    // );

    // const main = async () => {
    //     console.log(await axios.get("https://etherscan.io/"));
    //     setResp(await axios.get("https://etherscan.io/"));
    // }
    // main()



    const $ = Cheerio.load(resp.data);
    const elements = $('.text-muted a');
    const elements2 = $('.text-muted span .text-danger');

    elements.each((idx, el) => {
        console.log($(el).text());
        if (idx == 0) {
            setEthPrice($(el).text());
        } else {
            setEthPersent($(el).text());
        }
    });
    elements2.each((idx, el) => {
        // console.log($(el).text());
        setEthGas($(el).text());
    });

    return { ethPrice, ethPersent, ethGas }
}