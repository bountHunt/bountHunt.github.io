var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scene: [MenuScene, game, main]
};

var game = new Phaser.Game(config);