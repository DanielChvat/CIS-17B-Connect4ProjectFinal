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
    constructor(rows, cols) {
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

    removeChip(row, col) {
        this.grid[row][col] = null;
    }
}

// The Model
class GameModel {
    constructor(rows, cols) {
        this.board = new Board(rows, cols);
        this.player1 = new Player('Player 1', '');
        this.player2 = new Player('Computer', 'yellow');
        this.currentPlayer = this.player1;
        this.isGameOver = false;
        this.moveHistory = [];
    }

    resetGame() {
        this.board.reset();
        this.currentPlayer = this.player1;
        this.isGameOver = false;
        this.moveHistory = [];
        localStorage.clear(); // clear local storage before saving initial state
        this.saveState();
         
        
    }

    dropChip(col) {
        const color = this.currentPlayer.color;
        for (let row = this.board.rows - 1; row >= 0; row--) {
            if (!this.board.grid[row][col]) {
                this.board.grid[row][col] = color;
                this.moveHistory.push({ row, col, player: this.currentPlayer });
                this.saveState();
                return { row, col, color };
            }
        }
        return null;
    }

    undoMove() {
        if (this.moveHistory.length < 2) return null;

        const lastMove = this.moveHistory.pop();
        this.board.removeChip(lastMove.row, lastMove.col);

        const secondLastMove = this.moveHistory.pop();
        this.board.removeChip(secondLastMove.row, secondLastMove.col);

        // default to player 1
        this.currentPlayer = this.player1;
        this.saveState();
        return { lastMove, secondLastMove };
    }

    saveState() {
        const state = {
            board: this.board.grid,
            currentPlayer: this.currentPlayer === this.player1 ? 'player1' : 'player2',
            moveHistory: this.moveHistory
        };
        localStorage.setItem('connect4State', JSON.stringify(state));
    }

    loadState() {
        const state = JSON.parse(localStorage.getItem('connect4State'));
        if (state) {
            this.board.grid = state.board;
            this.currentPlayer = state.currentPlayer === 'player1' ? this.player1 : this.player2;
            this.moveHistory = state.moveHistory;
        }
    }

    checkWin() {
        const directions = [
            { dr: 0, dc: 1 }, // horizontal
            { dr: 1, dc: 0 }, // vertical
            { dr: 1, dc: 1 }, // diagonal down-right
            { dr: 1, dc: -1 } // diagonal down-left
        ];

        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                const player = this.board.grid[row][col];
                if (player) {
                    for (const { dr, dc } of directions) {
                        const line = [{ row, col }];
                        for (let i = 1; i < 4; i++) {
                            const newRow = row + dr * i;
                            const newCol = col + dc * i;
                            if (newRow < 0 || newRow >= this.board.rows || newCol < 0 || newCol >= this.board.cols || this.board.grid[newRow][newCol] !== player) {
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

    isBoardFull() {
        return this.board.grid.every(row => row.every(cell => cell !== null));
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;

        // if (!this.model.checkWin()) {
        //     if (this.model.currP === this.model.p1) {
        //         document.querySelector('.turns-container .container-com').style.boxShadow = "none";
        //         document.querySelector('.turns-container .container-player').style.boxShadow = "0 0 5px 10px #8200ce inset";
                
        //     } else  {
        //         document.querySelector('.turns-container .container-player').style.boxShadow = "none";
        //         document.querySelector('.turns-container .container-com').style.boxShadow = "0 0 5px 10px #003ba9 inset";
        //     }
        // }
    }
}

// The View
class View {
    constructor() {
        this.boardEl = document.getElementById('game-board');
        this.resetBtn = document.getElementById('reset-button');
        this.startBtn = document.getElementById('start-button');
        this.undoBtn = document.getElementById('undo-button');
        this.colorSel = document.getElementById('color-selection');
        this.p1Color = document.getElementById('player1-color');
        this.winMsg = document.getElementById('winner-message');

        
        this.turnView = document.getElementById('turns-container');
        this.playerTurn = document.querySelector('#turns-container .container-player');
        this.compTurn =  document.querySelector('#turns-container .container-com');

       
    }

    initBoard(rows, cols) {
        this.boardEl.innerHTML = '';
        this.boardEl.style.marginTop = '100px';
        this.boardEl.style.marginBottom = '20px';
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
        this.winMsg.style.fontSize = '30px';


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

    showUndo() {
        this.undoBtn.style.display = 'block';
    }

    hideUndo() {
        this.undoBtn.style.display = 'none';
    }

    showColorSel() {
        this.colorSel.classList.remove('hidden');
    }

    hideColorSel() {
        this.colorSel.classList.add('hidden');
    }
}


// The Controller
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.startBtn.addEventListener('click', () => this.startGame());
        this.view.resetBtn.addEventListener('click', () => this.resetGame());
        this.view.undoBtn.addEventListener('click', () => this.undoMove());
        this.view.boardEl.addEventListener('click', (event) => this.cellClick(event));
    }
    
    
    
    
    startGame() {
        
        
        
        
        this.model.player1.color = this.view.p1Color.value;
        this.model.player1.setName('Player 1');
        this.model.currentPlayer = this.model.player1;
        this.view.hideColorSel();
        this.view.showBoard();
        this.view.showReset();
        this.view.showUndo();
        this.view.hideMsg();
        this.model.resetGame();
        this.view.initBoard(this.model.board.rows, this.model.board.cols);
        this.view.renderBoard(this.model.board.grid);

        this.view.turnView.style.display = 'block';
        this.view.playerTurn.style.boxShadow = "0 0 5px 10px #8200ce inset";
        this.view.compTurn.style.boxShadow = "none";
    }

    resetGame() {
        this.view.showColorSel();
        this.view.hideBoard();
        this.view.hideReset();
        this.view.hideUndo();
        this.view.hideMsg();
        this.model.resetGame();
        this.view.renderBoard(this.model.board.grid);
        
    }

    cellClick(event) {
        if (this.model.isGameOver || !event.target.classList.contains('cell')) return;

        const col = parseInt(event.target.dataset.col, 10);
        if (this.model.board.isColumnFull(col)) return;

        const move = this.model.dropChip(col);
        if (move) {
            this.view.renderBoard(this.model.board.grid);
            const winner = this.model.checkWin();
            if (winner) {
                this.view.showMsg(`${this.model.currentPlayer.name} wins!`);
                sendWinner(this.model.currentPlayer.name);
                this.model.isGameOver = true;
                return;
            } else {
                this.view.playerTurn.style.boxShadow = "none";
                this.view.compTurn.style.boxShadow = "0 0 5px 10px #003ba9 inset";
            }
            if (this.model.isBoardFull()) {
                this.view.showMsg('It\'s a draw!');
                this.model.isGameOver = true;
                return;
            }
           
         
            this.model.switchPlayer();
            if (this.model.currentPlayer === this.model.player2) {
                setTimeout(() => this.computerMove(), 1000);
            }
        }
    }

    undoMove() {
        if (this.model.isGameOver) return;

        const lastMoves = this.model.undoMove();
        if (lastMoves) {
            this.view.renderBoard(this.model.board.grid);
            this.view.hideMsg();
            this.model.currentPlayer = this.model.player1; // next player is Player 1
        }
    }

    computerMove() {
        if (this.model.isGameOver) return;

        let col = this.cTurn();
        col--;
        const move = this.model.dropChip(col);
        if (move) {
            this.view.renderBoard(this.model.board.grid);
            const winner = this.model.checkWin();
            if (winner) {
                this.view.showMsg(`${this.model.currentPlayer.name}: wins!`);
                sendWinner(this.model.currentPlayer.name);
                this.model.isGameOver = true;
                return;
            } else {
                this.view.compTurn.style.boxShadow = "none";
                this.view.playerTurn.style.boxShadow =  "0 0 5px 10px #8200ce inset";
            }
            if (this.model.isBoardFull()) {
                this.view.showMsg('It\'s a draw!');
                this.model.isGameOver = true;
                return;
            }
            this.model.switchPlayer();
        }
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
            column = Math.floor(Math.random() * this.model.board.cols);
            if (!this.model.board.isColumnFull(column)) {
                valid = true;
            }
        } while (!valid);
        return column + 1;
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
                            return end + 2;
                        }
                        if (i === rows - 1 && this.model.board.grid[i][begin - 1] === null) {
                            return begin;
                        }
                        if (i === rows - 1 && this.model.board.grid[i][end + 1] === null) {
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

    checkD(num) {
        let tracker = 1;
        let left = 0;
        let right = 0;
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
                                return j + 2 + 1;
                            }
                        }
                        if (i - j + (num - 1) < rows - 1 && j - (num - 1) >= 0) {
                            if (this.model.board.grid[i - j + (num - 1)][j - (num - 1)] === null && this.model.board.grid[i - j + num][j - (num - 1)] !== null) {
                                return j - (num - 1) + 1;
                            }
                        }
                        if (i - j + (num - 1) === rows - 1 && j - (num - 1) >= 0) {
                            if (this.model.board.grid[i - j + (num - 1)][j - (num - 1)] === null) {
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
                if (this.model.board.grid[i - k][j + k] !== null && this.model.board.grid[i - k][j + k] === this.model.board.grid[i - (k + 1)][j + k + 1]) {
                    tracker++;
                    if (tracker === num) {
                        if (i - (k + 2) >= 0 && j + k + 2 <= cols - 1) {
                            if (this.model.board.grid[i - (k + 2)][j + k + 2] === null && this.model.board.grid[i - (k + 1)][j + k + 2] !== null) {
                                return j + k + 3;
                            }
                        }
                        if (i - k + (num - 1) < rows - 2 && j + k - (num - 1) > 0) {
                            if (this.model.board.grid[i + (num - 1)][j - (num - 1)] === null && this.model.board.grid[i + num][j - (num - 1)] !== null) {
                                return j + k - (num - 1) + 1;
                            }
                        }
                        if (i - k + (num - 1) === rows - 1 && j + k - (num - 1) > 0) {
                            if (this.model.board.grid[i - k + (num - 1)][j + k - (num - 1)] === null) {
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
                if (this.model.board.grid[k][j + k] === this.model.board.grid[k + 1][j + k + 1] && this.model.board.grid[k][j + k] !== null) {
                    tracker++;
                    if (tracker === num) {
                        if (k + 2 < rows - 1 && j + k + 2 < cols - 1) {
                            if (this.model.board.grid[k + 2][j + k + 2] === null && this.model.board.grid[k + 3][j + k + 2] !== null) {
                                return j + k + 2 + 1;
                            }
                        }
                        if (k + 2 === rows - 1) {
                            if (this.model.board.grid[k + 2][j + k + 2] === null) {
                                return j + k + 2 + 1;
                            }
                        }
                        if (k - (mode - 2) >= 0 && j + k - (mode - 2) > 0) {
                            if (this.model.board.grid[k - (num - 1)][j + k - (num - 1)] === null && this.model.board.grid[k - (num - 1) + 1][j + k - (num - 1)] !== null) {
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
                if (this.model.board.grid[i + k][k] === this.model.board.grid[i + k + 1][k + 1] && this.model.board.grid[i + k][k] !== null) {
                    tracker++;
                    if (tracker === num) {
                        if (i + k + 2 < rows - 1 && k + 2 < cols - 1) {
                            if (this.model.board.grid[i + k + 2][k + 2] === null && this.model.board.grid[i + k + 3][k + 2] !== null) {
                                return k + 2 + 1;
                            }
                        }
                        if (i + k + 2 === rows - 1 && k + 2 < cols - 1) {
                            if (this.model.board.grid[i + k + 2][k + 2] === null) {
                                return k + 2 + 1;
                            }
                        }
                        if (i + k - (num - 1) >= 0 && k - (num - 1) >= 0 && i + k - (num - 1) + 1 < rows - 1) {
                            if (this.model.board.grid[i + k - (num - 1)][k - (num - 1)] === null && this.model.board.grid[i + k - (num - 1) + 1][k - (num - 1)] !== null) {
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

    getPlayerName(player) {
        return player === this.model.player1.color ? this.model.player1.name : this.model.player2.name;
    }

    displayWinner(winner) {
        console.log("ran");
        if (winner) {
            const playerName = this.getPlayerName(winner);
            this.view.showMsg(`${playerName} Wins!`);
        } else {
            this.view.showMsg('It\'s a draw!');
        }
    }
}

function sendWinner(winner){
    $.ajax({
        
        type: "POST",
        url: 'game.php',
        data: {action: 'sendWinner', data: winner},
        success: function() {
           console.log("Wins updated");

        },
        
        error: function(xhr, status, error) {
            console.error('Error:', error);
            
            
        }
       
    });
    
    

}


document.addEventListener('DOMContentLoaded', () => {
    const rows = 6;
    const columns = 7;
    const model = new GameModel(rows, columns);
    localStorage.clear(); // clear local storage before saving initial state
    model.loadState(); 
    const view = new View();
    new Controller(model, view);
    view.renderBoard(model.board.grid); 
    
}); 