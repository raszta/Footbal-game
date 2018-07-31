function Furry () {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}

function Coin(){
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}

function Game(){
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  this.board = document.querySelectorAll("#board div");

  this.index = function(x,y) {
  return x + (y * 10);
  }

  this.moveFurry = function(){
    if(this.furry.direction ==="right"){
      this.furry.x =this.furry.x+1;
    }else if(this.furry.direction ==="left"){
      this.furry.x =this.furry.x-1;
    }
    else if(this.furry.direction ==="up"){
      this.furry.y =this.furry.y-1;
    }
    else if(this.furry.direction ==="down"){
      this.furry.y =this.furry.y+1;
    }
    this.gameOver();
    this.hideVisibleFurry();
    this.showFurry();
    this.checkCoinCollision();

  }

  this.showFurry = function(){
    this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }

    this.showCoin = function(){
      this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }

  var self = this;
  this.startGame = function(){
    this.idSetInterval = setInterval(function (){
      self.moveFurry();
    },250);
    self.showFurry();
    self.showCoin();
  }

  this.hideVisibleFurry = function(){
    var div = document.querySelector('.furry');
    div.classList.remove('furry');
  }

  this.turnFurry = function(event){
    switch (event.which) {
      case 37:
        this.furry.direction = 'left';
        break;
      case 38:
        this.furry.direction = 'up';
        break;
      case 39:
        this.furry.direction = 'right';
        break;
      case 40:
        this.furry.direction = 'down';
        break;
    }
  }

  this.checkCoinCollision = function(){
      if(this.furry.x == this.coin.x && this.furry.y == this.coin.y ){
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
        this.score++;
        var scor = document.querySelector("#score strong");
        scor.innerText = this.score;
        this.coin = new Coin();
        this.showCoin();
      }
  }

  this.gameOver = function(){
    if(this.furry.x <0 || this.furry.x>9 ||this.furry.y <0 || this.furry.y>9){
      clearInterval(this.idSetInterval);
      var over = document.querySelector("#over");
      over.classList.remove("invisible");
      var scor = document.querySelector("#score strong");

      over.style.color = "red";
      over.style.fontSize = '50px';
      over.innerText = "Game over! You scored: " + scor.innerText;
      this.hideVisibleFurry();
    }
  }
  document.addEventListener('keydown', function(event){
    self.turnFurry(event);
  });
}

var game = new Game();

game.startGame();
