var Game = {};

Game.boot = function(game) {

};

Game.boot.prototype = {
    init:function(){

      this.input.maxPointers = 1;

      this.stage.disableVisibilityChange = true;

    },

    preload:function(){
      this.load.image('preloaderBar', 'assets/preloader.png');
    },

    create:function(){
      this.state.start('Preloader');
    }
}