var s;
var Menu = {

    preload : function() {
        game.load.image('gameovermenu','./img/bg.jpg');
        game.load.image('menu','./img/menupage.jpg');

        //game.load.spritesheet('catSS','./img/catsprite.png',568,758);
        //game.load.spritesheet('catspr','./img/catsprite.png',586,758);
        game.load.spritesheet('sumoSS','./img/sumospritesheet.png',704,912);
        game.load.spritesheet('meteorSS','./img/meteorspritesheet.png',2381,1407);
        game.load.spritesheet('explosionSS','./img/explosionspritesheet.png',1921,1850);
        game.load.spritesheet('healthSS','./img/healthspritesheet.png',1166,107);
        game.load.spritesheet('sumoWLSS','./img/sumolosewinspritesheet.png',969,914);
        
        game.load.audio('BPunch','./sound/Batman_Punch.mp3');
        game.load.audio('RPunch','./sound/Realistic_Punch.mp3');
        game.load.audio('SPunch','./sound/Strong_Punch.mp3');
        game.load.audio('explodeSound','./sound/explosion.mp3');
        
    },

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.button(0, 0, 'menu', this.startGame, this);
        for (var i=0;i<4;i++){
            var cat = this.add.sprite(this.world.randomX, this.world.randomY, 'sumoSS');
            cat.scale.setTo(0.15);
            this.physics.enable(cat,Phaser.Physics.ARCADE);

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
        this.state.start('Game');

    }

};