
//variaveis básicas de jogo
let canvas = document.getElementById("snake");
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// direção para andar
let direction = "rigth";

// variaveis para comida aleatoria.
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//craidno backgroud na cor verde claro
function criarBG(){
    context.fillStyle = "green";
    context.fillRect(0, 0, 16 * box, 16 * box);

}

//criando personagem
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "lightgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//criando comida
function drawfood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//eventos de teclado
document.addEventListener('keydown', update);

//capturando eventos de teclado
function update(event){
    if(event.keyCode === 37 && direction !== "right") direction = "left";
    if(event.keyCode === 38 && direction !== "down") direction = "up";
    if(event.keyCode === 39 && direction !== "left") direction = "right";
    if(event.keyCode === 40 && direction !== "up") direction = "down";
}

//inciação do jogo
function iniciarJogo(){

    //comparando se o personagem se colide com o próprio corpo
    for(i = 1; i < snake.length; i++ ){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y ){
            clearInterval(jogo);
            alert("Game Over ;(  Reinicie a pagina para jogar novamente")
        }
    }

    //direção do jogo
    if(snake[0].x > 15 * box && direction === "right" ) snake[0].x = 0;
    if(snake[0].x < 0 && direction === "left" ) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction === "down" ) snake[0].y = 0;
    if(snake[0].y < 0 && direction === "up" ) snake[0].y = 16 * box;


    //criação de tela/ personagem/ comida
    criarBG();
    criarCobrinha();
    drawfood();

    //posição
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //referenciando posição
    if(direction === "right") snakeX += box;
    if(direction === "left") snakeX -= box;
    if(direction === "up") snakeY -= box;
    if(direction === "down") snakeY += box;

    //aumentando tamanho do personagem
    if(snakeX !== food.x || snakeY !== food.y){
        snake.pop();
    }
    //aleatoriedade de comida
    else{ food.x =  Math.floor(Math.random() * 15 + 1) * box;
         food.y = Math.floor(Math.random() * 15 + 1) * box;
    } 
    //elemento para aumentar tamanho de personagem
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    //novo tamnho
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo,100);

