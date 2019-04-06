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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assests/sky.png');
    this.load.image('ground', 'assests/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
}

function create() {
    this.add.image(400, 300, 'sky');
}

function update() {

}