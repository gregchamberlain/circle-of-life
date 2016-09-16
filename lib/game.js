import Circle from './circle';
import { DIMS, checkCollision, KEYS, getDir } from './utils';
import Player from './player';

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.difficulty = 'easy';
    this.pressed = {x: 0, y: 0};
    this.circles = [new Player()];
    this.status = 'starting';
    this.addCircles();
    this.started = false;
    this.paused = false;
    this.bindKeyHandlers();
    this.destroyed = 0;
  }

  start() {
    this.start = true;
  }

  reset() {
    this.circles = [new Player()];
    this.addCircles();
    this.started = false;
    this.paused = false;
    this.destroyed = 0;
  }

  update(dt) {
    if (this.paused) return;
    if (this.started) {
      for (var i = 0; i < this.circles.length; i++) {
        for (var j = i+1; j < this.circles.length; j++) {
          checkCollision(
            this.circles[i],
            this.circles[j],
            this.destroyCircle.bind(this)
          );
        }
      }
    }
    this.circles.forEach(circle => {
      circle.update(dt, this.pressed, this.started);
    });
  }

  destroyCircle(player) {
    if (player) {
      this.status = 'lost';
      this.reset();
    } else {
      this.destroyed += 1;
    }
    if (this.destroyed === this.circles.length - 1) {
      this.status = 'won';
      this.reset();
    }
  }

  render(ctx) {
    ctx.clearRect(0, 0, DIMS[0], DIMS[1]);
    this.circles.forEach(circle => {
      circle.render(ctx);
    });
    if (this.paused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, DIMS[0], DIMS[1]);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = '30px Arial';
      ctx.fillText('PAUSED', DIMS[0] / 2, DIMS[1] / 2, 400);
      ctx.font = '18px Arial';
      ctx.fillText('Press Space to Resume', DIMS[0] / 2, DIMS[1] / 2 + 24, 400);
    }
    if (!this.started) {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(DIMS[0] / 2, DIMS[1] / 2, 150, 0, 2*Math.PI);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = '30px Arial';
      if (this.status === 'won') {
        ctx.fillText('YOU WIN!', DIMS[0] / 2, DIMS[1] / 2 - 90, 400);
      } else if (this.status === 'lost') {
        ctx.fillText('YOU LOSE!', DIMS[0] / 2, DIMS[1] / 2 - 90, 400);
      } else {
        ctx.fillText('Circle of Life', DIMS[0] / 2, DIMS[1] / 2 - 90, 400);
        ctx.font = '16px Arial';
        ctx.fillText(
          'Consume (run into) smaller circles,',
          DIMS[0] / 2, DIMS[1] / 2 - 65, 400);
        ctx.fillText(
          'don\'t be consumed by larger ones.',
          DIMS[0] / 2, DIMS[1] / 2 - 45, 400);
      }
      ctx.font = '16px Arial';
      ctx.fillText(`Select Difficulty, current: ${this.difficulty}`, DIMS[0] / 2, DIMS[1] / 2  );
      ctx.fillText('J = easy  K = medium  L = hard', DIMS[0] / 2, DIMS[1] / 2 + 40);
      ctx.fillText('Use arrow keys or aswd to move',
        DIMS[0] / 2, DIMS[1] / 2 + 80, 400);
      ctx.fillText('Press space to begin!',
        DIMS[0] / 2, DIMS[1] / 2 + 110, 400);
    }
  }

  addCircles() {
    let rLimit;
    let num;
    switch (this.difficulty) {
      case 'easy':
        rLimit = 5;
        num = 45;
        break;
      case 'medium':
        rLimit = 10;
        num = 55;
        break;
      case 'hard':
        rLimit = 20;
        num = 65;
        break;
      default:

    }
    for (var i = 0; i < num; i++) {
      const r = Math.floor(Math.random() * rLimit) + 5;
      const x = this.randomCoords(r, this.width);
      const y = this.randomCoords(r, this.height);
      const circle = new Circle(x, y, r);
      this.circles.push(circle);
    }
  }

  randomCoords(r, dim) {
    let coord = Math.floor(Math.random() * (dim - 2*r)) + r;
    while (coord < dim / 2 + 100 && coord > dim / 2 - 100) {
      coord = Math.floor(Math.random() * (dim - 2*r)) + r;
    }
    return coord;
  }

  setDifficulty(d) {
    this.difficulty = d;
    this.reset();
  }

  bindKeyHandlers() {
    window.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 74:
          this.setDifficulty('easy');
          break;
        case 75:
          this.setDifficulty('medium');
          break;
        case 76:
          this.setDifficulty('hard');
          break;

        default:

      }
      if (e.keyCode === 32) {
        if (this.started) {
          this.paused = !this.paused;
        }
        this.started = true;
      }
      if (this.started) {
        const dir = getDir(e);
        if (dir[0]) {
          this.pressed.x = dir[0];
        }
        if (dir[1]) {
          this.pressed.y = dir[1];
        }
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
