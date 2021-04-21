class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        //loads the title sprite for the menu screen
        this.load.spritesheet('titleSprite', './assets/rocket_title.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 6});

        //loads the audio for whole game
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_explosion1', 'assets/explosion1.wav');
        this.load.audio('sfx_explosion2', 'assets/explosion2.wav');
        this.load.audio('sfx_explosion3', 'assets/explosion3.wav');
        this.load.audio('sfx_explosion4', 'assets/explosion4.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
    }

    create() {
        //
        this.rocketTitle = this.add.tileSprite(game.config.width / 2, game.config.height / 4, 640, 480, 'titleSprite');

        this.anims.create({
            key: 'rTitle',
            frames: this.anims.generateFrameNumbers('titleSprite', {start: 0, end: 6, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.rocketTitle.anims.play('rTitle');

        //menu text config
        let menuConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#810000', color: '#eeebdd', 
        align: 'right',
        padding: {top: 5, bottom: 5}, fixedWidth: 0
        }

        this.add.text(game.config.width / 2, 
                game.config.height / 1.5, 'Use <- -> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#1b1717';
        menuConfig.color = '#eeebdd'
        this.add.text(game.config.width / 2, 
            game.config.height / 1.5 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');

        }
    }

}