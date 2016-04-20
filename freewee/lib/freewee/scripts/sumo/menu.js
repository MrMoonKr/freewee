var sumo,runtext;
var bgmusic;
var SumoMenu = {

    create: function () {

        bgmusic=game.add.audio('startMusic');
        bgmusic.loopFull(0.5); // use loopFull(volume) to loop the sound

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background image
        game.add.tileSprite(0,0,game.world.width,game.world.height,'menu');
        
        // Add menu screen.
        // It will act as a button to start the game.
        var butt=this.add.button(0, 0, 'menu', this.startGame, this);
        butt.height=game.world.height;
        butt.width=game.world.width;

        //adding of sumo sprite 
        sumo = game.add.sprite(0,game.world.height*0.5,'sumoSS');
        sumo.frame=16;
        sumo.scale.setTo(0.2);
        sumo.animations.add('running',[16,17],4,true);
        sumo.animations.play('running');
        game.physics.enable(sumo,Phaser.Physics.ARCADE);
        sumo.body.velocity.x=200;

        //adding of text as a sprite 
        runtext  = game.add.sprite(-1100,game.world.height*0.6,'runtext');
        runtext.scale.setTo(0.4);
        runtext.anchor.set(0,1);
        runtext.animations.add('run',[0,1],5,true);
        runtext.animations.play('run');
        game.add.tween(runtext).to({x:game.world.width*0.3},7000,Phaser.Easing.Linear.None,true);
    
        
         

    },

  
    startGame: function () {

        // Change the state to the actual game.
        this.state.start('SumoGame');

    }

};