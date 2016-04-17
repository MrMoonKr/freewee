var PlanetGameOver = {

    preload : function() {
        // Load the needed image for this game screen.
        
        //game.load.image('menu','./img/bg.jpg');
    },

    create : function() {
        
        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameovermenu', this.startGame, this);
        //var text = game.add.text(350,348,points,{font:'bold 20px Arial',fill:'#0000000'});
        for (var i =0;i<numPlayers;i++){
            
            var s = game.add.sprite(game.world.width*trackposition[numPlayers]+100+200*i,450,'sumoWLSS');
            if (meteorHP<25){
                s.frame=i;
            } else {
                s.frame=4+i;
            }
            s.scale.setTo(0.2,0.2);
                       
        }
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('PlanetGame');

    }

};