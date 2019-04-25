





var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function ()
    {
        this.load.image('background', 'assets/start.png');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'background').setScale(2).refreshBody;

        this.input.once('pointerdown', function () {

            console.log('From Loading to MainMenu');

            this.scene.start('game');

        }, this);
    }

});

var boss = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Boss () {
        Phaser.Scene.call(this, {key: 'boss'})
    },

    preload: function(){
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('bount', 'assets/full-sprite.png', { frameWidth: 42, frameHeight: 37});
        this.load.image('backgrounds', 'bossbackground.png')

    },
    

    create: function() {
        this.add.sprite(400,300, 'backgrounds').setScale(0.5).refreshBody;
    },

    update: function() {

    },


});

var map;
var layer;

var MainMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
    function Menu (){
        Phaser.Scene.call(this, { key: 'MainMenu' })
    },

    preload: function(){
        this.load.tilemapTiledJSON('map', 'assets/bounthunt.json');
        this.load.image('groundTiles', 'assets/.png');
        this.load.image('tilesetPlatform', 'assets/platfor.png');

    },
    

    create: function() {
        var map = this.make.tilemap({ key: 'map' });
        var ground = map.addTilesetImage('kenny_ground_64x64', 'ground');
        var slants = map.addTilesetImage('kenny_ground_64x64', 'ground');
        var chains =   map.addTilesetImage('kenny_ground_64x64', 'ground');
        var spikes = map.addTilesetImage('kenny_ground_64x64', 'ground');


        map.createStaticLayer('Tile Lyaer 1', [ground, slants, chains, spikes])
    },

    update: function() {

    },
})

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var Game = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

    function Game (){
        Phaser.Scene.call(this, { key: 'game'})
    },

    preload: function ()
    {
        this.load.image('sky', 'assets/NEW-BACKGROUND.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('bount', 'assets/full-sprite.png', { frameWidth: 42, frameHeight: 37});
        this.load.image('platform', 'assets/platfor.png');
        this.load.spritesheet('boss-idle', 'assets/Cat-Man-TOO-THICK.png', {frameWidth: 80, frameHeight: 101});
        this.load.spritesheet('boss-right', 'assets/Cat-Man-Right-ARM.png', {frameWidth: 80, frameHeight: 101});
        this.load.spritesheet('boss-left', 'assets/Cat-Man-Left-ARM.png', {frameWidth: 80, frameHeight: 101});
        this.load.image('stage','assets/new-platform.png');
    },

    create: function()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky').setScale(2).refreshBody;

        platform = this.physics.add.staticGroup();

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 605, 'ground').setScale(1).refreshBody();
        //  Now let's create some ledges
        platform.create(400, 300, 'platform');
        platform.create(368, 300, 'platform');
        platform.create(432, 300, 'platform');
        platform.create(464, 300, 'platform');
        platform.create(336, 300, 'platform');
        platform.create(33, 530, 'stage');
        platform.create(163, 530, 'stage');
        platform.create(293, 530, 'stage');
        platform.create(423, 530, 'stage');
        platform.create(553, 530, 'stage');
        platform.create(768, 530, 'stage');
        platform.create(683, 530, 'stage');
        platform.create(33+65, 480, 'stage');
        platform.create(163+65,480, 'stage');
        platform.create(293+65,480, 'stage');
        platform.create(423+65, 480, 'stage');
        platform.create(553+65, 480, 'stage');
        platform.create(768+65, 480, 'stage');
        platform.create(683+65, 480, 'stage');
        platform.create(33, 430, 'stage');
        platform.create(163, 430, 'stage');
        platform.create(293, 430, 'stage');
        platform.create(423, 430, 'stage');
        platform.create(553, 430, 'stage')
        platform.create(683, 430, 'stage');
        platform.create(33+65, 380, 'stage');
        platform.create(163+65,380, 'stage');
        platform.create(293+65,380, 'stage');
        platform.create(423+65, 380, 'stage');
        platform.create(553+65, 380, 'stage');
        platform.create(768+65, 380, 'stage');
        platform.create(683+65, 380, 'stage');

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'bount');
        boss = this.physics.add.sprite(400,100, 'boss-idle');
        boss.setBounce(0.5);
        boss.setCollideWorldBounds(true);
        boss.setScale(2);
        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('bount', { start: 4, end: 12 }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames:
            this.anims.generateFrameNumbers('bount', {start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('bount', { start: 13, end:  21}),
            frameRate: 24,
            repeat: 1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(player, platform);
        this.physics.add.collider(boss, platform);
        this.physics.add.collider(boss, platforms);
        this.physics.add.collider(boss, player);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        
    },

    update: function()
    {
        if (gameOver)
        {
            return;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-120);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(120);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-250);
        }
    }

});


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [SceneA, boss, Game, MainMenu],
};

var game = new Phaser.Game(config);