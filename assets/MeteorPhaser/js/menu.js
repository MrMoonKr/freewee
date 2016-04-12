var s;
var Menu = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        //game.stage.backgroundColor = '#f2784b'; //green background colour

        
        //game.load.spritesheet('wordSS','./img/menutextspritesheet.png',1175,1241);
        game.load.image('menu','./img/menupage.jpg');
        game.load.spritesheet('catSS','./img/catsprite.png',568,758);
        
    },

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.button(0, 0, 'menu', this.startGame, this);
        for (var i=0;i<4;i++){
            var cat = this.add.sprite(this.world.randomX, this.world.randomY, 'catSS');
            cat.scale.setTo(0.15);
            this.physics.enable(cat,Phaser.Physics.ARCADE);

            cat.body.collideWorldBounds=true;
            cat.body.bounce.x=1;
            cat.body.bounce.y=1;
            cat.body.angularVelocity= this.rnd.integerInRange(50,100);
            cat.body.velocity.set(this.rnd.integerInRange(50,100));
    
        }
        
        
        
    },

    // update: function() {
    //     s.y-=10;
    // },

    
    startGame: function () {
       
        // Change the state to the actual game.
        this.state.start('Game');

    }

};