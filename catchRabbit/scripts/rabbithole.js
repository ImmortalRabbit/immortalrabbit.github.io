class CatchRabbitGame {
    constructor(selectedHtmlElement) {
        this.selectedHtmlElement = selectedHtmlElement || document.body
        this.score = 0;
        this.highestScore = 0;
        this.renderGame();
        this.currentActiveHole = this.getRandonInt();
    }

    renderGame(){
        this.selectedHtmlElement.innerHTML = '';
        let header = this.renderHeader();
        let game = this.renderGrid();
        this.selectedHtmlElement.appendChild(header);
        this.selectedHtmlElement.appendChild(game);
    }

    renderHeader(){
        let header = this.customElementConstructor('div', 'header');
        header = this.customElementConstructor('h2', null, header, 'Game CatchRabbit');
        header = this.customElementConstructor('p', 'score', header, 'score: ' + this.score, 'score');
        header = this.customElementConstructor('p', 'highest', header, 'highest score ' + this.highestScore, 'highest');
        header = this.customElementConstructor('button', 'start', header, 'start game', 'start', "game.startGame()")
        header = this.customElementConstructor('p', 'timer', header, '00:30', 'timer');
        return header;
    }

    renderGrid(){
        let game = this.customElementConstructor('div', 'grid');
        for(let i = 1; i<26; i++){
                let rabbit = this.renderRabbit(i);
                game.appendChild(rabbit);
        }
        return game;
    }

    renderRabbit(id){
        let hole = this.customElementConstructor('div', 'hole');
        let rabbit = this.customElementConstructor('div', 'rabbit', hole, null, id, "game.caughtRabbit()");
        return rabbit;
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
        this.updateScore();
    }

    updateScore(){
        this.customElementModifier('score', 'score: ' + this.score);
    }

    updateHighScore(){
        if(this.highestScore<this.score){
            this.highestScore = this.score;
        }
        this.customElementModifier('highest', 'highest score: ' + this.highestScore);
    }

    startGame(){
        this.customElementModifier('start', 'game is started', null, null, true);
        var rabbitSpawn = window.setInterval(function(){
            game.changeHole();
        }, 1500);
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
        this.updateHighScore();
        this.score = 0;
        this.updateScore();
    }

    customElementConstructor(elementName, className=null, parent=null, text=null, idName=null, clickFunction=null){
        let element = document.createElement(elementName);
        if(className)
            element.className = className;
        if(idName)
            element.setAttribute('id', idName);
        if(text)
            element.innerText = text;
        if(clickFunction)
            element.setAttribute('onClick', clickFunction)
        if(parent){
            parent.appendChild(element);
            return parent;
        }
        return element;
    }

    customElementModifier(elementId, text=null, display=null, disabled=null){
        let element = document.getElementById(elementId);
        if(text){
            element.innerText = text;
        }
        if(display){
            element.style.display = display;
        }
        if(disabled!=null){
            element.disabled = disabled;
        }
    }

    getRandonInt(){
        return Math.floor(Math.random() * 24) + 1;
    }
}

const game = new CatchRabbitGame();