class MenuScene extends Phaser.Scene {
    constructor() {
        super({key:"MenuScene"});
    }

    preload() {
        this.load.image('background', 'assets/background.jpg');

    }

    create() {
        this.image = this.add.image(400,300, 'background');
    }
}
