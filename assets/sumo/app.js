Stage(function(stage) {

  //declaring viewbox of the stage 
  stage.viewbox(1000, 1000);

  //appending the sumo animation to the stage
  var animate = Stage.anim('sumo').appendTo(stage).pin('handle',0);
  
  //count variable to store number of mouse clicks and also is
  //decremented at a fixed time interval 
  var count=0; 

  var speed; 
  var distance=0; 

  //function that increments a count in a mouse click event 
  stage.on('click', function(){
    count++;
    speed=10*count;
    distance=speed+distance;

    //tween will move the animation by an offset of distance in 1000ms
    animate.tween(1000).pin({
        offsetY: distance
    })
    console.log("click registered! "+count);
    
    animate.fps(count).play();


    
    //this.tween(3000).ease('bounce');
  });

//recursve code to decrement count at a fixed interval of 1 second 
(function decrement() {
    // your code
    if (count>1){
      count--;
      console.log("decrementing now " +count);
      animate.fps(count).play();
      // speed=10*count;
      // distance=speed+distance;
      // console.log("distance is "+ distance);
      // animate.tween().pin({
      //   offsetY: distance
      // })
    }
    
    setTimeout( decrement, 3000 );
})();

  
});

Stage({
  name : 'sumosprite',  //pinwheel.png image refrenced as pinwheel
  image : {
    src: 'sumo_sprite2.png'
  },
  textures : {
    s1: {
      x: 0,
      y: 0,
      width: 188,
      height: 221
    },
    s2: {
      x: 190,
      y: 0,
      width: 188,
      height:221 
    },
    s3: {
      x: 378,
      y: 0,
      width: 188,
      height:221
    },
    s4: {
      x: 564,
      y: 0,
      width: 188,
      height:221
    },
    sumo: ['s1','s2','s3','s4']

  }
});


