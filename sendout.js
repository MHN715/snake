const body = document.getElementsByTagName("body")[0];

const gameboardWrapper = document.createElement("div");
const gameboard = document.createElement("canvas");
gameboard.id = "gameCanvas";
gameboard.width = "400";
gameboard.height = "400";

gameboardWrapper.style = "position: absolute; top:0; z-index; 9000; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; border: 1px solid green";

const resetBtn = document.createElement("button");
  resetBtn.textContent = "Play Again";
  resetBtn.style = "display: none;"

resetBtn.addEventListener("click", () => {
	resetBtn.style = "display: none;"
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

	const gameOverSign = document.getElementsByClassName("gameOverSign")[0];
	gameOverSign.parentNode.removeChild(gameOverSign);

	main();
})

gameboardWrapper.appendChild(gameboard);
body.appendChild(gameboardWrapper);
gameboardWrapper.appendChild(resetBtn);


const gameboardCtx = gameboard.getContext("2d");

const snakeColor = "white";
const snakeBorderColor = "grey";
const cheeseColor = "yellow";
const cheeseBorderColor = "grey";
const gameboardBackgroundColor = "black";
const gameboardBorderColor = "red";

let changingDirection = false;
let moveX = 10;
let moveY = 0;
let cheeseX;
let cheeseY;
let snakeSpeed = 67;

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

main()

generateCheese();

document.addEventListener("keydown", changeDirection);

function main() {
  if (gameOver()){
    const gameOverSign = document.createElement("div");
    gameOverSign.textContent = "Game Over";
    gameOverSign.style = "color: blue; font-size: 70px; position: absolute; justify-self: center; align-self: center; bottom: 8em";
    gameOverSign.className = "gameOverSign";
    gameboard.parentNode.appendChild(gameOverSign)
		resetBtn.style = "display: block; color: blue; font-size: 20px; position: absolute; justify-self: center; align-self: center; "
    return;
  }
  changingDirection = false;
  setTimeout(() => {
    clearBoard();
    spawnCheese();
    moveSnake();
    spawnSnake();
    main();
  }, snakeSpeed)
}

function clearBoard(){
  gameboardCtx.fillStyle = gameboardBackgroundColor;
  gameboardCtx.strokeStyle = gameboardBorderColor;
  gameboardCtx.fillRect(0,0, gameboard.width, gameboard.height);
  gameboardCtx.strokeRect(0,0, gameboard.width, gameboard.height);
}

function moveSnake() {
  const head = {x: snake[0].x + moveX, y: snake[0].y + moveY};
  snake.unshift(head);
  if(snake[0].x === cheeseX && snake[0].y === cheeseY){
    generateCheese();
  }else{
    snake.pop();
  }
}

function spawnSnake(){
  snake.forEach(snakePart => {
    gameboardCtx.fillStyle = snakeColor;
    gameboardCtx.strokeStyle = snakeBorderColor;
    gameboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    gameboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  });
}

function spawnCheese(){
  gameboardCtx.fillStyle = cheeseColor;
  gameboardCtx.strokestyle = cheeseBorderColor;
  gameboardCtx.fillRect(cheeseX, cheeseY, 10,10);
  gameboardCtx.strokeRect(cheeseX, cheeseY, 10,10);
}

function randomizePlacement(min, max){
  return Math.round((Math.random() * (max-min) + min) / 10) *10
}

function generateCheese() {
  cheeseX = randomizePlacement(0, gameboard.width - 10);
  cheeseY = randomizePlacement(0, gameboard.height - 10);
  snake.forEach(part => {
    if(part.x == cheeseX && part.y == cheeseY)
    generateCheese();
  })
}


function changeDirection(e){
  const leftKey = 37 && 65;
  const upKey = 38 && 87;
  const rightKey = 39 && 68;
  const downKey = 40 && 83;
  if(changingDirection) return;
  changingDirection = true;
  const pressedKey = e.keyCode;
  const up = moveY === -10;
  const down = moveY === 10;
  const left = moveX === -10;
  const right = moveX === 10;
  if (pressedKey === upKey && !down) {
    moveY = -10;
    moveX = 0;
  }
  if (pressedKey === downKey && !up) {
    moveY = 10;
    moveX = 0;
  }
  if (pressedKey === leftKey && !right) {
    moveY = 0;
    moveX = -10;
  }
  if (pressedKey === rightKey && !left) {
    moveY = 0;
    moveX = 10;
  }
  if(pressedKey == 32){
    // console.log(e)
    // snakeSpeed -= 10;
    // console.log(snakeSpeed)
    snakeSpeed = 20;
  }else{
      
  }
}

function gameOver() {
  for (let i = 4; i < snake.length; i++){
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;        
  }
  const topWallCollision = snake[0].y < 0;
  const bottomWallCollision = snake[0].y > gameboard.height - 10;
  const leftWallCollision = snake[0].x < 0;
  const rightWallCollision = snake[0].x > gameboard.width -10;
  return topWallCollision || bottomWallCollision || leftWallCollision || rightWallCollision;
}



