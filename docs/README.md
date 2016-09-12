# Circle Of Life

## Background
Circle Of Life is a game very similar to agar.io. In this game a board is generated with many circles of random sizes. The goal of the user is to run into the circles smaller than they currently are and when contact is made they will consume that circle and grow in size. If the player makes contact with a circle larger than itself they lose and the game is over. In addition the user must shoot out some of its mass in order to change direction. The end goal of the game is to consume all the circles on the board and be the last left on the board.

## Fucntionality & MVP
In Circle of Life Users will be able to
- [ ] Start, pause, and be able to play again after winning/losing
- [ ] Use the arrows or aswd keys to control their player
- [ ] Choose difficulty (initial amount/size of enemy circles)
The project will also include
- [ ] Initial overlay with direction/controls
- [ ] Game over/winning screen with play again options
- [ ] Production README

## Wireframes
Circle of Life will consist of a single screen, where the whole screen is filled with the board. An overlay will be presented when the user enters the site with a main menu displaying directions, controls, difficulty settings, a start button and links to Github and LinkedIn. When the player starts the game the overlay will disappear and the user will continue to playing the game. When the player either wins or loses a similar overlay will be presented but including telling the user that the had won or lost.

![Start Screen](wireframes/start.png)
![End Screen](wireframes/end.png)
![Game Screen](wireframes/game.png)
## Architecture and Technologies
This project will be implemented with these Technologies
- Vanilla Javascript for game logic and board control.
- Easel.js for easier manipulation of the HTML5 canvas.
- Webpack to bundle the project from many files.

The structure of the project will include the following.
- `game.js` - A script that will handle most game logic, including holding and updating entities (player/enemies), user input, handling collisions and passing the board data to render.
- `board.js` - A script that will use `Easel.js` to render the data passed in from `game.js`.
- `circle.js` - This will be a class holding data and helper functions for each `Circle` object in the game.

## Timeline
**Day 1**: 
