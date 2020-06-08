const minPossibleCellId = 1;
const maxPossibleCellId = 9;

class player {
    constructor(){
        this.mark = "";
        this.score = 0;
        this.moves = [];
        // Win combinations
        this.winMoves = [[1, 5, 9], [3, 5, 7],
                         [1, 2, 3], [4, 5, 6], [7, 8, 9],
                         [1, 4, 7], [2, 5, 8], [3, 6, 9]
                        ];
    }

    setMark(mark){
        this.mark = mark;
    }

    getMark(){
        return this.mark;
    }

    incrementScore(){
        this.score++;
    }

    getScore(){
        return this.score;
    }

    addMove(move){
        this.moves.push(move);
    }

    resetMoves(){
        this.moves = [];
    }

    getMoves(){
        return this.moves;
    }

    // Checks if player has at least one combination of moves to win game
    isWinner(){
        return this.winMoves.some(winMove => winMove.every(move => this.moves.includes(move)));
    }
}

class computer extends player{
    constructor(){
        super();
    }

    //Computer randomizes his move
    generateMove(filledCells){
        const SUM_OF_POSSIBLE_CELL_IDS = 45;
        if(filledCells.length === 8){
            // Calculation to find last empty cell id
            // Formula: sum of all cells ids minus current filled cells ids
            return SUM_OF_POSSIBLE_CELL_IDS - filledCells.reduce((a, b) => a + b, 0);
        }
        var generatedCellId = getRandomInt(maxPossibleCellId, minPossibleCellId);
        // if Computer randomized cell that already filled it will randomize again 
        return filledCells.includes(generatedCellId) ? this.generateMove(filledCells) : generatedCellId;
    }
}

class element{
    constructor(tag = null, className = null){
        this.element = tag ? document.createElement(tag) : document.body;
        if(className)
            this.element.className = className;
    }

    setText(text){
        this.element.innerText = text;
        return this;
    }

    setOnClickFunction(functionName){
        this.element.setAttribute('onClick', functionName);
        return this;
    }

    disable(){
        this.element.style.pointerEvents = "none";
    }

    getElement(){
        return this.element;
    }

    addChildren(){
        for(let i = 0; i < arguments.length; i++)
            this.element.appendChild(arguments[i].getElement());
        return this;
    }

    clear(){
        this.element.innerHTML = "";
    }
}

class htmlview{
    constructor(){
        this.mainPageBody = new element();
        this.scoreTable = new element('p', 'score').setText('score: 0 : 0');
    }

    renderGame(){
        this.cells = [];
        this.generateCells();
        this.mainPageBody.clear();
        this.mainPageBody.addChildren(new element('div', 'header').addChildren(new element('h2', 'title').setText('Game Tictactoe'), this.scoreTable),
                                  new element('div', 'grid').addChildren(...this.cells));
    }

    generateCells(){
        for(let i = minPossibleCellId; i<=maxPossibleCellId; i++){
            this.cells.push(new element('div', 'cell').setOnClickFunction('game.move(' + i + ')'));
        }
    }

    setScoreTable(playerScore, computerScore){
        this.scoreTable.setText('score: ' + playerScore + ' : ' + computerScore);
    }

    setMarkOnCell(mark, cell){
        this.cells[cell-1].setText(mark).disable();
    }
}

class tictactoe{
    constructor(){
        this.computer = new computer();
        this.player = new player();
        this.whoseTurn = 'X';
        this.htmlview = new htmlview();
        this.startGame();
    }

    startGame(){
        this.moves = [];
        this.randomFirstWhoStarts();
        this.htmlview.renderGame();
        this.computerAction();
    }

    randomFirstWhoStarts(){
        if(getRandomInt(100, 0) > 50){
            this.player.setMark('X');
            this.computer.setMark('O');
        }else{
            this.computer.setMark('X');
            this.player.setMark('O');
        }
    }

    computerAction(){
        if(this.isCurrentPlayerComputer()){
            this.move(this.computer.generateMove(this.moves));
        }
    }

    isCurrentPlayerComputer(){
        return this.whoseTurn === this.computer.getMark();
    }

    move(move){
        this.addMove(move);
        this.markCell(move);
        this.nextMoveScenario();
    }

    addMove(move){
        this.moves.push(move);
        this.isCurrentPlayerComputer() ? this.computer.addMove(move) : this.player.addMove(move);
    }
   
    markCell(move){
        this.htmlview.setMarkOnCell(this.whoseTurn, move);
    }

    nextMoveScenario(){
        if(this.isWin()){
            this.winnerScoreUpdate();
            this.restartGame();
        }else if(this.isTie()){
            this.restartGame();
        }else{
            this.switchTurn();
            this.computerAction();
        }
    }

    isWin(){
        return this.player.isWinner() || this.computer.isWinner();
    }

    winnerScoreUpdate(){
        this.isCurrentPlayerComputer() ? this.computer.incrementScore() : this.player.incrementScore();
        this.htmlview.setScoreTable(this.player.getScore(), this.computer.getScore());
    }

    restartGame(){
        this.whoseTurn = 'X';
        this.computer.resetMoves();
        this.player.resetMoves();
        this.startGame();
    }

    isTie(){
        return this.moves.length === 9;
    }

    switchTurn(){
        this.whoseTurn = this.whoseTurn === 'X' ? 'O' : 'X';
    }
}

// randomizes in range of maximum and minimum numbers
function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const game = new tictactoe();