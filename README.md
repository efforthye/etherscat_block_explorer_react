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
3. Block-Explorer/web 경로까지 터미널 접근 후 yarn install
4. Block-Explorer/web/server 경로까지 터미널 접근 후 npm install
5. Ubuntu에서 geth 서버를 열어 준다.(아래 참고..)
6. Block-Explorer/web/server/index.js 파일의 force를 true로 바꿔 저장하고, 다시 false로 바꾸어 저장한다.
7. Block-Explorer/web 경로까지 터미널 접근 후 yarn start 명령어 입력


# 프로젝트 실행방법(빌드 확인)
1. Block-Explorer/web 폴더에 .env 파일 생성 후 아래의 내용 입력 및 저장
```
BUILD_PATH="./server/build"
COOKIE_SECRET="happyworld"
```
2. Block-Explorer/web/server/config/config.json 파일에 맞게 mysql 스키마 생성
3. Block-Explorer/web 경로까지 터미널 접근 후 yarn build
4. Ubuntu에서 geth 서버를 열어 준다.
- node.js 버전 : 16
```
geth --datadir ~/myGeth --http --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins "*“ console
```
- node.js 버전 : 16 실행되지 않을 경우
```
geth --datadir ~/myGeth --http --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins "*“ --maxpeers 0 console
```
- node.js 버전 : 18
```
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins --maxpeers 0 "*" console
```
- node.js 버전 : 18 실행되지 않을 경우
```
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8081 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50 --ws --ws.port 8082 --ws.origins "*" console
```
5. Block-Explorer/web/server/index.js 파일의 force를 true로 바꿔 저장하고, 다시 false로 바꾸어 저장한다.
6. Block-Explorer/web 경로까지 터미널 접근 후 ```yarn start:server``` 으로 서버 실행 후 localhost:8080 에 접속하여 프로젝트에 접근


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
- 지갑 : 해당 wallet의 금액/속한트랜잭션 정보 출력 및 해당 블록, 트랜잭션으로 라우팅
- 헤더 개발 및 라우팅, 푸터 donation 클릭시 Metamask와 연결 및 1ETH 전송기능


# 대표적인 이슈 사항
1. react/node.js/geth 연결 도중 발생한 cors error
2. axios 등의 통신 도중 발생한 response type error
3. transaction이 mining 후에도 txpool의 pending이 아닌 queued에 저장되는 이슈
4. metamask 연결 후 현재 account 설정이 정상적으로 되지않는 이슈
5. associate된 database model이 성공적으로 가져와지지 않는 이슈(EagerLoadingError)
- 깃 레포지토리의 Issues 카테고리에 해결 등 상세한 내용이 적혀져 있습니다.

# 프로젝트 도중 느낀점
- ## server/db/통신 관련
1. axios의 response는 웬만하면 객체에 감싸 보내는 것이 좋다는 것을 알았다.
2. geth/server의 ws와 front/server의 ws가 다르다는 것과 그에맞는 사용법을 알게 되었다.
3. cors 에러를 4개정도 직면해보니 이제 cors 에러는 확실히 잡을 수 있을 것 같다..
4. 이번 프로젝트를 통해서 db model을 create할 때, db 컬럼과 내가 가진 data의 변수명 등의 키값이 동일하다면 ```model.create({title:data.title, text:data.text})```와 같은 수작업이 아닌, 스프레드 ```model.create({...data})``` 를 사용하여 db에 값을 쉽게 집어넣을 수 있다는 것을 알았다.
5. 기존에 연결 관계를 설정하거나 값을 가져오는 방법을 알기는 했지만 더 쉽게 가져오는 방법은 몰랐는데, ```include``` 를 통하여 쉽게 연결된 데이터베이스의 값을 가져올 수 있다는 것을 알게되었다.
- ## react 관련
1. 이번에 react의 component, container를 따로 구분해놓은 것은 좋았지만, 프로젝트의 내용이 많아질 수록 이번과 같은 방법이 아닌 components 폴더 내에 한 기능의 폴더`ex) header`를 만들고 그 안에 component, container.jsx/tsx 파일을 넣는 것이 개발하면서 파일 찾기에 좋을 것 같다.
2. redux 등의 기술은 자주 사용하지 않으면 금방 잊어버릴 수 있으니 자주 사용해 봐야 할 것 같다.
3. 마음에 드는 chart 등의 react 라이브러리를 생각보다 쉽게 가져와 커스텀하고 활용할 수 있다는 것을 알게 되었다.
- ## git 관련
1. 깃허브 Issues 사용해보니 앞으로도 이슈 사항을 정리하기 좋을 것 같다.
2. 2개의 브랜치(main, dev)를 관리해 보면서 merge/fetch/pull/rebase의 개념을 기존보다 더 확실히 알게 되었다.
- ## 그 외 기본적인 것에서의 느낀 점
1. 다른 웹 사이트를 크롤링하는 것은 웬만하면 프로젝트에 적용하지 않아야 겠다. (build 이후에 해당 사이트의 cors 정책에 걸린 탓인지 데이터를 성공적으로 긁어올 수 없었다.)
2. 프로젝트를 개발하면서 열리는 포트가 많다 보니 사용 포트를 정리해 두면 편리하다는 것을 알았다.
3. react component에서 map을 사용하면서 잘 몰랐던 소괄호 바로리턴`list.map((item)=>(<div>이러면 바로 리턴됨</div>))`, 중괄호 리턴`list.map((item)=>{return <div>return 명령어를 통하여 리턴됨</div>})` 방법을 확실히 알게 되었다.
4. 내가 개발한 함수들 중에 자주 사용하는 함수는 프로젝트 최상단에 utils.js 등의 파일 내에 전역 함수로 만든후 export하여 언제나 쉽게 꺼내 사용할 수 있다는 것을 알게 되었다.

