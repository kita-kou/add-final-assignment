const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const timeSelect = document.getElementById("timeSelect");

// 効果音
const soundCoin = document.getElementById("soundCoin");
const soundFake = document.getElementById("soundFake");
const soundEnd = document.getElementById("soundEnd");

let score = 0;
let timeLimit = 10;
let timer;
let gameRunning = false;

function startGame() {
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    resultDisplay.textContent = "";
    retryBtn.style.display = "none";
    gameRunning = true;

    timeLimit = Number(timeSelect.value);

    spawnCoin();

    timer = setTimeout(endGame, timeLimit * 1000);
}

function endGame() {
    gameRunning = false;
    resultDisplay.textContent = `結果：${score} コイン`;
    retryBtn.style.display = "inline-block";
    clearCoins();

    // 時間切れの効果音
    soundEnd.currentTime = 0;
    soundEnd.play();
}

function clearCoins() {
    gameArea.innerHTML = "";
}

function spawnCoin() {
    if (!gameRunning) return;

    // 既存のコインを消す（常に1個だけにする）
    clearCoins();

    const coin = document.createElement("div");

    // 10% の確率で偽物（オレンジ）
    const isFake = Math.random() < 0.1;

    coin.classList.add("coin");
    coin.style.background = isFake ? "orange" : "gold";

    const x = Math.random() * (window.innerWidth - 80);
    const y = Math.random() * (window.innerHeight - 200);

    coin.style.left = x + "px";
    coin.style.top = y + "px";

    coin.onclick = () => {
        if (!gameRunning) return;

        if (isFake) {
            score -= 1;
            soundFake.currentTime = 0;
            soundFake.play();
        } else {
            score += 1;
            soundCoin.currentTime = 0;
            soundCoin.play();
        }

        scoreDisplay.textContent = "Score: " + score;

        spawnCoin(); // 次のコインを1個だけ出す
    };

    gameArea.appendChild(coin);
}

startBtn.onclick = startGame;
retryBtn.onclick = startGame;

