const rows = 6;
const columns = 7;
let board = [];
let currentPlayer = null;
let player1Color = '';
let player2Color = 'yellow';  // Default color for the computer player
let isGameOver = false;

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const startButton = document.getElementById('start-button');
const colorSelection = document.getElementById('color-selection');
const player1ColorSelect = document.getElementById('player1-color');
const winMessage = document.getElementById('winner-message');

class Board {
    constructor() {
        this.rows = 6;
        this.cols = 7;
        this.board = new Array(this.rows);

        for (let i = 0; i < this.rows; i++) {
            this.board[i] = new Array(this.cols).fill(' ');
        }
    }
}

const b = new Board();

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
    player1Color = player1ColorSelect.value;

    currentPlayer = player1Color;
    colorSelection.classList.add('hidden');
    gameBoard.style.display = 'grid';
    resetButton.style.display = 'block';
    winMessage.style.display = 'none';
    createBoard();
}

function resetGame() {
    colorSelection.classList.remove('hidden');
    gameBoard.style.display = 'none';
    resetButton.style.display = 'none';
    winMessage.style.display = 'none';
    isGameOver = false;
    createBoard();
}

function createBoard() {
    board = Array.from({ length: rows }, () => Array(columns).fill(null));
    b.board = Array.from({ length: rows }, () => Array(columns).fill(' '));
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (isGameOver) return;

    const col = event.target.dataset.col;
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            b.board[row][col] = currentPlayer === player1Color ? 'P' : 'C'; // Mark player move in custom board
            renderBoard();
            const winner = getWinner();
            if (winner) {
                displayWinner(winner.player);
                isGameOver = true;
                return;
            }
            if (isBoardFull()) {
                displayWinner(null);
                isGameOver = true;
                return;
            }
            switchPlayer();
            return;
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1Color ? player2Color : player1Color;
    if (currentPlayer === player2Color) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (isGameOver) return;

    let col = cTurn();
    col--; // Adjust for 0-based indexing
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = player2Color;
            b.board[row][col] = 'C'; // Mark computer move in custom board
            break;
        }
    }
    renderBoard();
    const winner = getWinner();
    if (winner) {
        displayWinner(winner.player);
        isGameOver = true;
        return;
    }
    if (isBoardFull()) {
        displayWinner(null);
        isGameOver = true;
        return;
    }
    switchPlayer();
}

function cTurn() {
    const mode = 4;
    for (let i = (mode - 1); i > 1; i--) {
        if (checkH(i) !== -1) {
            return checkH(i);
        }
        if (checkV(i) !== -1) {
            return checkV(i);
        }
        if (checkD(i) !== -1) {
            return checkD(i);
        }
    }
    return (rTurn());
}

function rTurn() {
    let column = 0;
    let valid = false;
    do {
        column = Math.floor(Math.random() * 7);
        if (b.board[0][column] !== ' ') {
            valid = false;
        } else {
            valid = true;
        }
    } while (!valid);
    return column + 1;
}

function checkH(num) {
    let tracker = 1;
    const rows = b.rows;
    const cols = b.cols;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (j < cols - 1 && b.board[i][j] === b.board[i][j + 1] && b.board[i][j] !== ' ') {
                if (tracker === 1) {
                    begin = j;
                }
                tracker++;
                if (tracker === num) {
                    end = j + 1;
                    if (i < rows - 1 && b.board[i][begin - 1] === ' ' && b.board[i + 1][begin - 1] !== ' ') {
                        return begin;
                    }
                    if (i < rows - 1 && b.board[i][end + 1] === ' ' && b.board[i + 1][end + 1] !== ' ') {
                        return end + 2;
                    }
                    if (i === rows - 1 && b.board[i][begin - 1] === ' ') {
                        return begin;
                    }
                    if (i === rows - 1 && b.board[i][end + 1] === ' ') {
                        return end + 2;
                    }
                }
            } else {
                tracker = 1;
            }
        }
    }
    return -1;
}

function checkV(num) {
    let tracker = 1;
    const rows = b.rows;
    const cols = b.cols;
    for (let j = 0; j < cols; j++) {
        for (let i = rows - 1; i > 0; i--) {
            for (let k = 1; k < 4 && i - k >= 0; k++) {
                if (b.board[0][j] === ' ') {
                    if (b.board[i][j] !== ' ' && b.board[i][j] === b.board[i - k][j] && i - k < rows) {
                        tracker++;
                        if (tracker === num && b.board[i - num][j] === ' ') {
                            return j + 1;
                        }
                    }
                }
            }
            tracker = 1;
        }
    }
    return -1;
}

function checkD(num) {
    let tracker = 1;
    let left = 0;
    let right = 0;
    const rows = b.rows;
    const cols = b.cols;
    const mode = 4;
    for (let i = rows - 1; i >= mode; i--) {
        for (let j = 0; j < i; j++) {
            if (b.board[i - j][j] === b.board[i - (j + 1)][j + 1] && b.board[i - j][j] !== ' ') {
                tracker++;
                if (tracker === num) {
                    if (i - j - 2 >= 0 && j + 1 < cols) {
                        if (b.board[i - j - 2][j + 2] === ' ' && b.board[i - j - 1][j + 2] !== ' ') {
                            return j + 2 + 1;
                        }
                    }
                    if (i - j + (num - 1) < rows - 1 && j - (num - 1) >= 0) {
                        if (b.board[i - j + (num - 1)][j - (num - 1)] === ' ' && b.board[i - j + num][j - (num - 1)] !== ' ') {
                            return j - (num - 1) + 1;
                        }
                    }
                    if (i - j + (num - 1) === rows - 1 && j - (num - 1) >= 0) {
                        if (b.board[i - j + (num - 1)][j - (num - 1)] === ' ') {
                            return j - (num - 1) + 1;
                        }
                    }
                }
            } else {
                tracker = 1;
            }
        }
    }
    for (let j = 1; j < cols - 1; j++) {
        let i = rows - 1;
        for (let k = 0; j + k < cols - 1; k++) {
            if (b.board[i - k][j + k] !== ' ' && b.board[i - k][j + k] === b.board[i - (k + 1)][j + k + 1]) {
                tracker++;
                if (tracker === num) {
                    if (i - (k + 2) >= 0 && j + k + 2 <= cols - 1) {
                        if (b.board[i - (k + 2)][j + k + 2] === ' ' && b.board[i - (k + 1)][j + k + 2] !== ' ') {
                            return j + k + 3;
                        }
                    }
                    if (i - k + (num - 1) < rows - 2 && j + k - (num - 1) > 0) {
                        if (b.board[i + (num - 1)][j - (num - 1)] === ' ' && b.board[i + num][j - (num - 1)] !== ' ') {
                            return j + k - (num - 1) + 1;
                        }
                    }
                    if (i - k + (num - 1) === rows - 1 && j + k - (num - 1) > 0) {
                        if (b.board[i - k + (num - 1)][j + k - (num - 1)] === ' ') {
                            return j + k - (num - 1) + 1;
                        }
                    }
                }
            } else {
                tracker = 1;
            }
        }
    }
    for (let j = 1; j < cols - 1; j++) {
        for (let k = 0; j + k < cols - 1; k++) {
            if (b.board[k][j + k] === b.board[k + 1][j + k + 1] && b.board[k][j + k] !== ' ') {
                tracker++;
                if (tracker === num) {
                    if (k + 2 < rows - 1 && j + k + 2 < cols - 1) {
                        if (b.board[k + 2][j + k + 2] === ' ' && b.board[k + 3][j + k + 2] !== ' ') {
                            return j + k + 2 + 1;
                        }
                    }
                    if (k + 2 === rows - 1) {
                        if (b.board[k + 2][j + k + 2] === ' ') {
                            return j + k + 2 + 1;
                        }
                    }
                    if (k - (mode - 2) >= 0 && j + k - (mode - 2) > 0) {
                        if (b.board[k - (num - 1)][j + k - (num - 1)] === ' ' && b.board[k - (num - 1) + 1][j + k - (num - 1)] !== ' ') {
                            return j + k - (num - 1) + 1;
                        }
                    }
                }
            } else {
                tracker = 1;
            }
        }
    }
    for (let i = 0; i < rows - 1; i++) {
        for (let k = 0; k + i < rows - 1; k++) {
            if (b.board[i + k][k] === b.board[i + k + 1][k + 1] && b.board[i + k][k] !== ' ') {
                tracker++;
                if (tracker === num) {
                    if (i + k + 2 < rows - 1 && k + 2 < cols - 1) {
                        if (b.board[i + k + 2][k + 2] === ' ' && b.board[i + k + 3][k + 2] !== ' ') {
                            return k + 2 + 1;
                        }
                    }
                    if (i + k + 2 === rows - 1 && k + 2 < cols - 1) {
                        if (b.board[i + k + 2][k + 2] === ' ') {
                            return k + 2 + 1;
                        }
                    }
                    if (i + k - (num - 1) >= 0 && k - (num - 1) >= 0 && i + k - (num - 1) + 1 < rows - 1) {
                        if (b.board[i + k - (num - 1)][k - (num - 1)] === ' ' && b.board[i + k - (num - 1) + 1][k - (num - 1)] !== ' ') {
                            return k - (num - 1) + 1;
                        }
                    }
                }
            } else {
                tracker = 1;
            }
        }
    }
    return -1;
}

function isBoardFull() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (board[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}

function getWinner() {
    const directions = [
        { dr: 0, dc: 1 }, // horizontal
        { dr: 1, dc: 0 }, // vertical
        { dr: 1, dc: 1 }, // diagonal down-right
        { dr: 1, dc: -1 } // diagonal down-left
    ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const player = board[row][col];
            if (player) {
                for (const { dr, dc } of directions) {
                    const line = [{ row, col }];
                    for (let i = 1; i < 4; i++) {
                        const newRow = row + dr * i;
                        const newCol = col + dc * i;
                        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns || board[newRow][newCol] !== player) {
                            break;
                        }
                        line.push({ row: newRow, col: newCol });
                    }
                    if (line.length === 4) {
                        return { player };
                    }
                }
            }
        }
    }
    return null;
}

function getPlayerName(playerColor) {
    return playerColor === player1Color ? 'Player 1' : 'Computer';
}

function displayWinner(winner) {
    if (winner) {
        const playerName = getPlayerName(winner);
        winMessage.textContent = `${playerName}: ${winner.toUpperCase()} wins!`;
    } else {
        winMessage.textContent = 'It\'s a draw!';
    }
    winMessage.style.display = 'block';
}

createBoard();


