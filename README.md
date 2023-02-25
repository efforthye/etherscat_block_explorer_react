# Block-Explorer
- 기간 : 1 주일 (2023. 2. 16. ~ 2023. 2. 23.)
- 개요 : 블록, 트랜잭션, 지갑 주소에 대한 모든 정보 확인
- 참고 : Etherscan(https://etherscan.io/)
- Stack : HTML/CSS/Javascript, React, Node.js, MySQL, MetaMask, Web3, Geth
- 최소 기능
  - 블록, 트랜잭션, 지갑 주소 정보 출력
  - 모든 종류의 검색
  - Block 등의 정보 저장 및 출력

# 프로젝트 실행방법
1. Block-Explorer/web 폴더에 .env 파일 생성 후 아래의 내용 입력 및 저장
```
BUILD_PATH="./server/build"
COOKIE_SECRET="happyworld"
```
2. Block-Explorer/web/server/config/config.json 파일에 맞게 mysql 스키마 생성
3. Block-Explorer/web 경로까지 접근 후 yarn build
4. Ubuntu에서 geth 서버를 열어 준다.
- node.js 버전 : 16
```
geth --datadir ~/myGeth --http --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins "*“ --maxpeers 0 console
```
- node.js 버전 : 16 실행되지 않을 경우
```
geth --datadir ~/myGeth --http --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins "*“ console
```
- node.js 버전 : 18
```
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins "*" console
```
5. Block-Explorer/web 경로까지 접근 후 ```yarn start:server``` 으로 서버 실행 후 localhost:8080 에 접속하여 프로젝트에 접근


# 프로젝트 실행시 열리게 되는 포트
- client(react-yarn) : 3000 port
- server(node.js-express) : 8080 port
- geth : 8081 port(networkid 50)
- ws : 8082 port

# 주요 기능
- geth 서버와 연결된 block, transaction, wallet 정보들을 서버 실행시 db에 모두 저장
- block 채굴시 websocket subscribe newBlockHeaders 를 통해 실시간으로 db에 저장
- etherscan.io 의 사이트를 크롤링하여 db에 최신 가격 정보를 저장하고 
  ethereum price와 gas price를 10초마다 web site에 랜더링
- 메인 화면 : 최신 6개의 블록/트랜잭션 정보 및 로딩창/차트/검색기능 구현
- 블록 : 모든 블록 정보 페이지 출력 및 페이징 처리와 라우터 구현
- 트랜잭션 : 모든 트랜잭션 정보 페이지 출력 및 페이징 처리/라우터 구현
- 지갑 : 해당 wallet의 transaction 정보 출력 및 해당 블록, 트랜잭션으로 라우팅
- 헤더 개발 및 라우팅, 푸터 donation 클릭시 Metamask와 연결 및 1ETH 전송기능
