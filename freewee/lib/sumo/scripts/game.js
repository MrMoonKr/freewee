/******************************************************************************/
/******************************** SYNCHRONIZER ********************************/
/******************************************************************************/
var socket = io();

var n = synchronizer.init('host', socket);

var players = {};

var numPlayers = 0;

var globalY = [0,0,0,0,0];
//var globalGamma[data.id] = 0;
var globalGamma=[0,0,0,0,0];
var gotUpdate = false;

n.onJoin(function(data){

    // if player is not already in room
    if (!players[data.username]){
      numPlayers+=1;
      players[data.username] = numPlayers; // players["mary"] = 0;
      $('.users').append(" " + data.username + "");
      
      /*** TODO: instantiate and render new SUMO ***/
      createSumo(numPlayers)

    }

    n.receive(function(data){
      if (players[data.username]){
        data.id = players[data.username];
        globalGamma[data.id] = data.orientation.gamma;
        globalY[data.id] = data.motion.y;
        $('.yval').text(globalY);
        $('.gammaval').text(globalGamma);
      }
      gotUpdate = true;
    })
});

$(document).ready(function(){

    $('.roomid').append(n.roomId)
});




/******************************************************************************/
/********************************* GAME LOGIC *********************************/
/******************************************************************************/


//width and height and rendering method (auto lets phaser decide between webGL or canvas 2d), id for <canvas> to use for rendering if one already exists (null as we want phaser to create its own)
//preload takes care of preloading assets
//create executed once everything loaded and ready
//update executed on every frame                   
var game = new Phaser.Game(800, 600, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});

var sumo;
var sumos=[0,0,0,0,0];
var track;

// var cursors;

var count=[0,0,0,0,0]; //framerate
var speed=[10,10,10,10,10];

var circle1;
var circleSprite;

// for storing tilts
var Y = [0,0,0,0,0];
var lastY = [0,0,0,0,0];


function preload() {
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
    game.load.spritesheet('sumoSprite','/sumo/img/sumo_sprite2.png',188,219);
    game.load.image('track','/sumo/img/track.png');       
}


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    /*//adding track spirte to the game 
    track = game.add.sprite(game.world.width*0.25, 0,'track');
    track.anchor.set(0.5,0); //default is 0,0 (top left), anchor point is where to take x y coordinates references from
    track.scale.setTo(0.5,(game.world.height/track.height)); //to scale the track 



    //adding sumo sprite to the game 
    sumo = game.add.sprite(game.world.width*0.25,0,'sumoSprite');
    sumo.anchor.set(0.5,0);
    sumo.scale.setTo(0.5,0.5);


    game.physics.enable(sumo,Phaser.Physics.ARCADE); // to enable sumo as a body in phaser.physics.p2
    sumo.body.collideWorldBounds=true;
    //sumo.body.bounce.set(0.5);*/
    

    // cursors = game.input.keyboard.createCursorKeys(); //up down left right of keyboard 
    game.input.onDown.addOnce(startDecrement); //startDecrement called only once when mouse is clicked  
    

}


function update() {
    for (var i=1;i<numPlayers+1;i++) {
      //console.log(sumos[i].id+" turn now");

    //TODO: interpolation?
    //increaseSpeed function called everytime mouse click is registered
    $('.update').text(gotUpdate);
    // using gyro.js <-- helper thingy to make it easier to use devicemotion
    if (gotUpdate) {
      Y[i]= globalY[sumos[i].id];
      
      // TODO: increase velocities of all sumos, not just one global sumo

      // turn left or right by tilting phone sideways
       if (globalGamma[sumos[i].id] > 0.05){
        sumos[i].body.velocity.x += 0.05;
        //console.log(sumos[i].id+ " moving right");
       } 
       else if (globalGamma[sumos[i].id] < -0.05){
        sumos[i].body.velocity.x += -0.05;
        //console.log(sumos[i].id+ " moving left");
       }
       else {
        sumos[i].body.velocity.x += globalGamma[sumos[i].id];
        //console.log(sumos[i].id+ " moving");
       } 

      // running speed by tilting phone forwards and backwards
      // current Y value from accelerometer - old Y value, if more than threshold, increaseSpeed
      //console.log("Y is: " + Y);
      //console.log("lastY is: " + lastY);
      if (Math.abs(Y[i] - lastY[i]) > 7){
        console.log(sumos[i].id+ " INCREASING speed");
        count[i]++; 

       // i dont know why calling the function doesn't work so i copied the increaseSpeed function here
        sumos[i].animations.add('sumoSprite',[0,1,2,3],count[i],true); //animation added to the sprite
        sumos[i].animations.play('sumoSprite'); // animation called 'sumoMove' is played 
        sumos[i].body.velocity.y = speed[i]*count[i]; //changes distance of sumo. somehow doesnt work  
        //console.log('incrementing '+sumos[i].body.velocity.y);
      }
      // save the Y value for use later    
      lastY[i] = Y[i];   

      //gotUpdate = false;
    }

    // on click, increaseSpeed
    //game.input.onDown.add(increaseSpeed);

    // TODO: set collision event listener on all sumos against all sumos :
     //collision event listener 
    // game.physics.arcade.collide(sumo,circleSprite,collisionDetected);
    //  game.physics.arcade.collide(sumos[1],sumos[2],collisionDetected);

     //cursor movements 
    /*if (cursors.left.isDown){
        //sumo.body.moveLeft(10);
        //sumo.body.velocity.x+=-10;  <- nigel's suggestion
        sumo.body.velocity.x=-10;
        
        console.log('left');
    }
    else if (cursors.right.isDown){
    //sumo.body.moveRight(10);
    //sumo.body.velocity.x+=10;  <- nigel's suggestion
        sumo.body.velocity.x=-10;
        ;
        console.log('right');
    }*/

    //to detect if reach the finishing line 
    //console.log(sumo.body.y);
    if (sumos[i].body.y>=490.5){ //it seems like an arbitrary number i took...
        for (var key in players){
          if (players[key]=== sumos[i].id){
            alert( key + ' you won!');
            location.reload();
          }
        }
        
    }
  }
}

function createSumo(playerNum){
    console.log("CREATED SUMO");
    //adding track spirte to the game 
    track = game.add.sprite(game.world.width*0.25*playerNum, 0,'track');
    track.anchor.set(0.5,0); //default is 0,0 (top left), anchor point is where to take x y coordinates references from
    track.scale.setTo(0.5,(game.world.height/track.height)); //to scale the track 



    //adding sumo sprite to the game 
    sumo = game.add.sprite(game.world.width*0.25*playerNum,0,'sumoSprite');
    sumo.anchor.set(0.5,0);
    sumo.scale.setTo(0.5,0.5);


    game.physics.enable(sumo,Phaser.Physics.ARCADE); // to enable sumo as a body in phaser.physics.p2
    sumo.body.collideWorldBounds=true;
    sumos[playerNum]=sumo;
    sumo.id=playerNum;
    //sumo.body.bounce.set(0.5);

}

function increaseSpeed(sumoPlayer){
    //count is the framerate 
    count++; 
   // console.log('incrementing '+ count);
    sumoPlayer.animations.add('sumoMove',[0,1,2,3],count,true); //animation added to the sprite
    sumoPlayer.animations.play('sumoMove'); // animation called 'sumoMove' is played 
    sumoPlayer.body.velocity.y=speed*count; //changes distance of sumoPlayer. somehow doesnt work  
    console.log('incrementing '+sumoPlayer.body.velocity.y);
}


function startDecrement(sumoPlayer){
    console.log('decrementing');
    //recursive function that decrements the count 
    if (count>1){
        count=count-0.5;
//            console.log('decrementing ' +count);
        sumoPlayer.animations.add('sumoMove',[0,1,2,3],count,true);
        sumoPlayer.animations.play('sumoMove');
        sumoPlayer.body.velocity.y=speed*count;  
        console.log('decrementing'+ sumoPlayer.body.velocity.y); 
    }
    setTimeout(startDecrement,500); 
}

//TODO: generalize collision detected for any sumo against any sumo
/*function collisionDetected(sumos[1],sumos[2]){
     //if sumo collides with the sprite, sumo will decrease the speed of the sprite such that the speed of sprite can even go negative (go backwards)
    sumos[2].body.velocity.y-=1;
    // console.log("collided! Decrease speeed! "+circleSprite.body.velocity.y);
}*/

