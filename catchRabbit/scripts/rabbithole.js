class CatchRabbitGame {
    constructor(selectedHtmlElement) {
        this.selectedHtmlElement = selectedHtmlElement || document.body
        this.score = 0;
        this.record = 0;
        this.renderGame();
        this.currentActiveHole = this.getRandonInt();
    }

    renderGame(){
        this.addChildrenToParent(this.selectedHtmlElement, this.renderHeader(), this.renderGrid());
    }

    renderHeader(){
        let header = this.customElementConstructor('div', 'header');
        let title = this.customElementConstructor('h2', null, 'Game CatchRabbit');
        let score = this.customElementConstructor('p', 'score', 'score: ' + this.score, 'score');
        let record = this.customElementConstructor('p', 'record', 'record: ' + this.record, 'record');
        let button = this.customElementConstructor('button', 'start', 'start game', 'start', "game.startGame()")
        let timer = this.customElementConstructor('p', 'timer', '00:30', 'timer');
        this.addChildrenToParent(header, title, score, record, button, timer);
        return header;
    }

    renderGrid(){
        let grid = this.customElementConstructor('div', 'grid');
        for(let i = 1; i<26; i++){
            this.addChildrenToParent(grid, this.renderRabbitWithHole(i));
        }
        return grid;
    }

    renderRabbitWithHole(id){
        let hole = this.customElementConstructor('div', 'hole');
        let rabbit = this.customElementConstructor('div', 'rabbit', null, id, "game.caughtRabbit()");
        this.addChildrenToParent(hole, rabbit);
        return hole;
    }

    changeHole(){
        this.hideRabbit();
        this.currentActiveHole = this.getRandonInt();
        this.showRabbit();  
    }

    hideRabbit(){
        this.customElementModifier(this.currentActiveHole, null, 'none');
    }

    showRabbit(){
        this.customElementModifier(this.currentActiveHole, null, 'block');
    }

    caughtRabbit(){
        this.hideRabbit();
        this.score++;
        this.updateScore('score', this.score);
    }

    updateScore(scoreID, score){
        this.customElementModifier(scoreID, scoreID + ': ' + score);
    }

    updateRecord(){
        if(this.record<this.score){
            this.record = this.score;
            this.updateScore('record', this.record);
        }
    }

    startGame(){
        this.customElementModifier('start', 'game is started', null, null, true);
        var rabbitSpawn = window.setInterval(function(){
            game.changeHole();
        }, 1000);
        var seconds = 30;
        var timer = window.setInterval(function() {
            seconds--;
            game.customElementModifier('timer', '00:' + ("0" + seconds).slice(-2));
            if(seconds == 0){
                clearInterval(rabbitSpawn);
                clearInterval(timer);
                game.stopGame();
            }
        }, 1000);
    }

    stopGame(){
        this.hideRabbit();
        this.customElementModifier('start', 'start game', null, null, false);
        this.updateRecord();
        this.score = 0;
        this.updateScore('score', this.score);
    }

    customElementConstructor(elementName, className=null, text=null, idName=null, clickFunction=null){
        if(!elementName)
            return
        let element = document.createElement(elementName);
        if(className)
            element.className = className;
        if(idName)
            element.setAttribute('id', idName);
        if(text)
            element.innerText = text;
        if(clickFunction)
            element.setAttribute('onClick', clickFunction)
        return element;
    }

    customElementModifier(elementId=null, text=null, display=null, disabled=null){
        if(!elementId)
            return
        let element = document.getElementById(elementId);
        if(text)
            element.innerText = text;
        if(display)
            element.style.display = display;
        if(disabled!=null)
            element.disabled = disabled;
    }

    addChildrenToParent(){
        let parent = arguments[0];
        for(let i = 1; i<arguments.length; i++){
            parent.appendChild(arguments[i]);
        }
    }

    getRandonInt(){
        return Math.floor(Math.random() * 24) + 1;
    }
}

const game = new CatchRabbitGame();