const gameboard = document.getElementById("gameboard");
const gameboardCtx = gameboard.getContext("2d");

const resetBtn = document.getElementsByClassName("resetBtn")[0];
const gameOverSign = document.getElementsByClassName("gamerOverSpan")[0];
const pointsBoard = document.getElementsByClassName("points")[0];
const dificulty = document.getElementById("dificulty");

const snakeColor = "white";
const snakeBorderColor = "grey";
const cheeseColor = "yellow";
const cheeseBorderColor = "grey";
const gameboardBackgroundColor = "black";
const gameboardBorderColor = "red";

let changingDirection = false;
let firstGame = true;
let moveX = 10;
let moveY = 0;
let cheeseX;
let cheeseY;
let dificultyValue = "easy";
let snakeSpeed = 100;


let snake = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 }
];

resetBtn.addEventListener("click", () => {
	snake = [
		{ x: 200, y: 200 },
		{ x: 190, y: 200 },
		{ x: 180, y: 200 },
		{ x: 170, y: 200 },
		{ x: 160, y: 200 }
	]
	moveX = 10;
	moveY = 0;
	cheeseX = randomizePlacement(0, gameboard.width - 10);
	cheeseY = randomizePlacement(0, gameboard.height - 10);

	gameOverSign.style = "display: none";
	resetBtn.style = "display: none";
  dificulty.style = "display: none;"
	pointsBoard.textContent = 0;

	main();
});

main();
generateCheese();

document.addEventListener("keydown", changeDirection);
dificulty.addEventListener("change", e => {
  dificultyValue = e.path[0].value;
  snakeSpeed = (dificultyValue === "easy" ? 100 : dificultyValue === "normal" ? 75 : dificultyValue === "hard" ? 50 : 0);
  console.log(dificultyValue)
})

function main() {
	if (gameOver()) {
		gameOverSign.style = "display: block"
		gameOverSign.textContent = "Game Over";
    resetBtn.textContent = "Play Again";
		resetBtn.style = "display: block"
    dificulty.style = "display: block;"
		return
	};
  if(firstGame){
    firstGame = false;
    clearBoard();
    resetBtn.style = "display: block";
    return
  }
	changingDirection = false;
	setTimeout(() => {
    console.log(snakeSpeed)
		clearBoard();
		spawnCheese();
		moveSnake();
		spawnSnake();
		main();
	}, snakeSpeed);
}

function clearBoard() {
	gameboardCtx.fillStyle = gameboardBackgroundColor;
	gameboardCtx.strokeStyle = gameboardBorderColor;
	gameboardCtx.fillRect(0, 0, gameboard.width, gameboard.height);
	gameboardCtx.strokeRect(0, 0, gameboard.width, gameboard.height);
};

function moveSnake() {
	const head = { x: snake[0].x + moveX, y: snake[0].y + moveY };
	snake.unshift(head);
	if (snake[0].x === cheeseX && snake[0].y === cheeseY) {
		score = parseInt(pointsBoard.textContent);
		score++;
		pointsBoard.textContent = score;
		generateCheese();
	} else {
		snake.pop();
	};
};

function spawnSnake() {
	snake.forEach(snakePart => {
		gameboardCtx.fillStyle = snakeColor;
		gameboardCtx.strokeStyle = snakeBorderColor;
		gameboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
		gameboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
	});
};

function spawnCheese() {
	gameboardCtx.fillStyle = cheeseColor;
	gameboardCtx.strokestyle = cheeseBorderColor;
	gameboardCtx.fillRect(cheeseX, cheeseY, 10, 10);
	gameboardCtx.strokeRect(cheeseX, cheeseY, 10, 10);
};
function randomizePlacement(min, max) {
	return Math.round((Math.random() * (max - min) + min) / 10) * 10
};

function generateCheese() {
	cheeseX = randomizePlacement(0, gameboard.width - 10);
	cheeseY = randomizePlacement(0, gameboard.height - 10);

	snake.forEach(part => {
		if (part.x == cheeseX && part.y == cheeseY)
			generateCheese();
	});
};

function changeDirection(e) {
	const w = 87;
	const a = 65;
	const s = 83;
	const d = 68;
	const upKey = 38;
	const leftKey = 37;
	const downKey = 40;
	const rightKey = 39;

	if (changingDirection) return;
	changingDirection = true;
	const pressedKey = e.keyCode;
	const up = moveY === -10;
	const down = moveY === 10;
	const left = moveX === -10;
	const right = moveX === 10;

	if (((pressedKey === w) || (pressedKey === upKey)) && !down) {
		moveY = -10;
		moveX = 0;
	};
	if (((pressedKey === s) || (pressedKey === downKey)) && !up) {
		moveY = 10;
		moveX = 0;
	};
	if (((pressedKey === a) || (pressedKey === leftKey)) && !right) {
		moveY = 0;
		moveX = -10;
	};
	if (((pressedKey === d) || (pressedKey === rightKey)) && !left) {
		moveY = 0;
		moveX = 10;
	};
};

function gameOver() {
	for (let i = 4; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
	};
	const topWallCollision = snake[0].y < 0;
	const bottomWallCollision = snake[0].y > gameboard.height - 10;
	const leftWallCollision = snake[0].x < 0;
	const rightWallCollision = snake[0].x > gameboard.width - 10;

	return topWallCollision || bottomWallCollision || leftWallCollision || rightWallCollision;
};





