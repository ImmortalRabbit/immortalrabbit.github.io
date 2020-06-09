const minPossibleCellId = 1;
const maxPossibleCellId = 9;
const markX = 'X';
const markO = 'O';

class Player {
    constructor() {
        this.mark = "";
        this.score = 0;
        this.markedCells = [];
        this.winningMarkedCellsCombinations = [[1, 5, 9], [3, 5, 7],
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9]
        ];
    }

    /**
     * Sets player mark
     * @param {String} mark
     */
    setMark(mark) {
        this.mark = mark;
    }

    /**
     * Returns player mark
     * @returns {string}
     */
    getMark() {
        return this.mark;
    }

    /**
     * Increments score of player
     */
    incrementScore() {
        this.score++;
    }

    /**
     * Returns player
     * @returns {number}
     */
    getScore() {
        return this.score;
    }

    /**
     * Adds cell which chosen to fill cell id to markedCells array
     * @param cell
     */
    markCell(cell) {
        this.markedCells.push(cell);
    }

    /**
     * Resets players markedCells 
     */
    resetMarkedCells() {
        this.markedCells = [];
    }

    /**
     * Checks if player has at least one combination of markedCells
     * to win game
     * @returns {boolean}
     */
    isWinner() {
        return this.winningMarkedCellsCombinations
            .some(winningMarkedCellsCombination =>
                winningMarkedCellsCombination
                .every(cell => this.markedCells
                    .includes(cell)));
    }
}

/**
 * Computer is inheritance of Player
 * Used to simulate opponent of Player
 */
class Computer extends Player {

    constructor() {
        super();
    }

    /**
     * Return random empty cell id to mark by computer
     * @param {Array.<Number>} markedCells
     * @returns {number}
     */
    generateCellToMark(markedCells) {
        const SUM_OF_POSSIBLE_CELL_IDS = 45;
        if (markedCells.length === 8) {
            // Calculation to find last empty cell id
            // last empty cell id equals to sum of all cells ids minus
            // sum of current filled cells ids
            return SUM_OF_POSSIBLE_CELL_IDS
                - markedCells.reduce((a, b) => a + b, 0);
        }
        const generatedCellId =
            getRandomInt(maxPossibleCellId, minPossibleCellId);
        // if Computer randomized cell that already filled it will
        // randomize again
        return markedCells.includes(generatedCellId) ?
            this.generateCellToMark(markedCells) : generatedCellId;
    }
}

/**
 * Used to create DOM elements with different parameter
 */
class Element {
    /**
     * Class constructor
     * @param {String} tag
     * @param {String} className
     */
    constructor(tag = null, className = null) {
        this.element = tag ? document.createElement(tag) : document.body;
        if (className)
            this.element.className = className;
    }

    /**
     * Sets text inside DOM element
     * @param {String} text
     * @returns {Element}
     */
    setText(text) {
        this.element.innerText = text;
        return this;
    }

    /**
     * Sets onClick function to DOM element
     * @param {String} functionName
     * @returns {Element}
     */
    setOnClickFunction(functionName) {
        this.element.setAttribute('onClick', functionName);
        return this;
    }

    /**
     * Sets style of DOM element to make it unclickable
     */
    setUnclickable() {
        this.element.style.pointerEvents = "none";
    }

    /**
     * Returns DOM element
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * Receives array of Element to append to each of their DOM elements
     * to this DOM element
     * @param {Array.<Element>}children
     * @returns {Element}
     */
    addChildren(children) {
        for (const child of children)
            this.element.appendChild(child.getElement());
        return this;
    }

    /**
     * Resets inside of DOM element
     */
    reset() {
        this.element.innerHTML = "";
    }
}

/**
 * Used to generate HTML page of Game
 */
class HtmlView {
    constructor() {
        this.mainPageBody = new Element();
        this.scoreTable = new Element('p', 'score')
            .setText('score: 0 : 0');
    }

    /**
     * Generates all required DOM elements of game
     */
    generateGame() {
        this.cells = [];
        this.generateCells();
        this.mainPageBody.reset();
        this.mainPageBody.addChildren(
            [this.generateHeader(), this.generateGrid()]);
    }

    /**
     * Generates and returns header of game
     * @returns {Element}
     */
    generateHeader(){
        return new Element('div', 'header')
            .addChildren([new Element('h2', 'title')
                .setText('Game Ticktacktoe'), this.scoreTable]);
    }

    /**
     * Generates and returns main grid to where players play Game
     * @returns {Element}
     */
    generateGrid(){
        return new Element('div', 'grid')
            .addChildren(this.cells);
    }

    /**
     * Generates cells inside of grid
     */
    generateCells() {
        for (let i = minPossibleCellId; i <= maxPossibleCellId; i++) {
            this.cells.push(new Element('div', 'cell')
                .setOnClickFunction('game.markCell(' + i + ')'));
        }
    }

    /**
     * Receives player's score and computer's score to set score table
     * @param {Number} playerScore
     * @param {Number} computerScore
     */
    setScoreTable(playerScore, computerScore) {
        this.scoreTable
            .setText('score: ' + playerScore + ' : ' + computerScore);
    }

    /**
     * Receives mark and cell id to set mark inside cell and
     * to make unclickable cell for other player
     * @param {String} mark
     * @param {Number} cell
     */
    setMarkOnCell(mark, cell) {
        this.cells[cell - 1].setText(mark).setUnclickable();
    }
}

/**
 * Used as main class to start game
 */
class Ticktacktoe {
    /**
     * Receives player, computer and htmlview of game and starts game
     * Game is started by player with mark X
     * @param {Player} player
     * @param {Computer} computer
     * @param {HtmlView} htmlView
     */
    constructor(player, computer, htmlView) {
        this.computer = computer;
        this.player = player;
        this.whoseTurn = markX;
        this.htmlView = htmlView;
        this.startGame();
    }

    /**
     * Start game
     */
    startGame() {
        this.markedCells = [];
        this.randomFirstWhoStarts();
        this.htmlView.generateGame();
        this.computerMarksCellIfComputerTurn();
    }

    /**
     * Randomizes which player will have mark X and mark O
     */
    randomFirstWhoStarts() {
        const [playerMark, computerMark] = this.randomizeMarks();
        this.player.setMark(playerMark);
        this.computer.setMark(computerMark);
    }

    /**
     * Randomizes marks in different order
     * @returns {Array.<String>}
     */
    randomizeMarks() {
        // ~50% chance that player will start first as X
        return getRandomInt(100, 0) > 50
            ? [markX, markO] : [markO, markX]
    }

    computerMarksCellIfComputerTurn() {
        if (this.isCurrentPlayerComputer()) this.computerMarkCell();
    }

    computerMarkCell() {
        this.markCell(this.computer.generateCellToMark(this.markedCells));
    }

    /**
     * @returns {boolean}
     */
    isCurrentPlayerComputer() {
        return this.whoseTurn === this.computer.getMark();
    }

    /**
     * @param {Number} cell
     */
    markCell(cell) {
        this.addCellToMarkedCells(cell);
        this.markCellOfCurrentPlayer(cell);
        this.markCellOnHtmlView(cell);
        this.nextMoveScenario();
    }

    /**
     * @param {Number} cell
     */
    addCellToMarkedCells(cell) {
        this.markedCells.push(cell);
    }

    /**
     * @param {Number} cell
     */
    markCellOfCurrentPlayer(cell){
        this.isCurrentPlayerComputer()
            ? this.computer.markCell(cell) : this.player.markCell(cell);
    }

    /**
     * @param {Number} cell
     */
    markCellOnHtmlView(cell) {
        this.htmlView.setMarkOnCell(this.whoseTurn, cell);
    }

    /**
     * Checks should game end or continue
     */
    nextMoveScenario() {
        this.isEndGame()
            ? this.endGameScenario() : this.continueGameScenario();
    }

    /**
     * @returns {boolean}
     */
    isEndGame() {
        return this.isWin() || this.isTie();
    }

    endGameScenario() {
        if (this.isWin()){
            this.incrementWinnerScore();
            this.updateScoreTable();
        }
        this.resetGame();
    }

    continueGameScenario() {
        this.switchTurn();
        this.computerMarksCellIfComputerTurn();
    }

    /**
     * @returns {boolean}
     */
    isWin() {
        return this.player.isWinner() || this.computer.isWinner();
    }

    incrementWinnerScore(){
        this.isCurrentPlayerComputer()
            ? this.computer.incrementScore()
            : this.player.incrementScore();
    }

    updateScoreTable(){
        this.htmlView
            .setScoreTable(
                this.player.getScore(), this.computer.getScore());
    }

    resetGame() {
        this.resetGameSettings();
        this.startGame();
    }

    /**
     * Sets starting mark as X and reset players marked cells
     */
    resetGameSettings(){
        this.whoseTurn = markX;
        this.computer.resetMarkedCells();
        this.player.resetMarkedCells();
    }

    /**
     * @returns {boolean}
     */
    isTie() {
        return this.markedCells.length === 9;
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