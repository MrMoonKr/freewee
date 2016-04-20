var PlanetGameOver = {

    preload : function() {
        // Load the needed image for this game screen.
        
        //game.load.image('menu','./img/bg.jpg');
    },

    create : function() {
        
        // Create button to start game like in Menu.
        var butt=this.add.button(0, 0, 'gameover', this.startGame, this);
        butt.height=game.world.height;
        butt.width=game.world.width;
        //var text = game.add.text(350,348,points,{font:'bold 20px Arial',fill:'#0000000'});
        for (var i =0;i<numPlayers;i++){
            
            var s = game.add.sprite(game.world.width*xposition[numPlayers]+350*i-80,600,'sumoWLSS');
            s.scale.setTo(0.4);

            if (meteorHP>0){
                s.frame=i;
                var text=game.add.text(game.world.width*0.4,300,"You all died.",{font:'bold 100px Arial',fill:'#000000'});
        
            } else {
                s.frame = 4+i;
                var text=game.add.text(game.world.width*0.3,300,"Everybody made it!",{font:'bold 100px Arial',fill:'#000000'});
        
            }
            
                       
        }
    },

    startGame: function () {

        bgmusic.stop();
        meteorHP = maxHP;
        // Change the state back to Game.
        this.state.start('Lobby');

    }

};