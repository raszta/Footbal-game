function Player () {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}

function Ball(){
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}

function Game(){
  this.player = new Player();
  this.ball = new Ball();
  this.score = 0;
  this.board = document.querySelectorAll("#board div");

  this.index = function(x,y) {
  return x + (y * 10);
  }

  this.movePlayer = function(){
    if(this.player.direction ==="right"){
      this.player.x =this.player.x+1;
    }else if(this.player.direction ==="left"){
      this.player.x =this.player.x-1;
    }
    else if(this.player.direction ==="up"){
      this.player.y =this.player.y-1;
    }
    else if(this.player.direction ==="down"){
      this.player.y =this.player.y+1;
    }
    if(!this.gameOver()){
    this.gameOver();
    this.hideVisiblePlayer();
    this.showPlayer();
    this.checkBallCollision();
  }
 }

  this.showPlayer = function(){
    this.board[ this.index(this.player.x,this.player.y) ].classList.add('player');
    }

    this.showBall = function(){
      this.board[ this.index(this.ball.x,this.ball.y) ].classList.add('ball');
    }

  var self = this;
  this.startGame = function(){
    this.idSetInterval = setInterval(function (){
      self.movePlayer();
    },250);
    self.showPlayer();
    self.showBall();
  }

  this.hideVisiblePlayer = function(){
    var div = document.querySelector('.player');
    div.classList.remove('player');
  }

  this.turnPlayer = function(event){
    switch (event.which) {
      case 37:
        this.player.direction = 'left';
        break;
      case 38:
        this.player.direction = 'up';
        break;
      case 39:
        this.player.direction = 'right';
        break;
      case 40:
        this.player.direction = 'down';
        break;
    }
  }

  this.checkBallCollision = function(){
      if(this.player.x == this.ball.x && this.player.y == this.ball.y ){
        this.board[ this.index(this.ball.x,this.ball.y) ].classList.remove('ball');
        this.score++;
        var scor = document.querySelector("#score strong");
        scor.innerText = this.score + " : 0";
        this.ball = new Ball();
        this.showBall();
      }
  }

  this.gameOver = function(){
    if(this.player.x <0 || this.player.x>9 ||this.player.y <0 || this.player.y>9){
      clearInterval(this.idSetInterval);
      var over = document.querySelector("#over");
      over.classList.remove("invisible");
      var scor = document.querySelector("#score strong");

      over.style.color = "red";
      over.style.fontSize = '50px';
      over.innerText = "Game over! You scored: " + scor.innerText;
      return true;
    }
    return false;
  }
  document.addEventListener('keydown', function(event){
    self.turnPlayer(event);
  });
}

// var game = new Game();
// game.startGame();


// button.addEventListener('click', function(){
//     game.startGame();
// });
