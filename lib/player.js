import Circle from './circle';
import { DIMS } from './utils';
class Player extends Circle {
  constructor() {
    super(DIMS[0] / 2, DIMS[1] / 2, 7, 'red', [0, 0]);
    this.name = 'Player';
  }

  update(dt, dir) {
    this.momentum[0] += dir.x;
    this.momentum[1] += dir.y;
    if (this.momentum[0] > 10 + this.r / 2) {
      this.momentum[0] = 10 + this.r / 2;
    }
    if (this.momentum[1] > 10 + this.r / 2) {
      this.momentum[1] = 10 + this.r / 2;
    }
    if (this.momentum[0] < -10 - this.r / 2) {
      this.momentum[0] = -10 - this.r / 2;
    }
    if (this.momentum[1] < -10 - this.r / 2) {
      this.momentum[1] = -10 - this.r / 2;
    }
    Circle.prototype.update.call(this, dt);
  }
}

export default Player;
