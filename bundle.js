/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game_view = __webpack_require__(1);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var Canvas = document.getElementById('canvas');
	  Canvas.width = document.body.clientWidth;
	  Canvas.height = document.body.clientHeight;
	  var ctx = Canvas.getContext('2d');
	  var gameView = new _game_view2.default(ctx);
	  gameView.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.game = new _game2.default(ctx.canvas.width, ctx.canvas.height);
	    this.lastTime = 0;
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      this.update(0);
	    }
	  }, {
	    key: 'update',
	    value: function update(time) {
	      var _this = this;
	
	      var dt = time - this.lastTime;
	      this.lastTime = time;
	      this.game.update(dt / 20);
	      this.game.render(this.ctx);
	      window.requestAnimationFrame(function (dTime) {
	        _this.update(dTime);
	      });
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _circle = __webpack_require__(3);
	
	var _circle2 = _interopRequireDefault(_circle);
	
	var _utils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(width, height) {
	    _classCallCheck(this, Game);
	
	    this.width = width;
	    this.height = height;
	    this.circles = [];
	    this.addCircles();
	  }
	
	  _createClass(Game, [{
	    key: 'update',
	    value: function update(dt) {
	      for (var i = 0; i < this.circles.length; i++) {
	        for (var j = i + 1; j < this.circles.length; j++) {
	          (0, _utils.checkCollision)(this.circles[i], this.circles[j]);
	        }
	      }
	      this.circles.forEach(function (circle) {
	        circle.update(dt);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      ctx.clearRect(0, 0, _utils.DIMS[0], _utils.DIMS[1]);
	      this.circles.forEach(function (circle) {
	        circle.render(ctx);
	      });
	    }
	  }, {
	    key: 'addCircles',
	    value: function addCircles() {
	      for (var i = 0; i < 25; i++) {
	        var r = Math.floor(Math.random() * i * 4) + 3;
	        var x = Math.floor(Math.random() * (this.width - 2 * r)) + r;
	        var y = Math.floor(Math.random() * (this.height - 2 * r)) + r;
	        var circle = new _circle2.default(x, y, r);
	        this.circles.push(circle);
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var COLORS = ['red', 'black', 'blue', 'purple', 'pink', 'green', 'yellow'];
	
	var Circle = function () {
	  function Circle(x, y, r) {
	    _classCallCheck(this, Circle);
	
	    this.x = x;
	    this.y = y;
	    this.r = r;
	    this.momentum = (0, _utils.randomVec)(10);
	    this.color = 'rgba(0, 0, 0, 0.7)';
	  }
	
	  _createClass(Circle, [{
	    key: 'update',
	    value: function update(dt) {
	
	      var nextX = this.x + this.momentum[0] * dt / this.r;
	      var nextY = this.y + this.momentum[1] * dt / this.r;
	      if (nextX > _utils.DIMS[0] - this.r || nextX < this.r) {
	        this.momentum[0] *= -1;
	      }
	      if (nextY > _utils.DIMS[1] - this.r || nextY < this.r) {
	        this.momentum[1] *= -1;
	      }
	      this.x += this.momentum[0] * dt / this.r;
	      this.y += this.momentum[1] * dt / this.r;
	    }
	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
	      ctx.fill();
	    }
	  }]);
	
	  return Circle;
	}();
	
	exports.default = Circle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var randomVec = exports.randomVec = function randomVec(length) {
	  var x = Math.random() * length;
	  var y = Math.sqrt(length * length - x * x);
	  return [x, y];
	};
	
	var DIMS = exports.DIMS = [window.innerWidth, window.innerHeight];
	
	var checkCollision = exports.checkCollision = function checkCollision(c1, c2) {
	  var xDiff = c1.x - c2.x;
	  var yDiff = c1.y - c2.y;
	  var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	  if (dist <= c1.r + c2.r) {
	    var scale = (c1.r + c2.r) / dist;
	    c1.x = c2.x + xDiff * scale;
	    c1.y = c2.y + yDiff * scale;
	    // handleCollision(c1, c2);
	    // c1.momentum[0] *= -1;
	    // c1.momentum[1] *= -1;
	    // c2.momentum[0] *= -1;
	    // c2.momentum[1] *= -1;
	  }
	};
	
	var handleCollision = function handleCollision(c1, c2) {
	  var slope = [c1.x - c2.x, c1.y - c2.y];
	  var mag = Math.sqrt(slope[0] * slope[0] + slope[1] * slope[1]);
	  var norm = [slope[0] / mag, slope[1] / mag];
	  var ratioX = mag / slope[0];
	  var ratioY = mag / slope[1];
	  var addX1 = norm[0] * magn(c1);
	  var addY1 = norm[1] * magn(c1);
	  var addX2 = norm[0] * magn(c2);
	  var addY2 = norm[1] * magn(c2);
	
	  c1.momentum[0] += addX1;
	  c1.momentum[1] += addY1;
	  c2.momentum[0] += addX2;
	  c2.momentum[1] += addY2;
	};
	
	var magn = function magn(c) {
	  return Math.sqrt(c.momentum[0] * c.momentum[0] + c.momentum[1] * c.momentum[1]);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map