import Circle from './circle';
import { DIMS, checkCollision } from './utils';
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.circles = [];
    this.addCircles();
  }

  update(dt) {
    for (var i = 0; i < this.circles.length; i++) {
      for (var j = i+1; j < this.circles.length; j++) {
        checkCollision(this.circles[i], this.circles[j]);
      }
    }
    this.circles.forEach(circle => {
      circle.update(dt);
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
}

export default Game;
