class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //adds to existing scene
        this.points = 1;   //stores pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         //pixels per frame ships move at
    }

    update() {
        //ships move left
        this.x -= this.moveSpeed;

        //if ship hits end of screen, reset to other side
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }

    moveSpeedFast() {
        this.moveSpeed += 1;
    }

}