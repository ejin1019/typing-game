const url = 'https://random-word-api.herokuapp.com/word?number=5'
const wordInput = document.querySelector("#word-input");
const scoreDisplay = document.querySelector("#score");
const message = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
let score = 0;
const gameTime = 5;
let time = gameTime;
let isPlaying = true;


// const words = ['good', 'bad', 'sad', 'cry', 'smile'];
const words = [];
//시작되면
init();

// initial 초기 실행
function init() {
    getWord();
    wordInput.addEventListener('input', startMatch)
    setInterval(countDown, 1000);
    setInterval(checkStatus, 50);
    timeDisplay.innerHTML = time;
}

//단어가져오기
function getWord() {
    axios.get(url).then((res) => {
        // console.log(res);
        res.data.forEach((word) => {
            if (word.length < 10) {

                words.push(word);
            }
        })
    }).catch((err) => {
        console.log(err);
    })
}


// 함수들
// 게임이 플레이중인지 확인
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game OVER!'
        score = -1;

    }
}


//시간을 카운트 다운
function countDown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

// 글자가 맞는지 확인 함수
function startMatch() {
    const currentWorld = document.querySelector("#current-word");
    // console.log(currentWorld.innerHTML, wordInput.value,wordInput.value == currentWorld.innerHTML);

    if (wordInput.value == currentWorld.innerHTML) {
        score++;
        scoreDisplay.innerHTML = score;
        time = gameTime;
        wordInput.value = ""; //input 창 초기화
        message.innerHTML = "Correct!";

        // console.log(randomIndex);
        // for (i = 0; i < words.length; i++) {

        // }
        const randomIndex = Math.floor(Math.random() * words.length);
        console.log(randomIndex);
        currentWorld.innerHTML = words[randomIndex];
    } else {
        message.innerHTML = '';
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}