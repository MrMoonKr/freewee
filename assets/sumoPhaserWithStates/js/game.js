    var numPlayers=4; 
    var winnerPositions=[];

    var trackposition;

    var trackGroup,collisionGroup,cursors;
    var count=0; //framerate
    var speed=2;
    var placing=0;

    var timer,loop;

var Game = {

    preload : function() {
        //for scaleMode: exists 
//      *NO_SCALE — nothing is scaled.
//      *EXACT_FIT — scale the canvas to fill all the available space both vertically and horizontally, without preserving the aspect ratio.
//      *SHOW_ALL — scales the canvas, but keeps the aspect ratio untouched, so images won't be skewed like in the previous mode. There might be black stripes visible on the edges of the screen, but we can live with that.
//      *RESIZE — creates the canvas with the same size as the available width and height, so you have to place the objects inside your game dynamically; this is more of an advanced mode.
//      *USER_SCALE — allows you to have custom dynamic scaling, calculating the size, scale and ratio on your own; again, this is more of an advanced mode

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#D7E4BD'; //green background colour

        //load the sumo and the track 
        //game.load.spritesheet('sumoMove','./img/sumo_sprite2.png',188,219);
        game.load.spritesheet('sumoSS','./img/sumoRunSpriteSheet.png',773,914);
        
        game.load.image('track','img/track.png');
        

    },

    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //just to keep track of what coordinates to shift to, according to number of players
        trackposition={
            1:0.5,
            2:0.34,
            3:0.27,
            4:0.2 
        }

        //bottomost layer, group for all tracks  
        trackGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        for (var i =0;i<numPlayers;i++){
            //add track sprite to trackGroup 
            var track = trackGroup.create(game.world.width*trackposition[numPlayers]+220*i,0,'track');
            track.anchor.set(0,0);
            track.scale.setTo(1,(game.world.height/track.height));
            track.name=i;
        }
        
        //group for all sumos 
        collisionGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i =0;i<numPlayers;i++){
            //creating the sumo
            var s = collisionGroup.create(game.world.width*trackposition[numPlayers]+50+200*i,0,'sumoSS');
            s.frame=4*i; //different frame for diff sumo 
            s.reached=false;
            s.name=i;
            s.anchor.set(0,0);
            s.scale.setTo(0.2,0.2);
            if (i!=1){
                s.body.velocity.set(0,40);
            }
            s.body.collideWorldBounds=true;
            s.body.bounce.x=1;
            s.body.bounce.y=1;
            game.physics.enable(s,Phaser.Physics.ARCADE);
                       
        }
        //disable sumo's collision with bottom edge of screen,  ball will fall off)
        game.physics.arcade.checkCollision.down=false; 

        cursors = game.input.keyboard.createCursorKeys(); //up down left right of keyboard 
       
        //on loop
        timer=game.time.events;
        loop=timer.loop(1000,this.startDecrement,this);

    }, 

    update:function() {
        //increaseSpeed function called everytime mouse click is registered
       game.input.onDown.add(this.increaseSpeed);

       //collision event listener 
       game.physics.arcade.collide(collisionGroup,collisionGroup,this.slowDown,null,this);
      
       //cursor movements 
        if (cursors.left.isDown){
            //sumo.body.moveLeft(10);
            collisionGroup.children[1].body.velocity.x=-10;
            console.log('left');
        }
        else if (cursors.right.isDown){
//            sumo.body.moveRight(10);
            collisionGroup.children[1].body.velocity.x=10;
            console.log('right');
        }

        //iterates through all the sumos 
        collisionGroup.forEach(function(member){
            if (member.y>=720 && !member.reached){
                winnerPositions[placing]=member.name; //save member name into winner list
                placing++;
                member.body.velocity=0; 
                member.animations.stop('sumoMove',true);
                member.animations.stop('sumoSlow',true);
                member.reached=true;
                trackGroup.children[member.name].tint=0x99ffff; //change colour of track to signify reached
                var text=game.add.text(game.world.width*trackposition[numPlayers]+220*member.name+70,300,placing,{font:'bold 100px Arial',fill:'#ffffff'});
            
            }
            if (winnerPositions.length==4){
                console.log(winnerPositions);
                game.state.start('Game_Over'); //change to game over state 
            }
        }, this, true);


        

    },


    increaseSpeed:function (){
        //count is the framerate 
        
        count++; 
        collisionGroup.children[1].animations.add('sumoMove',[4,5,6,7],count,true); //animation added to the sprite
        
        collisionGroup.children[1].animations.play('sumoMove'); // animation called 'sumoMove' is played 
        collisionGroup.children[1].body.velocity.y=speed*count;
        console.log('incrementing '+collisionGroup.children[1].body.velocity.y);
       
    },

    
    startDecrement:function (){
    
        if (count>1){
            count=count-1;
            collisionGroup.children[1].animations.add('sumoSlow',[4,5,6,7],count,true);
            collisionGroup.children[1].animations.play('sumoSlow');
            collisionGroup.children[1].body.velocity.y=speed*count;
            console.log('decrementing'+ collisionGroup.children[1].body.velocity.y); 

        }
    },

    slowDown:function (s1,s2){
        s2.body.velocity.y-=1;
        console.log("collided! Decrease speeed! "+s2.body.velocity.y);

    }

};
