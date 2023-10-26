const boxElements = document.querySelectorAll('[data-box]');
const container = document.querySelector("[data-container");
const messageText = document.querySelector("[data-message-text]");
const message = document.querySelector("[data-message]");
// Criar variável para o Botão de Reiniciar
const messageButton = document.querySelector("[data-message-button]");

let isCircleTurn;

// Lista
const winningCombinations = [ 
    // Listas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função começar o jogo
const startGame = () => {
    isCircleTurn = false;
    // Chama a função handleClick
    for(const box of boxElements){
        // Remove todos os elementos após o click no Botão Reiniciar
        box.classList.remove('circle');
        box.classList.remove('x');
        box.removeEventListener("click", handleClick);

        box.addEventListener("click", handleClick, { once: true }); /* Colocar um circulo ou um x*/
    }

    isCircleTurn = false;

    setBoardHoverClass();
    message.classList.remove("show-message");
};

// Função encerrar a partida, messagem de vitória ou empate
const endGame = (isDraw) => {
    if (isDraw){
        messageText.innerText = 'Empate!'
    } else {
        messageText.innerText = isCircleTurn 
        ? 'O Venceu!' 
        : 'X Venceu!';
    }
    message.classList.add("show-message");
};

// Função Verificar por Vitória
const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        // EVERY checa se a x ou circulo em todas as "casa" das possiveis vitórias
        return combination.every((index) => {
            return boxElements[index].classList.contains(currentPlayer);
        });
    });
};

// Função Verificar por Empate
const checkForDraw = () => {
    return[... boxElements].every(box => {
        return box.classList.contains('x') || box.classList.contains('circle');
    });
};

const placeMark = (box, classToAdd) => {
    box.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    container.classList.remove('circle');
    container.classList.remove('x');

    if(isCircleTurn){
        container.classList.add("circle");
    } else {
        container.classList.add("x");
    }
};

const swapTurns =  () => {
    isCircleTurn = !isCircleTurn; // Muda o elemento para o Circulo

    setBoardHoverClass();
};

const handleClick = (e) => { // Função Colocar um circulo ou um x
    // Colocar a Macar (X ou Circulo)
    const box = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x'; // Checa se é a vez do circulo ou não.

    placeMark(box, classToAdd);

    // Verificar por Vitória
    const isWin = checkForWin(classToAdd);

    // Verificar por empate
    const isDraw = checkForDraw();

    if(isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true);
    } else {
        //Mudar simbulo
        swapTurns();
    }
};

startGame();

// Botão Reiniciar
messageButton.addEventListener("click", startGame);
