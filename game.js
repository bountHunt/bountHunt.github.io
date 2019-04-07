var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    this.add.image(400, 250, 'background');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 468, 'ground').setScale(2).refreshBody();

    platforms.create(600, 300, 'ground');
    platforms.create(50, 150, 'ground');
    platforms.create(750, 120, 'ground');
}

function update ()
{
}
