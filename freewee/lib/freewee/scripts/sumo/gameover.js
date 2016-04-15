var SumoGameOver = {

    preload : function() {
        // Load the needed image for this game screen.
        // game.load.image('gameover', '/img/sumo/grassfield3.png');

        // game.load.spritesheet('sumoSS','/img/sumo/sumolosewinspritesheet.png',969,914);
        // //game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {
        game.add.text(350,348,winnerPositions,{font:'bold 20px Arial',fill:'#0000000'});
        // Create button to start game like in Menu.
       // this.add.button(0, 0, 'gameover', this.startGame, this);

        // Add text with information about the score from last game.
        //game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        //game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        //background image
        game.add.tileSprite(0,0,game.world.width,game.world.height,'gameover');
        
        this.add.button(0, 0, 'gameover', this.startGame, this);

        for (var i =0;i<numPlayers;i++){
            
            var s = game.add.sprite(game.world.width*trackposition[numPlayers]+100+200*i,450,'sumoWLSS');
            if (i==winnerPositions[0]){
                s.frame=4+i;
            } else {
                s.frame=i;
            }
            s.scale.setTo(0.2,0.2);
                       
        }

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Lobby');

    }

};