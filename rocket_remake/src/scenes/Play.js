class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        //load spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
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
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //initializes player scores
        this.p1Score = 0;

        //displays score
        let scoreConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', 
        align: 'right',
        padding: {top: 5, bottom: 5}, fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding * 2, 
            this.p1Score, scoreConfig);

    }

    update() {
        this.starfield.tilePositionX -=4;   //The background sprite moving to the left

        this.p1Rocket.update();             //the constant updating of player rocket
        
        //Updating of all ships, allows them to move left on screen
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

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
      }

}