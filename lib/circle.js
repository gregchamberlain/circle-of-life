import { randomVec, DIMS } from './utils';

const COLORS = [
  'red',
  'black',
  'blue',
  'purple',
  'pink',
  'green',
  'yellow'
];

class Circle {
  constructor(x, y, r, c = 'rgba(0, 0, 0, 0.7)', m = randomVec(5)) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.growAmount = 0;
    this.shrinking = false;
    this.momentum = m;
    this.color = c;
  }

  update(dt, _, started) {
    if (this.shrinking) {
      this.r -= 1;
    } else if (this.growAmount) {
      this.r += 1;
      this.growAmount -= 1;
    }
    if (this.x < this.r) {
      this.x += this.r - this.x;
    }
    if (this.y < this.r) {
      this.y += this.r - this.y;
    }
    if (this.x > (DIMS[0] - this.r)) {
      this.x += (DIMS[0] - this.r) - this.x;
    }
    if (this.y > (DIMS[1] - this.r)) {
      this.y += (DIMS[1] - this.r) - this.y;
    }

    const nextX = this.x + this.momentum[0] * dt / this.r;
    const nextY = this.y + this.momentum[1] * dt / this.r;
    if (nextX > (DIMS[0] - this.r) || nextX < this.r) {
      this.momentum[0] *= -1;
    }
    if (nextY > (DIMS[1] - this.r) || nextY < this.r) {
      this.momentum[1] *= -1;
    }
    if (!started) {
      if (nextX < DIMS[0]  / 2 + 100 &&
        nextX > DIMS[0]  / 2 - 100 &&
        nextY < DIMS[1]  / 2 + 100 &&
        nextY > DIMS[1]  / 2 - 100) {
        this.momentum[0] *= -1;
        this.momentum[1] *= -1;
      }
    }
    this.x += (this.momentum[0] * dt / this.r);
    this.y += (this.momentum[1] * dt / this.r);
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
  }

  grow(num) {
    this.growAmount += Math.round(num / 2);
  }

  shrink() {
    this.shrinking = true;
  }

}

export default Circle;
