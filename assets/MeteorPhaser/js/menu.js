var s;
var Menu = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        //game.stage.backgroundColor = '#f2784b'; //green background colour

        
        //game.load.spritesheet('wordSS','./img/menutextspritesheet.png',1175,1241);
        game.load.image('menu','./img/bg.jpg');
        
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0,0,game.world.width,game.world.height,'menu');
        this.add.button(0, 0, 'menu', this.startGame, this);
        
        
    },

    // update: function() {
    //     s.y-=10;
    // },

    
    startGame: function () {
       
        // Change the state to the actual game.
        this.state.start('Game');

    }

};