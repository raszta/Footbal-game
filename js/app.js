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
  return x + (y * 12);
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

  const self = this;
  this.startGame = function(){   
    this.idSetInterval = setInterval(function (){
      self.movePlayer();
    },250);
    self.showPlayer();
    self.showBall();
  }

  this.hideVisiblePlayer = function(){
    const div = document.querySelector('.player');
    div.classList.remove('player');
  }
  this.hideVisibleBall = function(){
    const div = document.querySelector('.ball');
    div.classList.remove('ball');
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
        document.querySelector('audio').play();
        this.score++;
        const scor = document.querySelector(".score strong");
        scor.innerText = this.score + " : 0";
        this.ball = new Ball();
        this.showBall();
      }
  }

  this.gameOver = function(){
    if(this.player.x <0 || this.player.x>11 ||this.player.y <0 || this.player.y>11){
      clearInterval(this.idSetInterval);
      const over = document.querySelector(".over");
      over.classList.remove("invisible");
      over.classList.add("info");
      const scor = document.querySelector(".score strong");
      this.hideVisiblePlayer();
      this.hideVisibleBall();
      over.innerHTML = `<h1>Game over! You scored:  ${scor.innerText}</h1>`;
      const btn = document.createElement('button');
      btn.innerText = "Return"; 
      over.appendChild(btn);

      btn.addEventListener('click', function () {
        over.classList.add("invisible");
        scor.innerText = "0 : 0";
      });
      return true;
    }
    return false;
  }
  document.addEventListener('keydown', function(event){
    self.turnPlayer(event);
  });
}

var start = document.querySelector('.startGame');
var info = document.querySelector('.infoGame');
var auth = document.querySelector('.credits');

start.addEventListener('click', function(){
  const game = new Game();
  game.startGame();
});

info.addEventListener('click', function(){
  const  about = document.createElement('div');
  about.classList.add('over');
  about.classList.add('info');
  about.innerHTML = `<h1>Keyboard settings</h1>
  <h2>Moving</h2>
  arrow up -> go up<br/>
  arrow down -> go down<br/>
  arrow left -> go left<br/>
  arrow right -> go right<br/>
  `;
  const btn = document.createElement('button');
  btn.innerText = "Return";
  about.appendChild(btn);
 
  const body = document.querySelector('body');
  body.appendChild(about);

  btn.addEventListener('click', function () {
    body.removeChild(about);
  });
});

auth.addEventListener('click', function(){
  const about = document.querySelector('.about');
  const btn = document.querySelector('.btnAbout');
  about.classList.remove('invisible');
  btn.addEventListener('click', function () {
    about.classList.add('invisible');
  });
});
