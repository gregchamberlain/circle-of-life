import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(ctx.canvas.width, ctx.canvas.height);
    this.lastTime = 0;
  }

  start() {
    this.update(0);
  }

  update(time) {
    let dt = time - this.lastTime;
    this.lastTime = time;
    this.game.update(dt / 20);
    this.game.render(this.ctx);
    window.requestAnimationFrame(dTime => {
      this.update(dTime);
    });
  }
}

export default GameView;
