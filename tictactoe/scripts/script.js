const minPossibleCellId = 1;
const maxPossibleCellId = 9;
const markX = 'X';
const markO = 'O';

class Player {
    constructor() {
        // marks are X and O    
        this.mark = "";
        this.score = 0;
        this.moves = [];
        // Win combinations
        this.winMoves = [[1, 5, 9], [3, 5, 7],
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9]
        ];
    }

    setMark(mark) {
        this.mark = mark;
    }

    getMark() {
        return this.mark;
    }

    incrementScore() {
        this.score++;
    }

    getScore() {
        return this.score;
    }

    addMove(move) {
        this.moves.push(move);
    }

    resetMoves() {
        this.moves = [];
    }

    // Checks if player has at least one combination of moves to win game
    isWinner() {
        return this.winMoves
            .some(winMove => winMove
                .every(move => this.moves
                    .includes(move)));
    }
}

class Computer extends Player {
    constructor() {
        super();
    }

    //Computer randomizes his move
    generateMove(filledCells) {
        const SUM_OF_POSSIBLE_CELL_IDS = 45;
        if (filledCells.length === 8) {
            // Calculation to find last empty cell id
            // last empty cell id equals to sum of all cells ids minus
            // sum of current filled cells ids
            return SUM_OF_POSSIBLE_CELL_IDS
                - filledCells.reduce((a, b) => a + b, 0);
        }
        const generatedCellId =
            getRandomInt(maxPossibleCellId, minPossibleCellId);
        // if Computer randomized cell that already filled it will
        // randomize again
        return filledCells.includes(generatedCellId) ?
            this.generateMove(filledCells) : generatedCellId;
    }
}

class Element {
    constructor(tag = null, className = null) {
        this.element = tag ? document.createElement(tag) : document.body;
        if (className)
            this.element.className = className;
    }

    setText(text) {
        this.element.innerText = text;
        return this;
    }

    setOnClickFunction(functionName) {
        this.element.setAttribute('onClick', functionName);
        return this;
    }

    makeUnclickable() {
        this.element.style.pointerEvents = "none";
    }

    getElement() {
        return this.element;
    }

    //Receives an array of children to append
    addChildren(children) {
        for (const child of children)
            this.element.appendChild(child.getElement());
        return this;
    }

    clear() {
        this.element.innerHTML = "";
    }
}

class HtmlView {
    constructor() {
        this.mainPageBody = new Element();
        this.scoreTable = new Element('p', 'score')
            .setText('score: 0 : 0');
    }

    renderGame() {
        this.cells = [];
        this.generateHTMLCells();
        const header = new Element('div', 'header')
            .addChildren([new Element('h2', 'title')
                .setText('Game Ticktacktoe'), this.scoreTable]);
        const grid = new Element('div', 'grid')
            .addChildren(this.cells);
        this.mainPageBody.clear();
        this.mainPageBody.addChildren([header, grid]);
    }

    generateHTMLCells() {
        for (let i = minPossibleCellId; i <= maxPossibleCellId; i++) {
            this.cells.push(new Element('div', 'cell')
                .setOnClickFunction('game.move(' + i + ')'));
        }
    }

    setScoreTable(playerScore, computerScore) {
        this.scoreTable
            .setText('score: ' + playerScore + ' : ' + computerScore);
    }

    setMarkOnCell(mark, cell) {
        this.cells[cell - 1].setText(mark).makeUnclickable();
    }
}

class Ticktacktoe {
    constructor(player, computer, htmlView) {
        this.computer = computer;
        this.player = player;
        this.whoseTurn = markX;
        this.htmlView = htmlView;
        this.startGame();
    }

    startGame() {
        this.moves = [];
        this.randomFirstWhoStarts();
        this.htmlView.renderGame();
        this.computerMovesIfComputerTurn();
    }

    randomFirstWhoStarts() {
        const [playerMark, computerMark] = this.randomizeMarks();
        this.player.setMark(playerMark);
        this.computer.setMark(computerMark);
    }

    randomizeMarks() {
        // ~50% chance that player will start first as X
        return getRandomInt(100, 0) > 50
            ? [markX, markO] : [markO, markX]
    }

    computerMovesIfComputerTurn() {
        if (this.isCurrentPlayerComputer()) this.computerMove();
    }

    computerMove() {
        this.move(this.computer.generateMove(this.moves));
    }

    isCurrentPlayerComputer() {
        return this.whoseTurn === this.computer.getMark();
    }

    move(move) {
        this.addMove(move);
        this.markCell(move);
        this.nextMoveScenario();
    }

    addMove(move) {
        this.moves.push(move);
        this.addMoveToCurrentPlayer(move);
    }

    addMoveToCurrentPlayer(move){
        this.isCurrentPlayerComputer()
            ? this.computer.addMove(move) : this.player.addMove(move);
    }

    markCell(move) {
        this.htmlView.setMarkOnCell(this.whoseTurn, move);
    }

    nextMoveScenario() {
        this.isEndGame()
            ? this.endGameScenario() : this.continueGameScenario();
    }

    isEndGame() {
        return this.isWin() || this.isTie();
    }

    endGameScenario() {
        if (this.isWin()) this.winnerScoreUpdate();
        this.restartGame();
    }

    continueGameScenario() {
        this.switchTurn();
        this.computerMovesIfComputerTurn();
    }

    isWin() {
        return this.player.isWinner() || this.computer.isWinner();
    }

    winnerScoreUpdate() {
        this.incrementWinnerScore();
        this.htmlView
            .setScoreTable(
                this.player.getScore(), this.computer.getScore());
    }

    incrementWinnerScore(){
        this.isCurrentPlayerComputer()
            ? this.computer.incrementScore()
            : this.player.incrementScore();
    }

    restartGame() {
        this.whoseTurn = markX;
        this.computer.resetMoves();
        this.player.resetMoves();
        this.startGame();
    }

    isTie() {
        return this.moves.length === 9;
    }

    switchTurn() {
        this.whoseTurn = this.whoseTurn === markX ? markO : markX;
    }
}

// randomizes in range of maximum and minimum numbers
function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const player = new Player();
const computer = new Computer();
const htmlView = new HtmlView();
const game = new Ticktacktoe(player, computer, htmlView);