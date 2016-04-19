var SnakePreload = {
	preload: function() {
		this.snakeInstructions = this.add.sprite(game.world.centerX, game.world.centerY, 'snakeInstructions');
		this.snakeInstructions.anchor.set(0.5,0.5);
		this.snakeInstructions.scale.setTo(game.world.width/this.snakeInstructions.width,1);

		// load stuff here
		game.load.spritesheet('sumoWLSS','/img/snake/sumolosewinspritesheet.png',969,914);
        game.load.spritesheet('basketSS','/img/snake/basketspritesheet.png',990,578);
        game.load.spritesheet('snakeSS','/img/snake/snakespritesheet.png',521,1911);
        game.load.spritesheet('wordSS','/img/snake/menutextspritesheet2.png',798,1633);
        game.load.spritesheet('sumoSS','/img/snake/sumoblowspritesheet.png',694,913);
        game.load.spritesheet('buttonSS','/img/snake/buttonspritesheet.png',146,146);
        game.load.spritesheet('circle','/img/snake/circle.png',60,60);  

        game.load.image('menu','/img/snake/bg.jpg');
        game.load.image('snakeInstructions','/img/snake/gameInstructions22.png');


        game.load.audio('hiss','/sound/snake/snake_hissing.mp3');
        game.load.audio('flute0','/sound/snake/flute_pitch1.mp3');
        game.load.audio('flute1','/sound/snake/flute_pitch2.mp3');
        game.load.audio('flute2','/sound/snake/flute_pitch3.mp3');
	},
    
	create: function() {
		var button = this.add.button(game.world.centerX, game.world.centerY, 'snakeInstructions', this.startMenu, this);
		button.anchor.set(0.5,0.5);
		button.scale.setTo(game.world.width/this.snakeInstructions.width,1);
		game.time.events.add(1000,function(){
            var text=game.add.text(game.world.centerX, game.world.centerY + 128,'Click to continue',{font:'25px Arial',fill:'#0095DD'});
            text.alpha=0;
            game.add.tween(text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,1000,true);     
        });
	},

	startMenu: function () {
        // Change the state game menu
        this.state.start('SnakeMenu');
    }
};