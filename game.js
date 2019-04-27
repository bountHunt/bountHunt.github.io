





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
        this.load.image('gameover', 'assets/gameover.png')

    },
    

    create: function() {
        this.add.sprite(400,300, 'gameover').setScale(2).refreshBody;

        this.input.once('pointerdown', function () {

            console.log('From Game Over to Game');

            this.scene.start('game');

        }, this);
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
        this.load.image('victory', 'assets/NEW-BACKGROUND.png')

    },
    

    create: function() {
        this.add.image(400, 300, 'victory').setScale(2).refreshBody

        this.add.text(400, 300, 'YOU WIN!!', { fontSize: '64px', fill: '#FFF' });
        this.add.text(400, 400, 'Refresh to restart all over again :)', { fontSize: '32px', fill: '#FFF' });
        this.add.text(400, 450, 'THANKS FOR PLAYING!!!', { fontSize: '16px', fill: '#FFF' });

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
var rect;
var points;
var index = 0;
var graphics;
var highscore = 0;
var x = 0.001;

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
        this.load.audio('theme', [
            'assets/backgroundMusic.mp3'
        ]);
        this.load.image('right-bullet','assets/right-boss.png');
        this.load.image('left-bullet','assets/left-boss.png');

    },

    create: function()
    {
        score = 0;
        console.log('Enjoy the Game :)');
        this.data.set('highscore', highscore)
        
        

        this.sound.pauseOnBlur = false;
        
        var music = this.sound.add('theme');

        music.loop = true;

        music.play();
        //  A simple background for our game
        this.add.image(400, 300, 'sky').setScale(2).refreshBody;

        platform = this.physics.add.staticGroup();

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        platfor = this.physics.add.staticGroup();
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 605, 'ground').setScale(1).refreshBody();
        //  Now let's create some ledges
        platfor.create(400, 250, 'platform');
        platfor.create(368, 250, 'platform');
        platfor.create(432, 250, 'platform');
        platfor.create(464, 250, 'platform');
        platfor.create(336, 250, 'platform');
        platform.create(33, 530, 'stage');
        platform.create(163, 530, 'stage');
        platform.create(293, 530, 'stage');
        platform.create(423, 530, 'stage');
        platform.create(553, 530, 'stage');
        platform.create(683, 530, 'stage');
        //platform.create(33+65, 480, 'stage');
        //platform.create(163+65,480, 'stage');
        //platform.create(293+65,480, 'stage');
        //platform.create(423+65, 480, 'stage');
        //platform.create(553+65, 480, 'stage');
        //platform.create(768+65, 480, 'stage');
        //platform.create(683+65, 480, 'stage');
        platform.create(33, 380, 'stage');
        platform.create(163, 380, 'stage');
        platform.create(293, 380, 'stage');
        platform.create(423, 380, 'stage');
        platform.create(553, 380, 'stage')
        platform.create(683, 380, 'stage');
        platform.create(33+65, 450, 'stage');
        platform.create(163+65,450, 'stage');
        platform.create(293+65,450, 'stage');
        platform.create(423+65, 450, 'stage');
        platform.create(553+65, 450, 'stage');
        platform.create(768+65, 450, 'stage');
        platform.create(683+65, 450, 'stage');

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'bount');
        boss = this.physics.add.sprite(400,100, 'boss-idle');
        boss.setBounce(0.5);
        boss.setCollideWorldBounds(true);
        boss.setScale(2);
        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        // = this.physics.add.group();

        //leftbullet = this.physics.add.group();

        //this.physics.add.collider(rightbullet, platforms);

        //this.physics.add.collider(leftbullet, platforms);

        //this.physics.add.collider(player, leftbullet, hitLeft, null, this);

        //this.physics.add.collider(player, rightbullet, hitRight, null, this);

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

        this.anims.create({
            key: 'right-flex',
            frames:
            this.anims.generateFrameNumbers('boss-right', {start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left-flex',
            frames:
            this.anims.generateFrameNumbers('boss-left', {start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'bothArms',
            frames:
            this.anims.generateFrameNumbers('boss-idle', {start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 5,
            setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 300), stepX: Phaser.Math.Between(64, 200) }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounce(1);
            child.setCollideWorldBounds(true);
            child.setVelocity(Phaser.Math.Between(-200, 200), 20);

        });

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
        highscoreText = this.add.text(18, 50, 'high score: 0', { fontSize: '16px', fill: '#FFF' });

        highscoreText.setText('High Score: ' + this.data.get('highscore'));

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, platform);
        this.physics.add.collider(boss, platform);
        this.physics.add.collider(boss, platfor);
        this.physics.add.collider(boss, platforms);
        this.physics.add.collider(stars, platform);
        this.physics.add.collider(stars, platforms)
        this.physics.add.collider(stars, stars);
        this.physics.add.overlap(player, stars, collectStar, null, this);

        
        
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        function collectStar (player, star)
        {
            star.disableBody(true, true);
                    
            score += 10;
            scoreText.setText('Score: ' + score);
            
            if (stars.countActive(true) === 0){
                stars.children.iterate(function (child) {
                    child.enableBody(true, Phaser.Math.Between(0,800), 0, true, true);
                    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
                    

                    
                })
            };
        }

        function hitBomb(player, bomb)
        {
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            this.scene.start('boss');
        }

        
            
    },

    update: function()
    {


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
            player.setVelocityY(-300);
        }
        if (score > 50){
            boss.anims.play('right-flex');

        }else if (score>100){
            if (Phaser.Math.FloatBetween(0, 1) < 0.001) {
                boss.anims.play('left-flex');
            }
        }else if (score>300){
            if (Phaser.Math.FloatBetween(0, 1) < 0.001) {
                boss.anims.play('bothArms');
            }
        }

        if (score == 100) {
            x = 0.005;
        }

        if (score == 150){
            x = 0.01;
        }

        if (score == 200){
            x = 0.05;
        }

        if (score == 500) {
            x = 0.1
        }

        if (score == 1000) {
            x = 0.3
        }


        if(score > highscore){
            highscore = score;
        
        }

        if (Phaser.Math.FloatBetween(0, 1) < x) {
            var bomb = bombs.create(0, 415, 'right-bullet');
            bomb.setBounceX(1);
            bomb.setCollideWorldBounds(false);
            bomb.setVelocityX(Phaser.Math.Between(10, 200));
            bomb.body.allowGravity = false;
        }

        if (Phaser.Math.FloatBetween(0, 1) < x) {
            var bomb = bombs.create(0, 345, 'right-bullet');
            bomb.setBounceX(1);
            bomb.setCollideWorldBounds(false);
            bomb.setVelocityX(Phaser.Math.Between(10, 200));
            bomb.body.allowGravity = false;
        }

        if (Phaser.Math.FloatBetween(0, 1) < x) {
            var bomb = bombs.create(0, 565, 'right-bullet');
            bomb.setBounceX(1);
            bomb.setCollideWorldBounds(false);
            bomb.setVelocityX(Phaser.Math.Between(10, 200));
            bomb.body.allowGravity = false;
        }

        if (Phaser.Math.FloatBetween(0, 1) < x) {
            var bomb = bombs.create(0, 495, 'right-bullet');
            bomb.setBounceX(1);
            bomb.setCollideWorldBounds(false);
            bomb.setVelocityX(Phaser.Math.Between(10, 200));
            bomb.body.allowGravity = false;
        }
    },

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