var play = false;
var keys = [];
var lift = 15;
var vel = 0;
var grav = 0.5;
var pipes_u = [];
var pipes_d = [];

var wall = {
  "gap": 150,
  "range": 200,
  "speed": 2
}


class Bird {
    constructor(x,y) {
      this.x = x;
      this.y = y;
    }
  
  show() {
    fill(225,255,0);
    ellipse(this.x,this.y,30,30);
  }
  
  move() {
    if (play ) {
    this.y += vel;
    vel += grav;
    vel *= 0.9;
  }
  }
}
let bird = new Bird(100,600/2);

class pipe {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }
  
  show() {
    fill(40,255,23);
    rect(this.x, this.y, 30, this.h);
    noFill();
  }
  
  move() {
    if (play == true ) {
    this.x -= wall.speed
    wall.speed += 0.0002;  
    }
  }
  
  collide(Bird) {
    if (bird.x > this.x && bird.y > this.y && bird.x < this.x + this.w && bird.y < this.y +this.h) {
      stroke(5);
      textSize(30);
      fill(0);
        text("dead",30,30);
      noFill();
    }
  }
  
}

function setup() {
  createCanvas(400, 600);
  for (var i = 0; i < 2; i++) {
    if (true) {
      var y = random(height - 250,height - 100);
      pipes_d[i] = new pipe(width + i*wall.range,y,20,height - y); //lower
      pipes_u[i] = new pipe(width + i*wall.range,0,20,y - wall.gap); //upper
    }

  }

}

function draw() {
  background(220);
  bird.show();
  bird.move();
  var y = random(height - 300,height - 50);
  
  //lower pipes
  for (var j = 0; j < pipes_d.length; j++) {
    pipes_d[j].show();
    pipes_d[j].move();
    pipes_d[j].collide();
    if (pipes_d[j].x + pipes_d[j].w < 0) {
      pipes_d[j] = new pipe(width,y,20,height - y); //lower
    }
  }
  
  //upper pipes
  for (var k = 0; k < pipes_u.length; k++) {
    pipes_u[k].show();
    pipes_u[k].move();
    pipes_u[k].collide();
    if (pipes_u[k].x + pipes_u[k].w < 0) {
      pipes_u[k] = new pipe(width,0,20,y-150);
    }
  }
  
}

function keyTyped() {
  play = true;
  if (keys[32] && play == true) {
      vel -= lift;
  }
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}
