var sumo,runtext;
var bgmusic;
var SumoMenu = {


    // migrated to preload.js
    /*preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', '/img/sumo/grassfield2.png');
        game.load.image('runtext','/img/sumo/RunSumoRun.png');
        game.load.image('track','/img/sumo/track.png');
        game.load.image('gameover', '/img/sumo/grassfield3.png');
        game.load.image('sumoInstructions','/img/sumo/gameInstructions11.png');


        game.load.spritesheet('sumoWLSS','/img/sumo/sumolosewinspritesheet.png',969,914);      
        game.load.spritesheet('sumoSS','/img/sumo/sumoRunSpriteSheet.png',773,914);
        

        game.load.audio('startMusic','/sound/sumo/SumoRunBgmBeforeRace.mp3');
        game.load.audio('breathing','/sound/sumo/breathShort.mp3');
        game.load.audio('cheering','/sound/sumo/cheerSoundShort.mp3');
        game.load.audio('countdown','/sound/sumo/countdown.mp3');

        
    
    },*/

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
        sumo = game.add.sprite(0,game.world.height*0.4,'sumoSS');
        sumo.frame=16;
        sumo.scale.setTo(0.15);
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
        game.add.tween(runtext).to({x:200},7000,Phaser.Easing.Linear.None,true);
    
        game.time.events.add(3000,function(){
            var text=game.add.text(game.world.width*0.4,game.world.height*0.7,'Click to start!',{font:'25px Arial',fill:'#0095DD'});
            text.alpha=0;
            game.add.tween(text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,1000,true);
                    
        });
         

    },

  
    startGame: function () {

        // Change the state to the actual game.
        this.state.start('SumoGame');

    }

};