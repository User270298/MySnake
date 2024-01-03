const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let score = 0;
let box = 50;

const ground = new Image();
ground.src = "37716068933bae2f9b11ff90bc91b015.jpg";
const food = new Image();
food.src = "photo_2023-12-26_22-15-58.png"
let foodCoord = {
    x: getFoodCord(12),
    y: getFoodCord(10)
}
let snakeCoord = []
snakeCoord[0] = {
    x: 6 * box,
    y: 5 * box
}
let direction;
document.body.addEventListener("keydown", function dire(event) {
    if (event.keyCode == 65 && direction != 'right') {
        direction = 'left'
    } else if (event.keyCode == 68 && direction != 'left') {
        direction = 'right'
    } else if (event.keyCode == 87 && direction != 'down') {
        direction = 'up'
    }
    else if (event.keyCode == 83 && direction != 'up') {
        direction = 'down'
    }
});

function game() {

    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, foodCoord.x, foodCoord.y);
    for (let i = 0; i < snakeCoord.length; i++) {
        ctx.fillStyle = 'red'
        ctx.fillRect(snakeCoord[i].x, snakeCoord[i].y, box, box)

    }
    let snakeX = snakeCoord[0].x;
    let snakeY = snakeCoord[0].y;
    if (foodCoord.x === snakeX && foodCoord.y === snakeY) {
        score++;
        foodCoord = {
            x: getFoodCord(12),
            y: getFoodCord(10)
        }
    } else {
        snakeCoord.pop()
    }
    if (snakeX < box || snakeX > box * 12 || snakeY < box || snakeY > box * 10) {
        clearInterval(gameInterval)
        alert(`GAME OVER 
               Ваш счет: ${score}`)
    }
    ctx.fillStyle = 'white'
    ctx.font = "50px Arial";
    ctx.fillText(score, 10, 45)


    if (direction == 'right') {
        snakeX += box
    };
    if (direction == 'left') {
        snakeX -= box
    };
    if (direction == 'up') {
        snakeY -= box
    };
    if (direction == 'down') {
        snakeY += box
    }
    let head = {
        x: snakeX,
        y: snakeY
    };
    for (let i = 0; i < snakeCoord.length; i++) {
        if (head.x == snakeCoord[i].x && head.y == snakeCoord[i].y) {
            clearInterval(gameInterval)
            alert(`GAME OVER 
               Ваш счет: ${score}`)
        }

    }
    snakeCoord.unshift(head)

}

let gameInterval = setInterval(game, 100)
function getFoodCord(num) {
    return Math.floor(Math.random() * num + 1) * box;
}



