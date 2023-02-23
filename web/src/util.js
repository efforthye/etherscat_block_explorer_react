// 타임스탬프 일시분초 변환 함수
const timestampFunc = (timestamp) => {
    // 현재 시간
    const nowTime = (new Date().getTime()) / 1000;
    // 받은 시간
    timestamp -= 60;

    // 시간 간격 (초단위 타임스탬프)
    let diffTime = nowTime - timestamp;
    const day = Math.floor(diffTime / (60 * 60 * 24))
    diffTime -= day * 60 * 60 * 24;
    const hour = Math.floor(diffTime / (60 * 60))
    diffTime -= hour * 60 * 60;
    const minute = Math.floor(diffTime / 60);
    diffTime -= minute * 60;
    const second = Math.floor(diffTime);

    const text = day ? `${day}일` : hour ? `${hour}시간` : minute ? `${minute}분` : `${second}초`
    return { day, hour, minute, second, text }
}


// 스크롤을 올리는 함수
const moveTop = () => {
    window.scrollTo({
        top: 100,
        behavior: "smooth",
    });
};

// 해시를 잘라 단축하는 함수
const sliceHash = (hash) => {
    const left = hash.slice(0, 6);
    const right = hash.slice(-6);
    const newHash = `${left}...${right}`;
    return newHash;
}

export { timestampFunc, moveTop, sliceHash }