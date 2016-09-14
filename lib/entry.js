import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const Canvas = document.getElementById('canvas');
  Canvas.width = document.body.clientWidth;
  Canvas.height = document.body.clientHeight;
  const ctx = Canvas.getContext('2d');
  const gameView = new GameView(ctx);
  gameView.start();
});
