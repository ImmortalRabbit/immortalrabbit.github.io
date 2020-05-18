var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

function Snake(color) {
  this.color = color;
  this.x = getRandomInt();
  this.y = getRandomInt();
  this.dx = 16;
  this.dy = 0;
  this.cells = [];
  this.maxCells = 4;
};

Snake.prototype = {
  constuctor: Snake,
  move: function(){
    this.x += this.dx;
    this.y += this.dy;
  },
  hitsWall: function(){
    if (this.x < 0 || this.x >= canvas.width || this.y < 0 || this.y >= canvas.height ) {
      this.reset();
    }
  },
  reset: function(){
    this.x = getRandomInt();
    this.y = getRandomInt();
    this.cells = [];
    this.maxCells = 4;
    this.dx = 16
    this.dy = 0;
  },
  track: function(){
    this.cells.unshift({x: this.x, y: this.y});
  },
  removeCell: function(){
    if (this.cells.length > this.maxCells) {
      this.cells.pop();
    }
  },
  eats: function(){
    context.fillStyle = this.color;
    for (let i = 0; i < this.cells.length; i++) {
      context.fillRect(this.cells[i].x, this.cells[i].y, 15, 15);
      if(this.cells[i].x === apple.x && this.cells[i].y === apple.y){
        this.maxCells++;
        apple.reset();
      }
      if(this.eatsHimself(i)){
        this.reset();
      }
      
    }
  },
  eatsHimself: function(index){
    for(let j = index + 1; j < this.cells.length; j++){
      if (this.cells[index].x === this.cells[j].x && this.cells[index].y === this.cells[j].y) {
        return true;
      }
    }
    return false;
  },
  loop: function(){
    this.move();
    this.hitsWall();
    this.track();
    this.removeCell();
    this.eats();
  },
  left: function(){
    if(this.dx == 0){
      this.dx = -grid;
      this.dy = 0;
    }
  },
  right: function(){
    if(this.dx == 0){
      this.dx = grid;
      this.dy = 0;
    }
  },
  up: function(){
    if(this.dy == 0){
      this.dy = -grid;
      this.dx = 0;     
    }
  },
  down: function(){
    if(this.dy == 0){
      this.dy = grid;
      this.dx = 0;
    }
  }
}

function Apple(){
  this.x = getRandomInt();
  this.y = getRandomInt();
}

Apple.prototype = {
  constuctor: Apple,
  reset: function(){
    this.x = getRandomInt();
    this.y = getRandomInt();
  },
  drawApple: function(){
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, 15, 15);
  }
}

var snakeA = new Snake('#552329');
var snakeB = new Snake('#393947');
var apple = new Apple();

function getRandomInt() {
  return (Math.floor(Math.random() * (30 - 0)) + 0) * grid;
}

function loop() {
  requestAnimationFrame(loop);
  if (++count < 8) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  apple.drawApple();
  snakeA.loop();
  snakeB.loop();
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  switch(e.which) {
    case 37:
      snakeA.left();
      break;
    case 38:
      snakeA.up();
      break;
    case 39:
      snakeA.right();
      break;
    case 40:
      snakeA.down();
      break;
  }
  switch(e.which) {
    case 65:
      snakeB.left();
      break;
    case 87:
      snakeB.up();
      break;
    case 68:
      snakeB.right();
      break;
    case 83:
      snakeB.down();
      break;
  }
});

// start the game
requestAnimationFrame(loop);

Vue.component('draggable-header-view', {
  template: '#header-view-template',
  data: function () {
    return {
      dragging: false,
      c: { x: 160, y: 160 },
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
