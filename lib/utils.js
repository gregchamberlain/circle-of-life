export const randomVec = length => {
  const x = Math.random() * length * randNeg();
  const y = Math.sqrt((length * length) - (x * x)) * randNeg();
  return [x, y];
};

const randNeg = () => {
  const rand = Math.random();
  if (Math.random() > 0.5) {
    return 1;
  } else {
    return -1;
  }
};

export const DIMS = [
  window.innerWidth,
  window.innerHeight
];

export const KEYS = {
  left: 37,
  right: 39,
  up: 38,
  down: 40,
  a: 65,
  d: 68,
  w: 87,
  s: 83
};

export const getDir = e => {
  let dir = [];
  switch (e.keyCode) {
    case KEYS['left']:
    case KEYS['a']:
      dir = [-1, 0];
      break;
    case KEYS['right']:
    case KEYS['d']:
      dir = [1, 0];
      break;
    case KEYS['up']:
    case KEYS['w']:
      dir = [0, -1];
      break;
    case KEYS['down']:
    case KEYS['s']:
      dir = [0, 1];
      break;
  }
  return dir;
};

export const checkCollision = (c1, c2) => {
  const xDiff = c1.x - c2.x;
  const yDiff = c1.y - c2.y;
  const dist = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
  if (dist <= (c1.r + c2.r)) {
    if (c1.r + c1.growAmount >= c2.r + c2.growAmount && !c2.shrinking) {
      if (c2.name === 'Player') {
        console.log('Player!');
      }
      c2.shrink();
      c1.grow(c2.r);
    } else if (c2.r + c2.growAmount > c1.r + c1.growAmount && !c1.shrinking) {
      if (c1.name === 'Player') {
        console.log('Player!');
      }
      c1.shrink();
      c2.grow(c1.r);
    }
  }
};

const handleCollision = (c1, c2) => {
  const slope = [(c1.x - c2.x), (c1.y - c2.y)];
  const mag = Math.sqrt(slope[0] * slope[0] + slope[1] * slope[1]);
  const norm = [slope[0] / mag, slope[1] / mag];
  const ratioX = mag / slope[0];
  const ratioY = mag / slope[1];
  const addX1 = norm[0] * magn(c1);
  const addY1 = norm[1] * magn(c1);
  const addX2 = norm[0] * magn(c2);
  const addY2 = norm[1] * magn(c2);

  c1.momentum[0] += addX1;
  c1.momentum[1] += addY1;
  c2.momentum[0] += addX2;
  c2.momentum[1] += addY2;
};

const magn = c => {
  return Math.sqrt((c.momentum[0]*c.momentum[0]) + (c.momentum[1]*c.momentum[1]));
};
