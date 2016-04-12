
var Menu = {

    preload : function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        //game.stage.backgroundColor = '#f2784b'; //green background colour

        //game.load.image('menu', './img/grassfield.jpg');

        game.load.spritesheet('basketSS','./img/basketspritesheet.png',990,578);
        game.load.spritesheet('snakeSS','./img/snakespritesheet.png',521,1911);
        game.load.spritesheet('wordSS','./img/menutextspritesheet2.png',798,1633);
        game.load.image('menu','./img/bg.jpg');
        
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // background is the button . clicking on background will start game 
        this.add.button(0, 0, 'menu', this.startGame, this);

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
        this.state.start('Game');

    }

};