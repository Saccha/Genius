let order = [];
let clickedOrder = [];
let score = 0;

/**
 * Cores:
 * 0 = verde; 1 = vermelho; 2 = amarelo; 3 = azul;
 */

const blue = document.querySelector(".blueBtn");
const red = document.querySelector(".redBtn");
const green = document.querySelector(".greenBtn");
const yellow = document.querySelector(".yellowBtn");

// Gera a ordem aleatória para a rodada.
const generateRandomOrder = () => {
    // Gera números aleatórios de [0-3]
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
};

// Demonstra feedback visual de clique no botão.
const lightColor = (element, number) => {
    number = number * 500;

    setTimeout(() => {
        element.classList.add("selected");
    }, number - 250);

    setTimeout(() => {
        element.classList.remove("selected");
    }, number);
};

// Verifica condições de vitória: Ordem dos botões apertadas é a esperada.
const checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            loseRound();
            break;
        }
    }

    if (clickedOrder.length === order.length) {
        alert(`Score: ${score}\nYou got it right!\nStarting the next round!`);
        nextRound();
    }
};

// Gerencia clique do usuário
const clickButton = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add("selected");

    setTimeout(() => {
        createColorElement(color).classList.remove("selected");
        checkOrder();
    }, 250);
};

// Retorna os elementos de cores
const createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else {
        return blue;
    }
};

// Cria a próxima rodada.
const nextRound = () => {
    score++;
    generateRandomOrder();
};

// Game Over - Fim de jogo.
const loseRound = () => {
    alert(`Score: ${score}\nGame Over! The game will now restart.`);
    order = [];
    clickedOrder = [];
    beginGame();
};

// Início de jogo.
const beginGame = () => {
    score = 0;
    alert("Welcome to Genesis.\nThe game shall start now.\nGood luck!");
    nextRound();
};

// Funções que registram os cliques do jogo.
// green.addEventListener("click", clickButton(0));
// red.addEventListener("click", clickButton(1));
// yellow.addEventListener("click", clickButton(2));
// blue.addEventListener("click", clickButton(3));

green.onclick = () => clickButton(0);
red.onclick = () => clickButton(1);
yellow.onclick = () => clickButton(2);
blue.onclick = () => clickButton(3);

// Inicia o jogo pela chamada de método.
beginGame();