
var meteor,explode,health,healthbarfull,healthbar,    meteorLifeText;
var meteorHP,maxHP;
var damageDone;
var playBoom;
var xposition;

var numPlayers=4; 
var BPunchSound,RPunchSound,SPunchSound,explosionSound;

var PlanetGame = {

    preload : function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#eee'; //green background colour

        // game.load.spritesheet('catspr','./img/catsprite.png',586,758);
        // game.load.spritesheet('meteorSS','./img/meteorspritesheet.png',2381,1407);
        // game.load.spritesheet('explosionSS','./img/explosionspritesheet.png',1921,1850);
        // game.load.spritesheet('healthSS','./img/healthspritesheet.png',1166,107);
        // //game.load.image('bg','./img/nebulaSky.jpg');

    },

    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //loading sounds
        BPunchSound=this.add.audio('BPunch');
        RPunchSound=this.add.audio('RPunch');
        SPunchSound=this.add.audio('SPunch');
        explosionSound=this.add.audio('explodeSound');


        globalButtonCount=0;

        //bgtile = this.add.tileSprite(0,0,game.world.width,game.world.height,'bg');
        var bgtile = this.add.sprite(0,0,'bg');
        bgtile.width=game.world.width;
        bgtile.height=game.world.height;
        //adding meteor 
        meteor=game.add.sprite(game.world.centerX,game.world.centerY-900,'meteorSS');
        meteor.frame=0;
        meteor.anchor.set(0.5,-0.5);
        meteor.scale.setTo(2.5,2.3);
        //meteor.animations.add('crack',[0,1,2,3,4,5,6,7],5,true);

        //adding text 
        textStyle = { font: '18px Arial', fill: '#0095DD' };
        meteorLifeText=game.add.text(5,5,'Meteor HP: -',textStyle);

        //adding explosion animations 
        explode=game.add.sprite(game.world.centerX,game.world.centerY,'explosionSS');
        explode.anchor.set(0.5,0.5);
        explode.scale.setTo(1.5,1.45);
        explode.animations.add('boom',[0,1,2,3,4],4,true);
        explode.visible=false;
        
        //adding cats 
        xposition={
            1: 0.5,
            2: 0.38,
            3: 0.3,
            4: 0.2
        }

        

        catGroup = game.add.group();
        for (var i=0;i<numPlayers;i++){
            var cat = catGroup.create(game.world.width*xposition[numPlayers]+280*i,game.world.height,'sumoSS');
            cat.frame=i*4;
            cat.anchor.set(0,1);
            cat.scale.setTo(0.3);
            cat.animations.add('lifting',[i*4,i*4+1,i*4+2,i*4+3],3,true);

        }

        //adding health bar
        healthbarfull = game.add.sprite(game.world.width*0.25,game.world.height*0.15,'healthbarSS');
        healthbarfull.scale.setTo(1.6,1);
        /*health=game.add.sprite(game.world.width*0.25,game.world.height*0.15,'healthSS');
        health.scale.setTo(0.5);
        health.frame=2;*/

        healthbar=game.add.sprite(game.world.width*0.25,game.world.height*0.15,'healthbarSS');
        healthbar.frame=1;
        healthbar.scale.setTo(1.6,1);

        maxHP=200*numPlayers;
        meteorHP=maxHP;
        damageDone = 0;

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
        timer=this.time.events;
        loop=timer.loop(1000,this.increaseHP,this); 
        playBoom = false;

        
    }, 

    update:function() {
        if(me.timeElapsed >= me.totalTime){
            me.timeLabel.visible=false;
            meteor.visible=false;

            catGroup.forEach(function(member){
            member.visible=false;
            });
            healthbarfull.visible=false;
            //health.visible=false;
            healthbar.visible=false;

            timer.remove(loop);
            explode.visible=true;
            explode.animations.play('boom');
             if (playBoom == false){
                explosionSound.play();
                playBoom = true;
            }
            
            //game.state.start('Game_Over');
            this.over();
            
        
            }

        //decrease HP for every mouseclick. to be replaced with phone inputs. will get a count
        if (globalButtonCount > 0) {
            this.decreaseHP(globalButtonCount);
            globalButtonCount = 0;
        }

    },

    over: function(){
        this.time.events.add(3000,function(){
            game.state.start('PlanetGameOver');
        },this);
        
    },

    createTimer: function(){
        //me = this;
        me.timeLabel = me.game.add.text(me.game.world.centerX, 20, "00:00", {font: "50px Arial", fill: "#000000"}); 
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
    increaseHP:function(){
        //recursive function increases HP of meteor 
        if (meteorHP<maxHP){
            //increasing HP 
            damageDone--;
            meteorHP++;
            meteorLifeText.setText("Meteor HP: "+meteorHP);
            //health.scale.setTo(0.5*meteorHP/maxHP,0.5);
            healthbar.scale.setTo(1.6*meteorHP/maxHP,1);

            if (meteorHP>=maxHP/2){
                //health.frame=2; //change to dangerous HP (red)
                healthbar.frame = 1; // change to bright red
            }
            if (damageDone==-(maxHP/5)){
                meteor.frame-=1; //take away the crack
                damageDone=0;
            }
    
        }
    },

    decreaseHP:function(count){
        //decreasing HP 
        for (var i = 0; i<numPlayers;i++){
            catGroup.children[i].animations.play('lifting');
        }
        
        if (meteorHP>0){
            if ((meteorHP - count) < 0){
                meteorHP = 0;
            }else {
              meteorHP -= count;  
            }

            meteorLifeText.setText("Meteor HP: "+meteorHP);
            damageDone += count;
            //health.scale.setTo(0.5*meteorHP/maxHP,0.5);
            healthbar.scale.setTo(1.6*meteorHP/maxHP,1); 

            if (meteorHP<(maxHP/2)){
                //health.frame=1; //change to healthy HP (green)
                healthbar.frame = 2; // change to dark red
            }

        }
        
        if (damageDone==(maxHP/5)){
            meteor.frame+=1; //add crack 
            damageDone=0;
            SPunchSound.play();

        }
    }
        
};
