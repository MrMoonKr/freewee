var SumoPreload = {
	preload: function() {
		this.sumoInstructions = this.add.sprite(game.world.centerX, game.world.centerY, 'sumoInstructions');
		this.sumoInstructions.anchor.set(0.5,0.5);
		this.sumoInstructions.scale.setTo(game.world.width/this.sumoInstructions.width,1);

		// load stuff here
        game.load.image('menu', '/img/sumo/grassfield2.png');
        game.load.image('runtext','/img/sumo/RunSumoRun.png');
        game.load.image('track','/img/sumo/track.png');
        game.load.image('gameover', '/img/sumo/grassfield3.png');

        game.load.spritesheet('sumoWLSS','/img/sumo/sumolosewinspritesheet.png',969,914);      
        game.load.spritesheet('sumoSS','/img/sumo/sumoRunSpriteSheet.png',773,914);
        
        game.load.audio('startMusic','/sound/sumo/SumoRunBgmBeforeRace.mp3');
        game.load.audio('breathing','/sound/sumo/breathShort.mp3');
        game.load.audio('cheering','/sound/sumo/cheerSoundShort.mp3');
        game.load.audio('countdown','/sound/sumo/countdown.mp3');
	},

	create: function() {
		var button = this.add.button(game.world.centerX, game.world.centerY, 'sumoInstructions', this.startMenu, this);
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
        this.state.start('SumoMenu');
    }
};