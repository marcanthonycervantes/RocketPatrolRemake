let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;

let highScore = 0;

//For modding the original game, it has taken me more than 10 hours

//Points Breakdown:
//Starting Tier 
//- Track a high score that persists across scenes and display it in the UI (5)
//- Implement the speed increase that happens after 30 seconds in the original game (5)
//- Create a new scrolling tile sprite for the background (5)
//Novice Tier
//- Display the time remaining (in seconds) on the screen (10)
//- Create a new animated sprite for the Spaceship enemies (10)
//- Create 4 new explosion SFX and randomize which one plays on impact (10)
//- Create a new title screen (e.g., new artwork, typography, layout) (10)
//- Implement parallax scrolling (10)
//Intermediate Tier
//- Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//- Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)