var button0,button1,button2;
var me,master;
var points, xposition;  

var loop,timer;
var snakeGroup, basketGroup,sumoGroup,pointTextGroup,playersSoundGroup; 
var masterSeqGroup=[];
var numPlayers=4;

var micOut;

var SnakeGame = {

    preload : function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#eee'; //green background colour
        // game.load.spritesheet('basketSS','./img/basketspritesheet.png',989,578);
        // game.load.spritesheet('sumoSS','./img/sumoblowspritesheet.png',694,913);
        // game.load.spritesheet('snakeSS','./img/snakespritesheet.png',521,1911);
        // game.load.spritesheet('buttonSS','./img/buttonspritesheet.png',146,146);
        // game.load.spritesheet('circle','./img/circle.png',60,60);  
        // game.load.audio('hiss','./sound/snake_hissing.mp3');
        
    },

    create : function() {

        // get permission to use microphone
        navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
        navigator.getUserMedia(
            {audio: true  
            }, 
            this.micStream
            ,
            function(err) {
            console.log("The following error occured: " + err.name)
        });
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        

        //to initialise to zero for every new game
        points=[0,0,0,0];
        playersSoundGroup=[];

        //buttons for user to click. [to be removed for real game, will be replaced by inputs from phone]
        //x y coord, name of asset, callback function when pressed, reference to this, frames for the over(hover), out(pointer moves out) and down(button pressed) events
        button0 = game.add.button(80,50,'circle',this.actionOnClick,this,0,0,0);
        button0.id=0;
        button1 = game.add.button(80,120,'circle',this.actionOnClick,this,0,0,0);
        button1.id=1;
        button2 = game.add.button(80,190,'circle',this.actionOnClick,this,0,0,0);
        button2.id=2;
   
        //to determine where to put graphics
        xposition={
            1: 0.5,
            2: 0.33,
            3: 0.2,
            4: 0.1
        }
        var textStyle = { font: '18px Arial', fill: '#0095DD' };

        //creating groups for sprites 
        sumoGroup=game.add.group();
        snakeGroup=game.add.group();
        basketGroup=game.add.group();
        pointTextGroup=game.add.group();
        
        for (var i=0;i<numPlayers;i++){

            //adding sumo
            var sumo = sumoGroup.create(game.world.width*xposition[numPlayers]+300*i,0,'sumoSS');
            sumo.frame=i*4;
            sumo.anchor.set(0,0);
            sumo.scale.setTo(0.3,0.3);
            sumo.animations.add('blowing',[i*4,i*4+1,i*4+2,i*4+3],4,true);

            //adding snakes 
            var s = snakeGroup.create(game.world.width*xposition[numPlayers]+300*i+50,game.world.height+300,'snakeSS');
            s.anchor.set(0,1);
            s.scale.setTo(0.2);
            s.animations.add('slithering',[0,2,3,0,4,5],4,true);
            s.animations.add('hurting',[0,1],2);
           
            //adding basket 
            var b = basketGroup.create(game.world.width*xposition[numPlayers]+300*i,game.world.height,'basketSS');
            b.frame=i;
            b.anchor.set(0,1);
            b.scale.setTo(0.2);

            //adding text for points 
            var pointText=game.add.text(game.world.width*xposition[numPlayers]+300*i-50,5,'Points: 0',textStyle);
            pointTextGroup.add(pointText);

            //adding sequence generator 
            var temp=[];
            var c = game.add.sprite(game.world.width*xposition[numPlayers]+300*i+100,100,'buttonSS');
            c.anchor.set(0.5,0.5);
            c.scale.setTo(0.3);
            var c2= game.add.sprite(game.world.width*xposition[numPlayers]+300*i+100,160,'buttonSS');
            c2.anchor.set(0.5,0.5);
            c2.scale.setTo(0.3);
            var c3= game.add.sprite(game.world.width*xposition[numPlayers]+300*i+100,220,'buttonSS');
            c3.anchor.set(0.5,0.5);
            c3.scale.setTo(0.3);
            temp=[c,c2,c3];
            masterSeqGroup[i]=temp;
            
            //adding sounds
            var sounds=[];
            hissingSound=this.add.audio('hiss');
            flute0=this.add.audio('flute0');
            flute1=this.add.audio('flute1');
            flute2=this.add.audio('flute2');
            sounds=[flute0,flute1,flute2,hissingSound];
            playersSoundGroup[i]=sounds;


        }

        //creating timer
        me=this;
        me.startTime=new Date();
        me.totalTime=20; //time of entire game
        me.timeElapsed=0;
        me.createTimer();
        me.gameTimer=game.time.events.loop(100,function(){
            me.updateTimer();
        });

        //loop, to generate sequence 
        timer=game.time.events;
        loop=timer.loop(1000,this.startBlink,this); 
    }, 

    update:function() {

        // set the mic threshold for detecting a player blowing into the mic
        if (micOut > 40){
            console.log("BLOW DETECTED!");
        }
             
        if(me.timeElapsed >= me.totalTime){
            game.state.start('Game_Over');//Do what you need to do
        }

    },

    // returns to var micOut the value of the microphone sound levels
    micStream: function(stream){
            
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
              microphone = audioContext.createMediaStreamSource(stream);
              javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

              analyser.smoothingTimeConstant = 0.8;
              analyser.fftSize = 1024;

              microphone.connect(analyser);
              analyser.connect(javascriptNode);
              javascriptNode.connect(audioContext.destination);

              //canvasContext = $("#canvas")[0].getContext("2d");

              javascriptNode.onaudioprocess = function() {
                  var array = new Uint8Array(analyser.frequencyBinCount);
                  analyser.getByteFrequencyData(array);
                  var values = 0;

                  var length = array.length;
                  for (var i = 0; i < length; i++) {
                    values += (array[i]);
                  }

                  micOut = values / length;

            }         
    },

    createTimer: function(){
        //me = this;
        me.timeLabel = me.game.add.text(me.game.world.centerX, 70, "00:00", {font: "50px Arial", fill: "#000000"}); 
        me.timeLabel.anchor.setTo(0.5, 0);
        me.timeLabel.align = 'center';
     
    },

    updateTimer: function(){
        if(me.timeElapsed < me.totalTime){                
            //me = this;
            var currentTime = new Date();
            var timeDifference = me.startTime.getTime() - currentTime.getTime();
         
            //Time elapsed in seconds
            me.timeElapsed = Math.abs(timeDifference / 1000);
         
            //Time remaining in seconds
            var timeRemaining = me.totalTime - me.timeElapsed; 
         
            //Convert seconds into minutes and seconds
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = Math.floor(timeRemaining) - (60 * minutes);
         
            //Display minutes, add a 0 to the start if less than 10
            var result = (minutes < 10) ? "0" + minutes : minutes; 
         
            //Display seconds, add a 0 to the start if less than 10
            result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 
         
            me.timeLabel.text = result;
        }
     
    },

    startBlink: function () {
         //generate random no. from 0 to 2 
        //master will be 0,1 or 2 
        master = Math.floor(Math.random()*3);

        //change tint colour for each of the players
        for (var j=0;j<numPlayers;j++){
            masterSeqGroup[j][master].tint= 0x99ff00;

        }
       
        console.log(master);

        //once reach certain points, blinking increases
        if(me.timeElapsed >= me.totalTime/2){
       // if (points[0]>5 && points[0]<10){  
            console.log("getting faster");
            loop.delay-=10;
        }

        // for button to fade back to original colour
         //a basic timed event(one-off event)- first param is how long to wait before the event fires and next param is the function 
        game.time.events.add(500, function(){
            for (var j=0;j<numPlayers;j++){
                masterSeqGroup[j][master].tint= 0xffffff;
            }
        },this);
        
    },

    //TO IMPLEMENT THE DEVICE INPUTS HERE 
    actionOnClick:function (sprite){ //once user clicks on button 
        

        //play sumo animation 
        sumoGroup.children[0].animations.play('blowing');

        //if what was pressed is at the same index of the sequence and mic is being blown into
        if (sprite.id == master && micOut > 35) {
            playersSoundGroup[0][master].play();
            sprite.tint = 0xffff00;//button to turn green to show correct 
            points[0]++;// increase points 
            pointTextGroup.children[0].setText('Points: '+points[0]);
            if (snakeGroup.children[0].y>game.world.height-50){
                //snake will move up if it has not reached its max height 
                game.add.tween(snakeGroup.children[0]).to({y:snakeGroup.children[0].y-10},200,Phaser.Easing.Linear.None,true);
            }
            snakeGroup.children[0].animations.play('slithering');
            playersSoundGroup[0][3].play("",0,0.2); //param - marker, position, volume

        } else { //means press wrong sequence 
            sprite.tint = 0xff0000; //red 
            points[0]--;
            pointTextGroup.children[0].setText('Points: '+points[0]);
            snakeGroup.children[0].y+=5;
            snakeGroup.children[0].animations.play('hurting');
        }
        
        // for button to fade back to original colour
        game.time.events.add(500, function(){
            sprite.tint= 0x99ffff; //blue
        },this);
        
    }


    

};
