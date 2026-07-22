const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const timeSelect = document.getElementById("timeSelect");

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
}

function clearCoins() {
    gameArea.innerHTML = "";
}

function spawnCoin() {
    if (!gameRunning) return;

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

        score += isFake ? -1 : 1;
        scoreDisplay.textContent = "Score: " + score;

        coin.remove();
        spawnCoin();
    };

    gameArea.appendChild(coin);

    // 1秒ごとに新しいコインを出す
    setTimeout(() => {
        if (coin.parentNode) coin.remove();
        spawnCoin();
    }, 1000);
}

startBtn.onclick = startGame;
retryBtn.onclick = startGame;
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const timeSelect = document.getElementById("timeSelect");

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
}

function clearCoins() {
    gameArea.innerHTML = "";
}

function spawnCoin() {
    if (!gameRunning) return;

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

        score += isFake ? -1 : 1;
        scoreDisplay.textContent = "Score: " + score;

        coin.remove();
        spawnCoin();
    };

    gameArea.appendChild(coin);

    // 1秒ごとに新しいコインを出す
    setTimeout(() => {
        if (coin.parentNode) coin.remove();
        spawnCoin();
    }, 1000);
}

startBtn.onclick = startGame;
retryBtn.onclick = startGame;
