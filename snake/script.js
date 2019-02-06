var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;



var snakeA = {
  x: 560,
  y: 560,
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,
  // keep track of all grids the snake body occupies
  cells: [],
  // length of the snake. grows when eating an apple
  maxCells: 4
};

var snakeB = {
  x: 560,
  y: 560,
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: grid,
  dy: 0,
  // keep track of all grids the snake body occupies
  cells: [],
  // length of the snake. grows when eating an apple
  maxCells: 4
};

var apple = {
  x: 128,
  y: 288
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function reset(snake){
  if(snake == snakeA){
      snake.dx = -grid;
      snake.x = 192;
      snake.y = 192;
  }else{
      snake.dx = grid;
      snake.x = 384;
      snake.y = 384;
  }
  snake.cells = [];
  snake.maxCells = 4;
  snake.dy = 0;
}

function move(snake){
  snake.x += snake.dx;
  snake.y += snake.dy;
}

function moveSnakes(){
  move(snakeA);
  move(snakeB);
}

function snakeHitsWall(snake){
  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height ) {
    reset(snake);
  }
}

function snakesHitWall(){
  snakeHitsWall(snakeA);
  snakeHitsWall(snakeB);
}

function putApple(){
  apple.x = getRandomInt(0, 30) * grid;
  apple.y = getRandomInt(0, 30) * grid;
}

function drawApple(){
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);
}

function trackSnake(snake){
  snake.cells.unshift({x: snake.x, y: snake.y});
}

function trackSnakes(){
  trackSnake(snakeA);
  trackSnake(snakeB);
}

function removeCell(snake){
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
}

function removeCellsAsWeMoveAway(){
  removeCell(snakeA);
  removeCell(snakeB);
}

function snakeEatsSnake(cell, index, snake){
  for (var i = index + 1; i < snake.cells.length; i++) {
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
      return true;
    }
  }
  return false;
}

function snakeAccidentFaceToFace(){
  if((snakeA.cells[0].x === snakeB.cells[0].x) && (snakeA.cells[0].y === snakeB.cells[0].y)){
    return true;
  }
  return false;
}


function snakeEats(snake){
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      putApple();
    }

    if(snakeEatsSnake(cell, index, snakeA) || snakeEatsSnake(cell, index, snakeB)){
        reset(snake);
    }
  });
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 8) {
    return;
  }
  count = 0;

  context.clearRect(0,0,canvas.width,canvas.height);

  moveSnakes();
  snakesHitWall();
  trackSnakes();
  removeCellsAsWeMoveAway();
  drawApple();

  if(snakeAccidentFaceToFace()){
    reset(snakeA);
    reset(snakeB);
  }
  context.fillStyle = '#552329';
  snakeEats(snakeA);
  context.fillStyle = '#393947';
  snakeEats(snakeB);
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // left arrow key
  if (e.which === 37 && snakeA.dx === 0) {
    snakeA.dx = -grid;
    snakeA.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snakeA.dy === 0) {
    snakeA.dy = -grid;
    snakeA.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snakeA.dx === 0) {
    snakeA.dx = grid;
    snakeA.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snakeA.dy === 0) {
    snakeA.dy = grid;
    snakeA.dx = 0;
  }  // a key
  if (e.which === 65 && snakeB.dx === 0) {
      snakeB.dx = -grid;
      snakeB.dy = 0;
  }
  // w key
  else if (e.which === 87 && snakeB.dy === 0) {
    snakeB.dy = -grid;
    snakeB.dx = 0;
  }
  // d key
  else if (e.which === 68 && snakeB.dx === 0) {
    snakeB.dx = grid;
    snakeB.dy = 0;
  }
  // s key
  else if (e.which === 83 && snakeB.dy === 0) {
    snakeB.dy = grid;
    snakeB.dx = 0;
  }
});


// start the game
requestAnimationFrame(loop);


Vue.component('draggable-header-view', {
  template: '#header-view-template',
  data: function () {
    return {
      dragging: false,
      // quadratic bezier control point
      c: { x: 160, y: 160 },
      // record drag start point
      start: { x: 0, y: 0 }
    }
  },
  computed: {
    headerPath: function () {
      return 'M0,0 L320,0 320,160' +
        'Q' + this.c.x + ',' + this.c.y +
        ' 0,160'
    },
    contentPosition: function () {
      var dy = this.c.y - 160
      var dampen = dy > 0 ? 2 : 4
      return {
        transform: 'translate3d(0,' + dy / dampen + 'px,0)'
      }
    }
  },
  methods: {
    startDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.dragging = true
      this.start.x = e.pageX
      this.start.y = e.pageY
    },
    onDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        this.c.x = 160 + (e.pageX - this.start.x)
        // dampen vertical drag by a factor
        var dy = e.pageY - this.start.y
        var dampen = dy > 0 ? 1.5 : 4
        this.c.y = 160 + dy / dampen
      }
    },
    stopDrag: function () {
      if (this.dragging) {
        this.dragging = false
        dynamics.animate(this.c, {
          x: 160,
          y: 160
        }, {
          type: dynamics.spring,
          duration: 700,
          friction: 280
        })
      }
    }
  }
})

new Vue({ el: '#app' })
