let colors = ["yellow", "red", "blue", "violet", "green"];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let scores = document.querySelectorAll(".score");
let num = 0;
let total = 50;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector(".total-shadow");
let startBtn = document.querySelector(".start-game-button");

function creatBalloon() {
  let div = document.createElement("div");
  let rand = Math.floor(Math.random() * colors.length);
  div.className = "balloon balloon-" + colors[rand];
  //randomize color of balloon
  rand = Math.floor(Math.random() * (windowWidth - 100));
  //randomize position of balloon
  div.style.left = rand + "px";
  div.dataset.number = currentBalloon;
  currentBalloon++;
  body.appendChild(div);
  animateBalloon(div);
}
//animation for the balloon from the buttoom to up
function animateBalloon(element) {
  let pos = 0;
  //increment the speed
  let interval = setInterval(frame, 12 - Math.floor(num / 5));
  function frame() {
    //chek if the baloon arrived up and if the specific balloon exist
    if (
      pos >= windowHeight + 200 &&
      document.querySelector(
        '[data-number="' + element.dataset.number + '"]'
      ) !== null
    ) {
      clearInterval(interval);
      gameOver = true;
    } else {
      pos++;
      element.style.top = windowHeight - pos + "px";
    }
  }
}

//onclick on the balloon remove it
function deleteBalloon(element) {
  element.remove();
  num++;
  updateScore();
  playBalloonSound();
}
//sound of pop onclick
function playBalloonSound() {
  let audio = document.createElement("audio");
  audio.src = "sounds/pop.mp3";
  audio.play();
}
//update score box
function updateScore() {
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = num;
  }
}
//start game and stop it if he make the score or miss a balloon
function startGame() {
  restartGame();
  let timeOut = 0;
  let loop = setInterval(function () {
    timeOut = Math.floor(Math.random() * 600 - 100);
    if (!gameOver && num !== total) {
      creatBalloon();
    } else if (num !== total) {
      clearInterval(loop);
      totalShadow.style.display = "flex";
      totalShadow.querySelector(".lose").style.display = "block";
    } else {
      clearInterval(loop);
      totalShadow.style.display = "flex";
      totalShadow.querySelector(".win").style.display = "block";
    }
  }, 800 + timeOut);
}
//clear all the balloons clear the score and start again
function restartGame() {
  let forRemoving = document.querySelectorAll(".balloon");
  for (let i = 0; i < forRemoving.length; i++) {
    forRemoving[i].remove();
  }
  gameOver = false;
  num = 0;
  updateScore();
}

//event pop balloon
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("balloon")) {
    deleteBalloon(event.target);
  }
});

//restart game-'yes'
document.querySelector(".restart").addEventListener("click", function () {
  totalShadow.style.display = "none";
  totalShadow.querySelector(".win").style.display = "none";
  totalShadow.querySelector(".lose").style.display = "none";
  startGame();
});

//restart game-'no'
document.querySelector(".cancel").addEventListener("click", function () {
  totalShadow.style.display = "none";
});

//background sound
startBtn.addEventListener("click", function () {
  startGame();
  document.querySelector(".bg-music").play();
  document.querySelector(".start-game-window").style.display = "none";
});
