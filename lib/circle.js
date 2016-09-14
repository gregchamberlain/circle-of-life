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
    this.momentum = randomVec(10);
    this.color = 'rgba(0, 0, 0, 0.7)';
  }

  update(dt) {

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

}

export default Circle;
