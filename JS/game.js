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

// ハイスコア（ローカルストレージから読み込み）
let highScore = Number(localStorage.getItem("highScore")) || 0;

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

    // ハイスコア更新チェック
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    resultDisplay.textContent =
        `結果：${score} コイン　｜　ハイスコア：${highScore}`;

    retryBtn.style.display = "inline-block";
    clearCoins();

    soundEnd.currentTime = 0;
    soundEnd.play();
}

function clearCoins() {
    gameArea.innerHTML = "";
}

function spawnCoin() {
    if (!gameRunning) return;

    // 常にコインは1個だけ
    clearCoins();

    const coin = document.createElement("div");

    // 10% の確率で偽物
    const isFake = Math.random() < 0.1;

    coin.classList.add("coin");
    coin.style.background = isFake ? "orange" : "gold";

    const x = Math.random() * (window.innerWidth - 80);
    const y = Math.random() * (window.innerHeight - 200);

    coin.style.left = x + "px";
    coin.style.top = y + "px";

    // コインをクリックしたとき
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

    // コインが時間経過で消える（1秒後）
    setTimeout(() => {
        if (!gameRunning) return;

        if (coin.parentNode) {
            coin.remove();
            spawnCoin(); // 新しいコインを1個だけ出す
        }
    }, 1000);
}

startBtn.onclick = startGame;
retryBtn.onclick = startGame;
