var canvas = document.getElementById("miCanvas");//visualizar el elemento canvas
var ctx = canvas.getContext("2d");//variable para guardar los cambios realizados en canvas
var x = canvas.width/2;//definimos la variable x, para el movimiento
var y = canvas.height -30;
var dx = 1;
var dy = -3;
var ballRadius = 10;
var paddleHeight = 10;//alto de la paleta
var paddleWidth = 50;//ancho de la paleta
var paddleX = (canvas.width-paddleWidth)/3;
var rightPressed = false;//variables que indican si se ha pulsado algun boton
var leftPressed = false; //variables que indican si se ha pulsado algun boton
var brickRowCount = 5;
var brickColumnCount = 10;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0; //inicio del puntaje 
var bricks = [];
var lives = 3;//vidas

//creacion de los ladrillos, se le da estatus 1. Para darle el valor true, una vez q' la bola choque adquiere el estatus 0
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
        
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);//DOM evento que detecta cuando se toca una tecla
document.addEventListener("mousemove", mouseMoveHandler,false);//Evento que detecta el movimiento del mouse



function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
     } else if(e.keyCode == 37)
         {
            leftPressed = false;
        }
        
    }

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {//calcula la posicion, en el eje x, cuando x > 0 y 
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#e61313";
    ctx.fill();
    ctx.closePath();



}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
     
    ctx.fillStyle= "#71f10c";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {//estatus ==1, verdadero para que aparezca en pantalla el cuadro
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();//inicia el dibujo de los ladrillo
                ctx.rect(brickX, brickY, brickWidth, brickHeight);//en esta parte esta dibujando los ladrillos
                ctx.fillStyle = "#0095DD";//asigna el color a los ladrillos
                ctx.fill();//dibuja el ladrillo
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount*brickColumnCount) {
                        alert("Ganaste, Felicitaciones! "+score+" "+" puntos");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore()
{
    ctx.font = "16px Sans-Serif";
    ctx.fillStyle ="#470cf1";
    ctx.fillText("Puntuacion: "+score, 8,20);
}


function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#470cf1";
    ctx.fillText("Vidas: "+lives, canvas.width-65, 20);
}

function draw() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();//invoca la funcion para construir ladrillos
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius)
     {
         
        dx = -dx;
     }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) 
        {
            if(x > paddleX && x < paddleX + paddleWidth) 
            {//validacion para que solo golpee tres paredes
                dy = -dy;
            }else{
               lives--;
                    if(!lives)
           {
                alert("fuera ");
                document.location.reload();
            }
                else 
                {
                     x = canvas.width/2;
                     y = canvas.height-30;
                     dx = 2;
                     dy = -2;
                     paddleX = (canvas.width-paddleWidth)/2;
                }
    } 
}

    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);

}


draw();
