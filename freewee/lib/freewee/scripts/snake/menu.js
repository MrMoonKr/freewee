
var SnakeMenu = {

    create: function () {

        bgmusic=game.add.audio('startMusic');
        bgmusic.loopFull(0.7); 

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // background is the button . clicking on background will start game 
        var butt=this.add.button(0, 0, 'menu2', this.startGame, this);
        butt.height=game.world.height;
        butt.width=game.world.width;
        // words 'sumos can charm snakes too '
        var w = game.add.sprite(280,20,'wordSS');
        w.scale.setTo(0.4);
        w.animations.add('blinking',[0,1,2,3,4,5],4,true);
        w.animations.play('blinking');

        //adding snake 
        var s = game.add.sprite(game.world.width*0.6+80,game.world.height+300,'snakeSS');
        s.anchor.set(0,1);
        s.scale.setTo(0.4);
        s.animations.add('slithering',[0,2,3,0,4,5],4,true);
        s.animations.play('slithering');
        
        //adding basket 
        var b = game.add.sprite(game.world.width*0.6,game.world.height,'basketSS');
        b.frame=3;
        b.anchor.set(0,1);
        b.scale.setTo(0.4);

        //tweening for snake 
        game.add.tween(s).to({y:800},8000,Phaser.Easing.Linear.None,true);
        
        
    },

    
    startGame: function () {
        // console.log(screen.availWidth);
        // console.log(screen.availHeight);
        // Change the state to the actual game.
        bgmusic.stop();
        this.state.start('SnakeGame');

    }

};