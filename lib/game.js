import Circle from './circle';
import { DIMS, checkCollision, KEYS, getDir } from './utils';
import Player from './player';

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pressed = {x: 0, y: 0};
    this.circles = [new Player()];
    this.addCircles();
    this.started = false;
  }

  start() {
    this.bindKeyHandlers();
    this.start = true;
  }

  update(dt) {
    if (this.started) {
      for (var i = 0; i < this.circles.length; i++) {
        for (var j = i+1; j < this.circles.length; j++) {
          checkCollision(this.circles[i], this.circles[j]);
        }
      }
    }
    this.circles.forEach(circle => {
      circle.update(dt, this.pressed);
    });
  }

  render(ctx) {
    ctx.clearRect(0, 0, DIMS[0], DIMS[1]);
    this.circles.forEach(circle => {
      circle.render(ctx);
    });
  }

  addCircles() {
    for (var i = 0; i < 65; i++) {
      const r = Math.floor(Math.random() * 5) + 5;
      const x = Math.floor(Math.random() * (this.width - 2*r)) + r;
      const y = Math.floor(Math.random() * (this.height - 2*r)) + r;
      const circle = new Circle(x, y, r);
      this.circles.push(circle);
    }
  }

  bindKeyHandlers() {
    window.addEventListener('keydown', e => {
      const dir = getDir(e);
      if (dir[0]) {
        this.pressed.x = dir[0];
      }
      if (dir[1]) {
        this.pressed.y = dir[1];
      }
    });
    window.addEventListener('keyup', e => {
      const dir = getDir(e);
      if (dir[0] === this.pressed.x) {
        this.pressed.x = 0;
      }
      if (dir[1] === this.pressed.y) {
        this.pressed.y = 0;
      }
     });
  }
}

export default Game;
