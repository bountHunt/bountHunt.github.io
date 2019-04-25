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
        this.load.tilemap('mainMenuBackground', 'assets/mainmenubackground.csv');
        this.load.tilemap('mainMenuPlatforms', 'assets/mainmenu_platfor.csv');
        this.load.image('tilesetBackground', 'assets/mainmenu.png');
        this.load.image('tilesetPlatform', 'assets/platfor.png');

    },
    

    create: function() {
        map.addTilesetimage('tilesetBackground');
        map.addTilesetimage('tilesetPlatform');

        layer = map.createLayer(1);

        layer.resizeWorld();
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
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('bount', 'assets/full-sprite.png', { frameWidth: 42, frameHeight: 37});
    },

    create: function()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'bount');

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

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

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