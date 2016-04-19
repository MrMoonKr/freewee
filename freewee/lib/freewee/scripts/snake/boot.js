var SnakeBoot = {
	init: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},

	preload: function() {
		// load the game instructions
		this.load.image('snakeInstructions','/img/snake/gameInstructions22.png');
	},

	create: function() {
		this.game.stage.backgroundColor = '#fff';
		this.state.start('SnakePreload');
	}
};