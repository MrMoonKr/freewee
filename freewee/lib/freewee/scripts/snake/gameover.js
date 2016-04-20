var SnakeGameOver = {

    preload : function() {
        // Load the needed image for this game screen.
        
        // game.load.image('menu','./img/bg.jpg');
        // game.load.spritesheet('sumoSS','./img/sumolosewinspritesheet.png',969,914);
        
    },

    create : function() {
        
        // background is the button . clicking on background will restart game 
        var butt=this.add.button(0, 0, 'gameover', this.startGame, this);
        butt.height=game.world.height;
        butt.width=game.world.width;
        //for debugging 
        var text = game.add.text(350,348,points,{font:'bold 20px Arial',fill:'#0000000'});
        
        var maxPoints=this.findMax(points);
    
        //to display winning/losing sprites 
        for (var i =0;i<numPlayers;i++){
            var s = game.add.sprite(game.world.width*xposition[numPlayers]+100+200*i,450,'sumoWLSS');
            
            //if the player index i has max points, show winner frame 
            //allows for multiple winners 
            if (points[i]==maxPoints){
                s.frame=4+i;
            } else { //means loser, display LOSER frame 
                s.frame=i;
            }
            s.scale.setTo(0.2,0.2);
                       
        }
        

    },

    findMax: function(list){
        var maxIndex=0;
        var max=list[0];
        for (var i=0;i<list.length-1;i++){
            if (list[i]>max){
                max=list[i];
                maxIndex=i;
                
            }
        }
        return max;
    },

    startGame: function () {
        // Change the state back to Game.
        this.state.start('Lobby');

    }

};