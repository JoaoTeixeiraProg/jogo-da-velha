const boxElements = document.querySelectorAll('[data-box]');
const container = document.querySelector("[data-container");
const messageText = document.querySelector("[data-message-text]");
const message = document.querySelector("[data-message]");
const messageButton = document.querySelector("[data-message-button]");

let isCircleTurn;


const winningCombinations = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const startGame = () => {
    isCircleTurn = false;
    for(const box of boxElements){
        box.classList.remove('circle');
        box.classList.remove('x');
        box.removeEventListener("click", handleClick);

        box.addEventListener("click", handleClick, { once: true }); 
    }

    isCircleTurn = false;

    setBoardHoverClass();
    message.classList.remove("show-message");
};

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

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return boxElements[index].classList.contains(currentPlayer);
        });
    });
};

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
    isCircleTurn = !isCircleTurn; 

    setBoardHoverClass();
};

const handleClick = (e) => { 
    const box = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x'; 

    placeMark(box, classToAdd);

    const isWin = checkForWin(classToAdd);

    const isDraw = checkForDraw();

    if(isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true);
    } else {
        swapTurns();
    }
};

startGame();

messageButton.addEventListener("click", startGame);

function back() {
    window.location.href = "https://joaoteixeiraprog.github.io/portfolio/"; 
}
