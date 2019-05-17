var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var x = 50;
var y = 50;
var ballRadius = 10;
var dX = 1;
var dY = -1;
var userX = 25;
var userY = 25;
var userDim = 20;
var upPressed = false;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
    if(e.key == "Up" || e.key == "ArrowUp")
    {
        upPressed = true;
    }
    if(e.key == "Right" || e.key == "ArrowRight")
    {
        rightPressed = true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft")
    {
        leftPressed = true;
    }
    if(e.key == "Down" || e.key == "ArrowDown")
    {
        downPressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.key == "Up" || e.key == "ArrowUp")
    {
        upPressed = false;
    }
    if(e.key == "Right" || e.key == "ArrowRight")
    {
        rightPressed = false;
    }
    if(e.key == "Left" || e.key == "ArrowLeft")
    {
        leftPressed = false;
    }
    if(e.key == "Down" || e.key == "ArrowDown")
    {
        downPressed = false;
    }
}

function checkCollision() {
    if(x + dX > c.width - ballRadius || x + dX < ballRadius )
    {
        dX = -dX;
    }
    if(y + dY > c.height - ballRadius || y + dY < ballRadius)
    {
        dY = -dY;
    }

    if((userX >= x - ballRadius && userX <= x + ballRadius) || (userX + userDim >= x - ballRadius && userX + userDim <= x + ballRadius))
    {
        if(y + ballRadius + dY <= userY + userDim && y + ballRadius + dY >= userY)
        {
            dY = -dY;
        }
    }
    if((userY >= y - ballRadius && userY <= y + ballRadius) || (userY + userDim >= y - ballRadius && userY + userDim <= y + ballRadius))
    {
        if(x + ballRadius + dX <= userX + userDim && x + ballRadius + dX >= userX)
        {
            dX = -dX;
        }
    }
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#7E7F9A"
    ctx.fill();
    ctx.closePath();
}

function drawUser()
{
    ctx.beginPath();
    ctx.rect(userX, userY, userDim, userDim);
    ctx.fillStyle = "#119DA4";
    ctx.fill();
    ctx.closePath();
}

function draw()
{
    checkCollision();
    ctx.clearRect(0, 0, c.width, c.height);
    drawBall();
    drawUser();
    moveUser();
    x += dX;
    y += dY;
}

function moveUser()
{
    if(upPressed)
    {
        userY -= 5
    }
    if(downPressed)
    {
        userY += 5
    }
    if(rightPressed)
    {
        userX += 5
    }
    if(leftPressed)
    {
        userX -= 5
    }
}

setInterval(draw, 10);