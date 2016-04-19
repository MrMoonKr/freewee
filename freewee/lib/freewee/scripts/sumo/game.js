
/******************************************************************************/
/********************************* GAME LOGIC *********************************/
/******************************************************************************/


// var numPlayers=4; 
var winnerPositions,trackposition;

var trackGroup,collisionGroup,cursors;
var count,speed,placing;

var breathingSound,cheeringSound,countDown;

var timer,loop;

var sounds;

var Y = [0,0,0,0];
var lastY = [0,0,0,0];
var lastGamma = [0,0,0,0];

var SumoGame = {

    preload : function() {
        //for scaleMode: exists 
//      *NO_SCALE — nothing is scaled.
//      *EXACT_FIT — scale the canvas to fill all the available space both vertically and horizontally, without preserving the aspect ratio.
//      *SHOW_ALL — scales the canvas, but keeps the aspect ratio untouched, so images won't be skewed like in the previous mode. There might be black stripes visible on the edges of the screen, but we can live with that.
//      *RESIZE — creates the canvas with the same size as the available width and height, so you have to place the objects inside your game dynamically; this is more of an advanced mode.
//      *USER_SCALE — allows you to have custom dynamic scaling, calculating the size, scale and ratio on your own; again, this is more of an advanced mode

        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#D7E4BD'; //green background colour

        //load the sumo and the track 
        // game.load.spritesheet('sumoSS','/img/sumo/sumoRunSpriteSheet.png',773,914);
        
        // game.load.image('track','/img/sumo/track.png');
        // game.load.audio('breathing','/sound/sumo/breathShort.mp3');
        // game.load.audio('cheering','/sound/sumo/cheerSoundShort.mp3');
        // game.load.audio('countdown','/sound/sumo/countdown.mp3');
        // game.load.image('gameover', '/img/sumo/grassfield3.png');

        // game.load.spritesheet('sumoWLSS','/img/sumo/sumolosewinspritesheet.png',969,914);
        


    },

    create : function() {

        //loading sounds
        cheeringSound = this.add.audio('cheering');
        countDown = this.add.audio('countdown');

        game.physics.startSystem(Phaser.Physics.ARCADE);
       

        winnerPositions=[];
        count=[0,0,0,0];
        speed=[2,2,2,2];
        placing=0;
        sounds=[];

        //just to keep track of what coordinates to shift to, according to number of players
        trackposition={
            1:0.5,
            2:0.34,
            3:0.27,
            4:0.2 
        }

        //bottomost layer, group for all tracks  
        trackGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        collisionGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        for (var i =0;i<numPlayers;i++){
            //add track sprite to trackGroup 
            var track = trackGroup.create(game.world.width*trackposition[numPlayers]+220*i,0,'track');
            track.anchor.set(0,0);
            track.scale.setTo(1,(game.world.height/track.height));
            track.name=i;
        
            //creating the sumo
            var s = collisionGroup.create(game.world.width*trackposition[numPlayers]+50+200*i,0,'sumoSS');
            s.frame=4*i; //different frame for diff sumo 
            s.reached=false;
            s.name=i;
            s.anchor.set(0,0);
            s.scale.setTo(0.2,0.2);
            s.body.collideWorldBounds=true;
            s.body.bounce.x=1;
            s.body.bounce.y=1;
            game.physics.enable(s,Phaser.Physics.ARCADE);

            sounds[i]=this.add.audio('breathing');
            
        
                       
        }
        //disable sumo's collision with bottom edge of screen,  ball will fall off)
        game.physics.arcade.checkCollision.down=false; 

       
        //on loop
        timer=game.time.events;
        loop=timer.loop(1000,this.startDecrement,this);

    }, 

    update:function() {

       //collision event listener 
       game.physics.arcade.collide(collisionGroup,collisionGroup,this.slowDown,null,this);
      

        //iterates through all the sumos 
        collisionGroup.forEach(function(member){
            var i = member.name;


            if (globalGamma[i] > 80){
                member.body.velocity.x += 0.2;
            } 
            else if (globalGamma[i] < -80){
                member.body.velocity.x += -0.2;
            }
            else if (globalGamma[i] > 10){
                member.body.velocity.x += globalGamma[i]/800;
            } 
            else if (globalGamma[i] < -10){
                member.body.velocity.x += -globalGamma[i]/800;
            }
            else {
                member.body.velocity.x += 0;
            } 

            Y[i] = globalY[i]; 

            // increase speed for sumos if accelY high enough
            if (Math.abs(Y[i] - lastY[i]) > 7){
                sounds[i].play();
                count[i]++; 
                member.animations.add('sumoMove',[i*4,i*4+1,i*4+2,i*4+3],count[i],true); //animation added to the sprite
                
                member.animations.play('sumoMove'); // animation called 'sumoMove' is played 
                member.body.velocity.y=speed[i]*count[i];
                console.log('incrementing '+member.body.velocity.y);
           
            }
            
            // save the Y value for use later    
            lastY[i] = Y[i];


            if (member.y>=720 && !member.reached){
                sounds[i].mute=true;
                //cheeringSound.totalDuration=2;
                cheeringSound.play("",0,1,false);
                winnerPositions[placing]=i; //save member name into winner list
                placing++;
                trackGroup.children[i].tint=0x99ffff; //change colour of track to signify reached
                var text=game.add.text(game.world.width*trackposition[numPlayers]+220*i+70,300,placing,{font:'bold 100px Arial',fill:'#ffffff'});
                
                
                member.body.velocity=0; 
                member.animations.stop('sumoMove',true);
                member.animations.stop('sumoSlow',true);
                member.reached=true;
                cheeringSound.stop();
            }
            if (winnerPositions.length==numPlayers){
                console.log(winnerPositions);
                game.state.start('SumoGameOver'); //change to game over state 
            }
        }, this, true);


        

    },

    
    startDecrement:function (){
        collisionGroup.forEach(function(member){
            var i = member.name;
            if (count[i]>1){
                count[i]=count[i]-1;
                member.animations.add('sumoSlow',[i*4,i*4+1,i*4+2,i*4+3],count[i],true);
                member.animations.play('sumoSlow');
                member.body.velocity.y=speed[i]*count[i];
                console.log('decrementing'+ member.body.velocity.y); 

            }
        }, this, true);
    },

    slowDown:function (s1,s2){
        s2.body.velocity.y-=1;
        console.log("collided! Decrease speeed! "+s2.body.velocity.y);

    }

};
