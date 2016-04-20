var bgmusic;
var PlanetMenu = {



    create: function () {
        bgmusic=game.add.audio('startMusic');
        bgmusic.loopFull(0.5); // use loopFull(volume) to loop the sound

        this.physics.startSystem(Phaser.Physics.ARCADE);
        var butt= this.add.button(0, 0, 'menu', this.startGame, this);
        
        butt.height=game.world.height;
        butt.width=game.world.width;
        
        for (var i=0;i<4;i++){
            var cat = this.add.sprite(this.world.randomX, this.world.randomY, 'sumoSS');
            cat.scale.setTo(0.15);
            this.physics.enable(cat,Phaser.Physics.ARCADE);
            cat.frame=i;
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
        this.state.start('PlanetGame');

    }

};