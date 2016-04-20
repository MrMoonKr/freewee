var bgmusic;
var PlanetMenu = {

    /*preload : function() {
        game.load.image('gameovermenu','/img/planet/bg.jpg');
        game.load.image('menu','/img/planet/menupage.jpg');
        game.load.image('bg','/img/planet/metro_skyline.png');
        game.load.image('planetInstructions','/img/planet/gameInstructions33.png');

        //game.load.spritesheet('catSS','./img/catsprite.png',568,758);
        //game.load.spritesheet('catspr','./img/catsprite.png',586,758);
        game.load.spritesheet('sumoSS','/img/planet/sumospritesheet.png',704,912);
        game.load.spritesheet('meteorSS','/img/planet/meteorspritesheet.png',476,281);
        game.load.spritesheet('explosionSS','/img/planet/explosionspritesheet.png',730,703);
        game.load.spritesheet('healthSS','/img/planet/healthspritesheet.png',1166,107);
        game.load.spritesheet('healthbarSS','/img/planet/healthbarspritesheet.png',583,54);
        game.load.spritesheet('sumoWLSS','/img/planet/sumochaodaspritesheet.png',978,941);
        
        game.load.audio('BPunch','/sound/planet/Batman_Punch.mp3');
        game.load.audio('RPunch','/sound/planet/Realistic_Punch.mp3');
        game.load.audio('SPunch','/sound/planet/Strong_Punch.mp3');
        game.load.audio('explodeSound','/sound/planet/explosion.mp3');
        game.load.audio('startMusic','/sound/planet/planetBGM.mp3');

        
    },*/

    create: function () {
        bgmusic=game.add.audio('startMusic');
        bgmusic.loopFull(0.5); // use loopFull(volume) to loop the sound

        this.physics.startSystem(Phaser.Physics.ARCADE);
        var butt= this.add.button(0, 0, 'menu', this.startGame, this);
        
        butt.height=game.world.height;
        butt.width=game.world.width;
        for (var i=0;i<4;i++){
            var cat = this.add.sprite(this.world.randomX, this.world.randomY, 'sumoSS');
            cat.scale.setTo(0.15);
            this.physics.enable(cat,Phaser.Physics.ARCADE);
            cat.frame=i;
            cat.body.collideWorldBounds=true;
            cat.body.bounce.x=1;
            cat.body.bounce.y=1;
            cat.body.angularVelocity= this.rnd.integerInRange(50,100);
            cat.body.velocity.set(this.rnd.integerInRange(50,100));
    
        }
        
        
        
    },

    // update: function() {
    //     s.y-=10;
    // },

    
    startGame: function () {
       
        // Change the state to the actual game.
        this.state.start('PlanetGame');

    }

};