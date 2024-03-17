document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resultScreen = document.getElementById("result-screen");
    const resultMessage = document.getElementById("result-message");
    const newGameBtn = document.getElementById("new-game-btn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkDraw = () => {
        return !gameBoard.includes("");
    };

    const showResultScreen = (result) => {
        resultMessage.innerText = result;
        resultScreen.style.display = "flex";
    };

    const handleClick = (index) => {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].innerText = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                showResultScreen(`${winner} wins!`);
                gameActive = false;
            } else if (checkDraw()) {
                showResultScreen("It's a draw!");
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.innerText = `${currentPlayer}'s turn`;
            }
        }
    };

    const startNewGame = () => {
        resultScreen.style.display = "none";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => (cell.innerText = ""));
        currentPlayer = "X";
        gameActive = true;
        message.innerText = `${currentPlayer}'s turn`;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleClick(index));
    });

    newGameBtn.addEventListener("click", startNewGame);
});
