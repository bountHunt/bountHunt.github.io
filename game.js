var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
var platforms;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    this.load.image('background', 'assets/background.png');
}

function create() {
    this.add.image(400, 250, 'background');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
}

function update() {

}