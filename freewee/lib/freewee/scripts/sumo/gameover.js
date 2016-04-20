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
        //game.add.tileSprite(0,0,game.world.width,game.world.height,'gameover');
        
        var butt=this.add.button(0, 0, 'gameover', this.startGame, this);
        butt.height=game.world.height;
        butt.width=game.world.width;
        
        for (var i =0;i<numPlayers;i++){
            
            var s = game.add.sprite(game.world.width*trackposition[numPlayers]+350*i-70,600,'sumoWLSS');
          
            if (i==winnerPositions[0]){
                s.frame=4+i;
            
            } else {
            
                s.frame=i;
            }
            for (var j=0;j<numPlayers;j++){
                if (winnerPositions[j]==i){
                      var text=game.add.text(game.world.width*trackposition[numPlayers]+350*i,300,j+1,{font:'bold 100px Arial',fill:'#000000'});
        
                }
            }
            s.scale.setTo(0.4);
                       
        }

    },

    startGame: function () {
        bgmusic.stop();

        // Change the state back to Game.
        this.state.start('Lobby');

    }

};