class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    setName(name) {
        this.name = name;
    }
}

class Board {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.reset();
    }

    reset() {
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    }

    isFull() {
        return this.grid.every(row => row.every(cell => cell !== null));
    }

    isColumnFull(col) {
        return this.grid[0][col] !== null;
    }
}
// Model 
class GameModel {
    constructor() {
        this.board = new Board();
        this.p1 = null;
        this.p2 = new Player('Computer', 'yellow');
        this.currP = null;
        this.isOver = false;
    }

    reset() {
        this.board.reset();
        this.p1 = null;
        this.currP = null;
        this.isOver = false;
    }

    checkWin() {
        const dirs = [
            { dr: 0, dc: 1 },  // horizontal
            { dr: 1, dc: 0 },  // vertical
            { dr: 1, dc: 1 },  // diagonal down right
            { dr: 1, dc: -1 }  // diagonal down-left
        ];

        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                const player = this.board.grid[row][col];
                if (player) {
                    for (const { dr, dc } of dirs) {
                        if (this.checkDir(row, col, dr, dc, player)) {
                            return player;
                        }
                    }
                }
            }
        }
        return null;
    }

    checkDir(row, col, dr, dc, player) {
        for (let i = 1; i < 4; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= this.board.rows || newCol < 0 || newCol >= this.board.cols || this.board.grid[newRow][newCol] !== player) {
                return false;
            }
        }
        return true;
    }

    getWinName() {
        const winColor = this.checkWin();
        if (winColor === this.p1.color) {
            return this.p1.name;
        } else if (winColor === this.p2.color) {
            return this.p2.name;
        } else {
            return null;
        }
    }
}

// View 
class View {
    constructor() {
        this.boardEl = document.getElementById('game-board');
        this.resetBtn = document.getElementById('reset-button');
        this.startBtn = document.getElementById('start-button');
        this.colorSel = document.getElementById('color-selection');
        this.p1Color = document.getElementById('player1-color');
        this.winMsg = document.getElementById('winner-message');
    }

    initBoard(rows, cols) {
        this.boardEl.innerHTML = '';
        this.boardEl.style.gridTemplateColumns = `repeat(${cols}, 60px)`;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.boardEl.appendChild(cell);
            }
        }
    }

    renderBoard(grid) {
        const cells = this.boardEl.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            cell.className = 'cell';
            if (grid[row][col]) {
                cell.classList.add(grid[row][col]);
            }
        });
    }

    showMsg(msg) {
        this.winMsg.textContent = msg;
        this.winMsg.style.display = 'block';
    }

    hideMsg() {
        this.winMsg.style.display = 'none';
    }

    showBoard() {
        this.boardEl.style.display = 'grid';
    }

    hideBoard() {
        this.boardEl.style.display = 'none';
    }

    showReset() {
        this.resetBtn.style.display = 'block';
    }

    hideReset() {
        this.resetBtn.style.display = 'none';
    }

    showColorSel() {
        this.colorSel.classList.remove('hidden');
    }

    hideColorSel() {
        this.colorSel.classList.add('hidden');
    }
}

// Controller
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.startBtn.addEventListener('click', () => this.startGame());
        this.view.resetBtn.addEventListener('click', () => this.resetGame());
        this.view.boardEl.addEventListener('click', (event) => this.cellClick(event));
    }

    startGame() {
        const p1Color = this.view.p1Color.value;
        this.model.p1 = new Player('Player 1', p1Color);
        this.model.currP = this.model.p1;
        this.view.hideColorSel();
        this.view.showBoard();
        this.view.showReset();
        this.view.hideMsg();
        this.model.board.reset();
        this.view.initBoard(this.model.board.rows, this.model.board.cols);
        this.view.renderBoard(this.model.board.grid);
    }

    resetGame() {
        this.view.showColorSel();
        this.view.hideBoard();
        this.view.hideReset();
        this.view.hideMsg();
        this.model.reset();
        this.view.renderBoard(this.model.board.grid);
    }

    cellClick(event) {
        if (this.model.isOver || !event.target.classList.contains('cell')) return;

        const col = parseInt(event.target.dataset.col, 10);
        if (this.model.board.isColumnFull(col)) return;

        const move = this.dropChip(col);
        if (move) {
            this.view.renderBoard(this.model.board.grid);
            const winner = this.model.checkWin();
            if (winner) {
                this.view.showMsg(`${this.model.getWinName()}: ${winner.toUpperCase()} wins!`);
                this.model.isOver = true;
                return;
            }
            if (this.model.board.isFull()) {
                this.view.showMsg('It\'s a draw!');
                this.model.isOver = true;
                return;
            }
            this.switchPlayer();
        }
    }

    dropChip(col) {
        for (let row = this.model.board.rows - 1; row >= 0; row--) {
            if (!this.model.board.grid[row][col]) {
                this.model.board.grid[row][col] = this.model.currP.color;
                return { row, col };
            }
        }
        return null;
    }

    switchPlayer() {
        this.model.currP = this.model.currP === this.model.p1 ? this.model.p2 : this.model.p1;
        if (this.model.currP === this.model.p2) {
            setTimeout(() => this.computerMove(), 850);
        }
    }

    computerMove() {
        if (this.model.isOver) return;
        let col = this.cTurn(); // get computer's col choice
        this.dropChip(col);
        this.view.renderBoard(this.model.board.grid);
        const winner = this.model.checkWin();
        if (winner) {
            this.view.showMsg(`${this.model.p2.name}: ${winner.toUpperCase()} wins!`);
            this.model.isOver = true;
            return;
        }
        if (this.model.board.isFull()) {
            this.view.showMsg('It\'s a draw!');
            this.model.isOver = true;
            return;
        }
        this.switchPlayer();
    }

    cTurn() {
        const mode = 4;
        for (let i = (mode - 1); i > 1; i--) {
            if (this.checkH(i) !== -1) {
                return this.checkH(i);
            }
            if (this.checkV(i) !== -1) {
                return this.checkV(i);
            }
            if (this.checkD(i) !== -1) {
                return this.checkD(i);
            }
        }
        return (this.rTurn());
    }

    rTurn() {
        let column = 0;
        let valid = false;
        do {
            column = Math.floor(Math.random() * 7);
            if (!this.model.board.isColumnFull(column)) {
                valid = true;
            }
        } while (!valid);
        return column;
    }

    checkH(num) {
        let tracker = 1;
        const rows = this.model.board.rows;
        const cols = this.model.board.cols;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (j < cols - 1 && this.model.board.grid[i][j] === this.model.board.grid[i][j + 1] && this.model.board.grid[i][j] !== null) {
                    if (tracker === 1) {
                        var begin = j;
                    }
                    tracker++;
                    if (tracker === num) {
                        var end = j + 1;
                        if (i < rows - 1 && this.model.board.grid[i][begin - 1] === null && this.model.board.grid[i + 1][begin - 1] !== null) {
                            return begin;
                        }
                        if (i < rows - 1 && this.model.board.grid[i][end + 1] === null && this.model.board.grid[i + 1][end + 1] !== null) {
                            return end + 1;
                        }
                        if (i === rows - 1 && this.model.board.grid[i][begin - 1] === null) {
                            return begin;
                        }
                        if (i === rows - 1 && this.model.board.grid[i][end + 1] === null) {
                            return end + 1;
                        }
                    }
                } else {
                    tracker = 1;
                }
            }
        }
        return -1;
    }

    checkV(num) {
        let tracker = 1;
        const rows = this.model.board.rows;
        const cols = this.model.board.cols;
        for (let j = 0; j < cols; j++) {
            for (let i = rows - 1; i > 0; i--) {
                for (let k = 1; k < 4 && i - k >= 0; k++) {
                    if (this.model.board.grid[0][j] === null) {
                        if (this.model.board.grid[i][j] !== null && this.model.board.grid[i][j] === this.model.board.grid[i - k][j] && i - k < rows) {
                            tracker++;
                            if (tracker === num && this.model.board.grid[i - num][j] === null) {
                                return j;
                            }
                        }
                    }
                }
                tracker = 1;
            }
        }
        return -1;
    }

    checkD(num) {
        let tracker = 1;
        const rows = this.model.board.rows;
        const cols = this.model.board.cols;
        const mode = 4;
        for (let i = rows - 1; i >= mode; i--) {
            for (let j = 0; j < i; j++) {
                if (this.model.board.grid[i - j][j] === this.model.board.grid[i - (j + 1)][j + 1] && this.model.board.grid[i - j][j] !== null) {
                    tracker++;
                    if (tracker === num) {
                        if (i - j - 2 >= 0 && j + 1 < cols) {
                            if (this.model.board.grid[i - j - 2][j + 2] === null && this.model.board.grid[i - j - 1][j + 2] !== null) {
                                return j + 2;
                            }
                        }
                        if (i - j + (num - 1) < rows - 1 && j - (num - 1) >= 0) {
                            if (this.model.board.grid[i - j + (num - 1)][j - (num - 1)] === null && this.model.board.grid[i - j + num][j - (num - 1)] !== null) {
                                return j - (num - 1);
                            }
                        }
                        if (i - j + (num - 1) === rows - 1 && j - (num - 1) >= 0) {
                            if (this.model.board.grid[i - j + (num - 1)][j - (num - 1)] === null) {
                                return j - (num - 1);
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
                if (this.model.board.grid[i - k][j + k] !== null && this.model.board.grid[i - k][j + k] === this.model.board.grid[i - (k + 1)][j + k + 1]) {
                    tracker++;
                    if (tracker === num) {
                        if (i - (k + 2) >= 0 && j + k + 2 <= cols - 1) {
                            if (this.model.board.grid[i - (k + 2)][j + k + 2] === null && this.model.board.grid[i - (k + 1)][j + k + 2] !== null) {
                                return j + k + 2;
                            }
                        }
                        if (i - k + (num - 1) < rows - 2 && j + k - (num - 1) > 0) {
                            if (this.model.board.grid[i + (num - 1)][j - (num - 1)] === null && this.model.board.grid[i + num][j - (num - 1)] !== null) {
                                return j + k - (num - 1);
                            }
                        }
                        if (i - k + (num - 1) === rows - 1 && j + k - (num - 1) > 0) {
                            if (this.model.board.grid[i - k + (num - 1)][j + k - (num - 1)] === null) {
                                return j + k - (num - 1);
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
                if (this.model.board.grid[k][j + k] === this.model.board.grid[k + 1][j + k + 1] && this.model.board.grid[k][j + k] !== null) {
                    tracker++;
                    if (tracker === num) {
                        if (k + 2 < rows - 1 && j + k + 2 < cols - 1) {
                            if (this.model.board.grid[k + 2][j + k + 2] === null && this.model.board.grid[k + 3][j + k + 2] !== null) {
                                return j + k + 1;
                            }
                        }
                        if (k + 2 === rows - 1) {
                            if (this.model.board.grid[k + 2][j + k + 2] === null) {
                                return j + k + 1;
                            }
                        }
                        if (k - (mode - 2) >= 0 && j + k - (mode - 2) > 0) {
                            if (this.model.board.grid[k - (num - 1)][j + k - (num - 1)] === null && this.model.board.grid[k - (num - 1) + 1][j + k - (num - 1)] !== null) {
                                return j + k - (num - 1);
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
                if (this.model.board.grid[i + k][k] === this.model.board.grid[i + k + 1][k + 1] && this.model.board.grid[i + k][k] !== null) {
                    tracker++;
                    if (tracker === num) {
                        if (i + k + 2 < rows - 1 && k + 2 < cols - 1) {
                            if (this.model.board.grid[i + k + 2][k + 2] === null && this.model.board.grid[i + k + 3][k + 2] !== null) {
                                return k + 1;
                            }
                        }
                        if (i + k + 2 === rows - 1 && k + 2 < cols - 1) {
                            if (this.model.board.grid[i + k + 2][k + 2] === null) {
                                return k + 1;
                            }
                        }
                        if (i + k - (num - 1) >= 0 && k - (num - 1) >= 0 && i + k - (num - 1) + 1 < rows - 1) {
                            if (this.model.board.grid[i + k - (num - 1)][k - (num - 1)] === null && this.model.board.grid[i + k - (num - 1) + 1][k - (num - 1)] !== null) {
                                return k - (num - 1);
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
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    const model = new GameModel();
    const view = new View();
    new Controller(model, view);
});
