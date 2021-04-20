class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/new_starfield.png');
        this.load.image('rocket', 'assets/new_rocket.png');
        //load spritesheet
        this.load.spritesheet('gold', 'assets/new_spaceship2.png', {frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 7});
        this.load.spritesheet('spaceship', 'assets/new_spaceship.png', {frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.spritesheet('explosion', 'assets/new_explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 18});
    }

    create() {

        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);

        this.p1Rocket = new Rocket(this, 
            game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 
            'rocket'
            );

        this.add.existing(this.p1Rocket);

        this.ship1 = new Ship (
            this, 100, 200, 'spaceship'
        );

        this.ship2 = new Ship (
            this, 300, 240, 'spaceship'
        );

        this.ship3 = new Ship (
            this, 380, 300, 'spaceship'
        );

        this.goldShip = new Gold(this, 150, 250, 'gold');

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00, ).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 18, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'woosh',
            frames: this.anims.generateFrameNumbers('spaceship', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'goldWoosh',
            frames: this.anims.generateFrameNumbers('gold', {start: 0, end: 7, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        //play all sprite animations on space ships
        this.ship1.anims.play('woosh');

        this.ship2.anims.play('woosh');

        this.ship3.anims.play('woosh');

        this.goldShip.anims.play('goldWoosh');

        //initializes player scores
        this.p1Score = 0;

        //displays score
        let scoreConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', 
        align: 'right',
        padding: {top: 5, bottom: 5}, fixedWidth: 100
        }
        //score box on left side
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding * 2, 
            this.p1Score, scoreConfig);
        
        //Highscore box on right side
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, 
            borderUISize + borderPadding * 2, 
            highScore, scoreConfig);

        scoreConfig.fixedWidth = 0;
        
        //display for Highscore also on right side
        this.displayHS = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth * 2 - 225, 
            borderUISize + borderPadding * 2, 
            'Highscore', 
            scoreConfig);


        //displays clock

        //GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if(this.p1Score > highScore){
                highScore = this.p1Score;
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        //check key input for restart (if they press 'R')
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -=4;   //The background sprite moving to the left

        if (!this.gameOver) {
            this.p1Rocket.update();             //the constant updating of player rocket
        
            //Updating of all ships, allows them to move left on screen
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();

            this.goldShip.update();
        }

        //this.checkCollision(this.p1Rocket, this.ship1);
        //this.checkCollision(this.p1Rocket, this.ship2);
        //this.checkCollision(this.p1Rocket, this.ship3);

        //Calls on checkCollision to check if collison occurs if true
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }
        if (this.checkCollision(this.p1Rocket, this.goldShip)) {
            this.p1Rocket.reset();
            this.shipExplode(this.goldShip);
        }

    }

    //collision method
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        //score adding and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion')
      }

}