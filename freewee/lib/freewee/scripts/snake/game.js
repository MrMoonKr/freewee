var button0,button1,button2;
var me;
var master = 0;
var points, xposition;  

var loop,timer,actionloop;
var snakeGroup, basketGroup,sumoGroup,pointTextGroup,playersSoundGroup; 
var masterSeqGroup=[];
var numPlayers=4;

var SnakeGame = {

    preload : function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#eee'; //green background colour
        
    },

    create : function() {

        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        
        var bgtile = this.add.sprite(0,0,'menu2');
        bgtile.width=game.world.width;
        bgtile.height=game.world.height;
        //to initialise to zero for every new game
        points=[0,0,0,0];
        playersSoundGroup=[];


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
        // actionloop=timer.loop(1000,this.actionOnClick,this);
    }, 

    update:function() {
             
        if(me.timeElapsed >= me.totalTime){
            game.state.start('SnakeGameOver');//Do what you need to do
        }
        this.actionOnClick();


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
    actionOnClick:function (){ //once user clicks on button 
      for (var i=0;i<numPlayers;i++){
            //play sumo animation 
        sumoGroup.children[i].animations.play('blowing');

        var tempButton = globalButtons[i];
        var tempMic = globalMic[i];

        //if what was pressed is at the same index of the sequence and mic is being blown into
        if (tempButton.indexOf(master.toString()) >= 0 && tempMic) {
            playersSoundGroup[i][master].play();
            points[i]++;// increase points 
            pointTextGroup.children[i].setText('Points: '+points[i]);
            if (snakeGroup.children[i].y>game.world.height-50){
                //snake will move up if it has not reached its max height 
                game.add.tween(snakeGroup.children[i]).to({y:snakeGroup.children[i].y-30},200,Phaser.Easing.Linear.None,true);
            }
            snakeGroup.children[i].animations.play('slithering');
            playersSoundGroup[i][3].play("",0,0.2); //param - marker, position, volume
            tempMic = false;

        } else if (tempButton.indexOf(master.toString()) < 0) { //means press wrong sequence 
           // points[i]--;
            // pointTextGroup.children[i].setText('Points: '+points[i]);
            // snakeGroup.children[i].y+=5;
            snakeGroup.children[i].animations.play('hurting');
        }
      }

        
        
    }


    

};
