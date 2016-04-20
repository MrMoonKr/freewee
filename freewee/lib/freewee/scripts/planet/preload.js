var PlanetPreload = {
	preload: function() {
		this.planetInstructions = this.add.sprite(game.world.centerX, game.world.centerY, 'planetInstructions');
		this.planetInstructions.anchor.set(0.5,0.5);
		this.planetInstructions.scale.setTo(game.world.width/this.planetInstructions.width,1);

		// load stuff here
		game.load.image('gameovermenu','/img/planet/bg.jpg');
        game.load.image('menu','/img/planet/menupage.jpg');
        game.load.image('bg','/img/planet/metro_skyline.png');
        game.load.image('gameover', '/img/sumo/grassfield3.png');

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


	},
	create: function() {
		var button = this.add.button(game.world.centerX, game.world.centerY, 'planetInstructions', this.startMenu, this);
		button.anchor.set(0.5,0.5);
		button.scale.setTo(0.72,1);
		game.time.events.add(1000,function(){
            var text=game.add.text(game.world.centerX - 125, game.world.centerY + 200,'Click to continue',{font:'25px Arial',fill:'#FFFFFF'});
            text.alpha=0;
            game.add.tween(text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,1000,true);     
        });
	},

	startMenu: function () {
        // Change the state game menu
        this.state.start('PlanetMenu');
    }
};