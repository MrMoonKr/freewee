var aXarr = [];
var aYarr = [];
var timer = null;
var time = 0;
var aX = null;
var aY = null;
var acc = null;

// if  DeviceMotionEvent supported, add an event listener that calls method moveBall which passes in 
// x, y and z acceleration values
if (window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('devicemotion', handleMotion);
} else {
    alert("devicemotion not supported on your device or browser.");
}

// event listeners for start and stop recording buttons
$(".start").click(function() {
    start = new Date().getTime();
    $(".start").text("...recording...")
    $(".stop").text("Stop recording.")
    setTimeout(updateValues, 100);
});

$(".stop").click(function() {
  clearTimeout(timer);
    $(".start").text("Start recording.")
    $(".stop").text("STOPPED!")

    $("#demo").text(aXarr.toString());
    $("#demo2").text(aYarr.toString());
    aXarr = [], aYarr = [];
});


function updateValues() 
{  
  aXarr.push(aX);
  aYarr.push(aY);
  time += 100;  
  // account for possible inaccuracy
  var diff = (new Date().getTime() - start) - time;  
  timer = setTimeout(updateValues, (100 - diff));  
}  

function handleMotion(ev) {
  acc = ev.accelerationIncludingGravity;
  aX = acc.x.toFixed(3);
  aY = acc.y.toFixed(3);
}


function handleOrientation(event) {
  // var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  var output = document.querySelector('.output');

  // output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML = "gamma: " + y + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;
}