class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
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
            this.p1Rocket.reset();  //rocket reset to bottom of screen
            this.ship3.reset();     //ship reset to right of screen
        }

        if(this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.ship2.reset();
        }

        if(this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.ship1.reset();
        }

    }

    //collision method
    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y){
                ship.alpha = 0;
                rocket.reset();
                ship.reset();
            }
    }

}