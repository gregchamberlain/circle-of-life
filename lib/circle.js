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
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.growAmount = 0;
    this.shrinking = false;
    this.momentum = randomVec(5);
    this.color = 'rgba(0, 0, 0, 0.7)';
  }

  update(dt) {
    if (this.shrinking) {
      this.r -= 1;
    } else if (this.growAmount) {
      this.r += 1;
      this.growAmount -= 1;
    }

    const nextX = this.x + this.momentum[0] * dt / this.r;
    const nextY = this.y + this.momentum[1] * dt / this.r;
    if (nextX > (DIMS[0] - this.r) || nextX < this.r) {
      this.momentum[0] *= -1;
    }
    if (nextY > (DIMS[1] - this.r) || nextY < this.r) {
      this.momentum[1] *= -1;
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
