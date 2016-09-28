#Making Freewee
                                                                                                               
Freewee is a multiplayer, realtime HTML5 web app built with Node.js, Socket.io, and Phaser.
> ### Table of Contents
> [Game Concept](#game-concept)

> [Game Components](#game-components)

> [System Requirements](#system-requirements)

> [System Design](#system-design)

> [Code Structure](#code-structure)

> [System Testing](#system-testing)

> [Concurrency](#concurrency)

> [Bibliography](#bibliography)

# Game Concept
Our group wanted to create a **simple** and **easy to learn** game that will **bring family and friends together in a fun setting**. The game aims to elicit fun and laughter through silly and ridiculous actions which can help players build memorable moments with family and friends. Unlike many online games, this game encourages players to be physically close to each other, to promote bonding.

We drew inspiration from *Nintendo Wii* games and the *Google Star Wars Demo* (where we brandish our phones like lightsabers) to create Freewee in hopes that our game will become an *easily accessible and widely relevant party game for people of all ages*. 

![At A Glance](https://github.com/christabella/freewee/blob/master/assets/Report/At%20A%20Glance.png?raw=true "At A Glance")

The main concept is that players will use their phones as controllers and have an additional laptop or PC to function as the game screen. Players can play with one another by joining the same room. For this type of concept where the game would need to be **displayed not just on phones**, but on a computer screen as well, we chose to create a **web-based HTML5 game application**. An added bonus of a web platform is an ever lower barrier to introducing your friends and family to Freewee --- you don't even have to install anything, just go to the [URL](http://freewee.herokuapp.com)!

# Game Components
### Game Lobby
![Welcome page](http://i.imgur.com/r0tGHLs.png "Welcome page")
*Welcome Page*
![Lobby](http://i.imgur.com/UBVVb1l.png "Players get the pick the game they want to play")
*Lobby*

In the game lobby, players match up with one another and get to pick which mini-game they want to play. The game is chosen by clicking on one out of the three mini-games.

![Sumo Client](http://i.imgur.com/H8TNbtq.png "Your unique sumo")
Players are assigned a unique sumo avatar which will be used to identify them in the games. They can check which avatar they are assigned to by looking at their mobile device's screen.

###Run Sumo Run!
![SumoRun Menu](http://i.imgur.com/I6ksRuB.png "Run Sumo Run! Intro screen")
![SumoRun Instructions](http://i.imgur.com/A63GLTN.png "How to play Run Sumo Run!")
![SumoRun Game](http://i.imgur.com/4estsWs.png "The game!")
![SumoRun Client](http://i.imgur.com/H8TNbtq.png "This is shown on the mobile device")
In *Run Sumo Run!*, players race against each other to the finish line. The players are able to collide into one another in an attempt to slow each other down.

The players move forward by performing a forward/backward tilting motion with their mobile devices. They are also able to move sideways by tilting their mobile devices to its sides. The faster the player does the forward/backward tilting motion, the faster the Sumo runs towards the finish line. However, if the player does not tilt rigorously enough, the sumo will slow down and eventually come to a halt.

The first player to reach the finish line wins.

### Save Our Planet!
![Planet Game](http://i.imgur.com/cL8V8b3.png "Save Our Planet! Intro screen")
![Planet Instructions](http://i.imgur.com/6rEqBDl.png "How to play Save Our Planet!")
![Planet Game screen](http://i.imgur.com/e0zFNIS.png "The game!")
![Planet Game Client Side](http://i.imgur.com/VBbK7nN.png "This is shown on the mobile device")
In *Save Our Planet!*, players collaborate to stop a deadly meteor from wiping out planet Earth. The players are tasked to charge up their Sumo to stop the meteor by tapping on various buttons on their mobile devices. 

Players score points by rapidly tapping on buttons on their mobile device. Every single tap action from every player contributes to stopping the meteor from destroying planet Earth. If the time limit is reached and the meteor has not been destroyed, then it is the end for planet Earth. Scores are calculated based on how many times the player has tapped on the right buttons on their mobile devices.

The player with the highest score wins.

### Sumos Can Charm Snakes Too!
![Snake Game](http://i.imgur.com/PWPnpHi.png "Sumos Can Charm Snakes Too! Intro Screen")
![Snake Game Instructions](http://i.imgur.com/czf47xF.png "How to play Sumos Can Charm Snakes Too!" )
![Snake Game](http://i.imgur.com/aTf3Rrt.png "Charm Snakes")
![Snake Game Client Side](http://i.imgur.com/xyRCLfp.png "This is shown on the mobile device")
In *Sumos Can Charm Snakes Too!*, players are tasked with charming a deadly snake by using their trusty snake charming flute. 

The players will have to follow a sequence of button presses shown on the PC screen and replicate the same sequence while blowing into the mobile device's microphone. If the right sequence is replicated, the deadly snake will emerge from its basket and dance to the player's soothing beats. To increase the fun factor, we implemented force feedback when the player blows into the microphone.

The player who manages to charm the snake out with the highest score wins.


# System Requirements

## User Requirements
As we are targeting a general public, the user requirements are varied as well. This is the analysis of what the user needs and wants out of a party-style themed game.

 1. User needs to be able to join and play with multiple players in real time.
 2. User needs to be able to send data over from his controller and receive feedback almost instantaneously.
 3. User wants a game that is easily understandable, simple (not too complex). Game can be brainless and physical also. User does not want to spend too much time on one game. 
 4. User wants a game that is aesthetically appealing.
 5. User wants a game that loads fast.   

##Functional and Non-Functional Requirements
Use cases distill the essence of requirements as sets of action-response transactions between the user and the system.

A functional requirement is one on the functionality of the system, while a non-functional requirement is one on the performance of the system.

Functional Requirement	 |	Non-Functional Requirement
-------- | -------
Concept: Mini-Games that do not take too long to learn, understand and play. Maximum fun in minimum time! | Response Time:The response time of the game must be immediate and fast to keep the interest of the players. 
Function: Each game has to allow up to 4 players to join in the game. Game has to have a simple objective to be met.  | Reliability: Game hosted must be reliable and not have bugs or crash. Data sent over from client devices have to be reliable. 
Behaviour: Game should behave in a logical flow. | Availability: Game must be accessible and available anywhere and everywhere as long as there is internet connection. 
I/O Operations: Game needs to be able to support heavy I/O operations based on game concept as it is retrieving and interpreting player data. | Security: Game should be secure. It should not be hosted on malicious server, or request any personal details from players.
Logic & Computation: Game logic should be logical, modularized and simple to implement. | Cost: Game should cost little or nothing.
- | Technology: Type of technology required should be the minimum. We considered a phone to be something one should own in order to play.

##Use Cases and Use Case Diagrams

###1. Join Game

-|UC01 - Join Game
:-----:|----
**Name** | Join Game
**Objective**|Allow players to enter the room and match to play.
**Pre-conditions**|  1.Players can establish connection to the website server. <br>2.Players type in the same room ID with their friends. <br>3.Players are using compatible devices.
**Post-conditions**|**Success** <br> 1.Players enter to the main page. <br> 2.Player's phone display different colors of sumo as their identity. <br> 3.Game screen displays main menu for users to select games. <br> **Failure**<br>Can't go into the room.
**Actors**|**Primary**<br>1.Players <br> 2.Lobby <br> **Secondary** <br> Main Menu
**Trigger**|Connection request from players.
**Normal Flow**|1.PC (game screen) browse to https://freewee.herokuapp.com and server will generate a game ID. <br> 2.Players also browse to this website on their phone and login with room ID and own username. <br> 3.Player's handphone will display different colors of sumo as their identity. <br> 4.Once the players see that all their fellow players have successfully connected to the lobby, they press “All Players Ready” button on the game screen which direct them to the main menu.
**Alternative Flow**|1&2.Player is unable to connect; use case concludes with error notification. <br> 3.Players are distrubuted with same color of sumo; use case concludes with error notification.
**Interacts with**|Main Page
**Open Issues**|Network connectivity issues

![Join Game](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Join%20Game.png?raw=true "Join Game")



###2. Main Menu
-|UC02 - Main Menu
:-----:|----
**Name** | Main Menu
**Objective**|After all the players join the room, allow players to select games
**Pre-conditions**| Players have entered the room successfully.
**Post-conditions**|**Success**<br> 1.Go to corresponding game introduction page. <br> 2.Continue to start the game.<br>**Failure**<br>Game page was not loaded.
**Actors**|**Primary**<br> Main menu <br>**Secondary** <br> Each game page
**Trigger**|Click “All Players Ready” button.
**Normal Flow**|1.After players successfully join the game, they proceed to main menu page. <br> 2.Game screen displays different game buttons for players to choose. <br> 3.Players click the game they want to play and proceed to corresponding game page.
**Alternative Flow**|2.Game options are not successfully loaded; use case concludes with error notification. <br> 3.Game was not successfully loaded; use case concludes with error notification.
**Interacts with**|Game Start
**Open Issues**|Network connectivity issues

![Main Menu](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Main%20Page.png?raw=true "Main Menu")

###3. Game Start - General
-|UC03 - Game Start - General
:-----:|----
**Name** | Game Start
**Objective**|Allow players to start playing game. 
**Pre-conditions**| 1.Players click the game they want to play. 
**Post-conditions**|**Success**<br> Game start. <br>**Failure**<br> Game doesn't start.
**Actors**|**Primary**<br> Game Start. <br>**Secondary** <br> Game engine.
**Trigger**|Click the game on game screen.
**Normal Flow**|1.Game screen display introduction page. <br> 2.Click to continue to game page. <br> 3.Start the game.
**Alternative Flow**|1.Game introduction page isn't successfully loaded; use case concludes with error notification. <br> 2. a. Game page isn't successfully loaded; use case concludes with error notification. <br>b. Players' phone sensors don't work.
**Interacts with**|Game Page
**Open Issues**|Network connectivity issues, phone sensor issues

![Game Start](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Game%20Start.png?raw=true "Game Start")

###4. Increase Running Speed - Run Sumo Run!
-|UC04 - Increase Running Speed - Run Sumo Run!
:-----:|----
**Name** | Increase Running Speed
**Objective**|Let players advance in distance towards the finish line, the crossing of which is the game’s win condition.
**Pre-conditions**| Players are in the game of "Run Sumo Run!"
**Post-conditions**|**Success**<br> Players speed up <br>**Failure**<br> Player doesn't speed up
**Actors**|**Primary**<br> 1.Players <br> 2.Sensors <br> 3.Game engine 
**Trigger**|Periodic update of phone sensor data.
**Normal Flow**|1.All Players are playing in the game of "Run Sumo Run!". <br> 2.Player moves their device up and down in rapid succession. <br> 3.The sensor detects the motion and sumo will increase his speed. <br> 4.Keep updating until game over.
**Alternative Flow**|3.a. The sensor doesn't work or have problem with data transimisson. <br> b. The sensor have lagging issue on data transmission.
**Interacts with**|Game Start, Cross Finish Line
**Open Issues**|Sensitivity of phone sensors, transmission of sensor data

![Increase Running Speed](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Increase%20Running%20Speed.png?raw=true "Increase Running Speed")

###5. Cross Finish Line - Run Sumo Run!
-|UC05 - Cross Finish Line - Run Sumo Run!
:-----:|----
**Name** | Cross Finish Line
**Objective**|When the player cross the finish line, it will direct to "game over" state.
**Pre-conditions**| Players are in the game of "Run Sumo Run!"
**Post-conditions**|**Success**<br> 1.The rank of the player will be displayed on his lane <br> 2.Change to "game over" state. <br>**Failure**<br> Keep tracking players' position.
**Actors**|**Primary**<br> 1.Player <br> 2.Position tracker 
**Trigger**|When players' position equals to finish line position.
**Normal Flow**|1.Position tracker keeps updating player's position. <br> 2.When player's position equals to finish line, the rank will be displayed on player's lane. <br> 3.After all players crossed finish line, change to "game over" state.
**Alternative Flow**|1&2.Position tracker is lagging with position updating. <br> 2&3.More than one player cross the line.
**Interacts with**|Game Over
**Open Issues**|Synchronization issues

![Cross Finish Line](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Cross%20Finish%20Line.png?raw=true "Cross Finish Line")

###6. Decrease HP - Save Our Planet!
-|UC06 - Decrease HP - Save Our Planet!
:-----:|----
**Name** | Decrease HP
**Objective**|Decrease the HP to zero to crack the meteor.
**Pre-conditions**| Players are in the game of "Save Our Planet!" 
**Post-conditions**|**Success**<br> As the HP decrease, cracks will appear on the meteor and finally explode if HP decrease to zero. <br>**Failure**<br> HP can't decrease.
**Actors**|**Primary**<br> Lifting method <br>**Secondary** <br> damageDone method
**Trigger**|Player tap on the buttons on sumo.
**Normal Flow**|1.Players tap to lift the meteor and decrease HP. <br> 2.Cracks appear as the HP decrease. <br> 3.If the HP decrease to zero when time's up, meteor explode and players all win.
**Alternative Flow**|1.Counter can't synchronize player's lifting smoothly <br> 3.If the HP isn't zero when time's up, players all died.
**Interacts with**|Game Over
**Open Issues**|-

![Decrease HP](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Decrease%20HP.png?raw=true "Decrease HP")

###7. Game Over - Save Our Planet!
-|UC07 - Game Over - Save Our Planet!
:-----:|----
**Name** | Game Over - Save Our Planet!
**Objective**|End the game and show the result.
**Pre-conditions**| Time's up.
**Post-conditions**|**Success**<br> Game will end and result will display. <br>**Failure**<br>Game won't end and result won't show.
**Actors**|**Primary**<br> Game Over
**Trigger**|Time's up.
**Normal Flow**|1.Time's up. <br> 2.Game ends and game screen display the pointText for each player. The winner is the one get highest points.
**Alternative Flow**|2.Game doesn't end and game screen won't show game over page.
**Open Issues**|-

![Game Over](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Game%20Over.png?raw=true "Game Over")

###8. Play Flute  - Sumos Can Charm Snakes Too!
-|UC08 - Play Flute  - Sumos Can Charm Snakes Too!
:-----:|----
**Name** | Play Flute
**Objective**|Players play flute according to the instruction to charm snake up.
**Pre-conditions**| Players are in the game of "Sumos Can Charm Snakes Too!" 
**Post-conditions**|**Success**<br> Snakes will be charmed up. <br>**Failure**<br>Snakes can't be charmed.
**Actors**|**Primary**<br> Phone microphone <br> Blowing method 
**Trigger**|Player blow and tap the correct button.
**Normal Flow**|1.Player blow the microphone and tap the button in correct sequence. <br> 2.Corresponding pitch will play and snake will be charmed up <br> 3.If time's up, change to "game over" state and game screen will display players' scores.
**Alternative Flow**|If the microphone doesn't detect blow or players don't press the button in correct sequence, the pitch will not play and snake will not be charmed.
**Interacts with**|Game Over
**Open Issues**|Sensitivity of phone sensors, transmission of sensor data

![Play Flute](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Play%20Flute.png?raw=true "Play Flute")

###9. Game Over - Sumos Can Charm Snakes Too!
-|UC09 - Game Over - Sumos Can Charm Snakes Too!
:-----:|----
**Name** | Game Over - Sumos Can Charm Snakes Too!
**Objective**|End the game and show which player is the winner.
**Pre-conditions**| Time's up.
**Post-conditions**|**Success**<br> Game will end and winner will display. <br>**Failure**<br>Game won't end and winner won't show.
**Actors**|**Primary**<br> Game Over
**Trigger**|Time's up
**Normal Flow**|1.Time's up. <br> 2.Game ends and game screen display the pointText for each player. The winner is the one get highest points.
**Alternative Flow**|2.Game doesn't end and game screen won't show game over page.
**Open Issues**|-

![Game Over](https://github.com/christabella/freewee/blob/master/assets/Report/useCaseDiagram/Game%20Over.png?raw=true "Game Over")



# System Design
 
Clients (game screens or controllers) communicate with a **Node.js server** in realtime through **XHR/JSONP polling transport or WebSocket transport** (depending on browser support). The game is created with the **Phaser game framework**.

![Overall Infrastructure](https://github.com/christabella/freewee/blob/master/assets/Report/Overall%20Infrastructure.png?raw=true "Overall Infrastructure")
*Overall Infrastructure*

On top of Node.js, we used **Express**, a minimal and flexible Node.js web application framework, to set up middlewares to respond to HTTP Requests, define a routing table (Freewee only uses the root route), and dynamically render HTML Pages based on passing arguments to templates.

For realtime communication, we used **Socket.IO**, a realtime web application framework for bidirectional event-based communication. The evented, streaming nature of sockets fits conceptually with the Node architecture --- clients and servers are simply piping data back and forth through consistent interfaces:

![Node.js Express Server and Socket.IO Realtime IO Library](http://blog.nodejitsu.com/content/images/2014/Feb/express.png)
*Node.js Express Framework and Socket.IO Realtime IO Library*

## Sequence Diagram
Here is an example of how we use Node.js, Socket.IO, and client-side rendering to **create a room, join a room, and start a game**.

```sequence
Game Screen->Server: GET / 
Server-->Game Screen: HTTP 200 OK: rendered game.handlebars
Game Screen->Server: Socket.io Handshake
Server-->Game Screen: Socket.io Handshake OK
Game Screen->Server: socket.emit('synchronizer-create', roomID);
Note over Server: Socket.IO room (channel) with \nID : roomID created
Note over Game Screen: Show room ID on screen

Controller->Server: GET / (lobby screen)
Server-->Controller: HTTP 200 OK: rendered controller.handlebars
Controller->Server: Socket.io Handshake
Server-->Controller: Socket.io Handshake OK
Note over Controller: User enters a username and the roomID\n shown on existing Game Screen, and \nrequests to join the room with id : roomID
Controller->Server: socket.emit('synchronizer-join',\n {id: roomID, username: username});
Server-->Controller: io.to(roomID).emit('synchronizer-join', {username: msg.username, id: msg.id, \n playerOrder: rooms[msg.id], success: true, msg: "Successfully joined room."});
Server-->Game Screen: io.to(roomID).emit('synchronizer-join', {username: \n msg.username, id: msg.id, playerOrder: rooms[msg.id], \nsuccess: true, msg: "Successfully joined room."});

Note over Controller: Display appropriate sumo on controller \nscreen, according to received data.playerOrder.

Note over Game Screen: Once all players have joined the room, click "ALL PLAYERS READY" \nbutton. Use client-side JavaScript to render a Phaser game, starting \nwith the Lobby game state, a screen with mini-games.

```

## Node.js App Architecture
We structured our Node app into modules, with a separate module for the app itself, and another module for the synchronization between controllers, clients, and servers. These are elaborated on in the **Code Structure** section.

### Synchronizer Class Diagram

## Realtime Communication
In Freewee, we use TCP socket connections and pipe data through them bidirectionally with **Socket.IO**. Socket communication is *efficient*, only occurring when one of the parties has something useful to say:
![Responding to messages](https://masteringmean.com/graphics/6320OS_06_04.jpg "Responding to messages")

For a *realtime multiplayer game* such as Freewee, where **high-frequency messaging** between clients and server are required, this lightweight model is an excellent choice.

The **native WebSocket API** is an API proposed by the W3C, that allows browsers to communicate with a socket server over a persistent connection. 

**Socket.IO** is a library that facilitates the management of persistent socket connections for those developing with Node.js, providing both a *Node.js-based socket server and an emulation layer for browsers that do not support the WebSocket API natively*.

### WebSocket API
The general schematic for an application using the WebSocket API implementation for bidirectional communication looks like this:
![Schematic of a web app using the WebSocket API](https://masteringmean.com/graphics/6320OS_06_06.jpg "Schematic of a web app using the WebSocket API")
As you can see, the socket server and browsers do not require any specific client library or module, but only JavaScript code to establish a WebSocket connection on a client browser.
### Socket.io Library

Socket.IO aims to provide an emulation layer that will **use the native WebSocket implementation in browsers that support it**, reverting to other methods (such as long-polling) to simulate the native API in browsers that don't. 

Unlike the native WebSocket API implementation, Socket.IO requires a custom `socket.io.js` client library on client browsers, and an identical `socket.io` module on the Node.js server:

￼￼![Socket.io Web App Schematic](https://lh5.googleusercontent.com/unfpPe6OC4zzXxe89VXn0Sbmp5uQBifvTx6illIno-OofyFXm-PmMYXe5gGaokGLcu7VCJjB_koRspcneTHfjuMct9yhk_YiwX4XaLCY6O13vKzHGsQ0A8RkB_oYhzmrzFM "Socket.io Web App Schematic")


### Evaluation of Sockets


Pros	 |	Cons
------- | -------
Rapid bidirectional communication essential to realtime games, along with collaborative editing tools and other applications	|  The number of allowed persistent socket connections can be limited on the server side
Lower overhead than standard HTTP protocol request | If browser does not natively support WebSocket, emulation libraries such as Socket.IO resort to long-polling or other inefficient techniques
-	| Requires a custom protocol server, and often a custom client library
 - | Many proxies and reverse-proxies are known to confound socket implementations, leading to lost clients


## Game Implementation
### Phaser.io
Phaser.io is a desktop and mobile HTML game framework. It is a free open source framework that is powered by Canvas and WebGL. 

Our Phaser games are organised around states. Phaser supports game states, which allows us to break our game up into smaller pieces that can handle different mechanics of the game. The states employed in our game are as follows, where each mini-game has the same composite state machine _"Game n"_, where *n* is the game's ID:

### State Diagram

![enter image description here](https://github.com/christabella/freewee/blob/master/assets/Report/Freewee%20Phaser%20Game%20State%20Machine.png?raw=true "Phaser Game State Machine Diagram")

The state diagram shows the logical flow of events. 

#### Initial State
The initial state is handled by `main.js`. We initialise our game here using the global Phaser object and create a new game instance. We also add the various states to the game. 

```
var game;
game = new Phaser.Game(screen.availWidth,screen.availHeight, Phaser.AUTO, null);

game.state.add('Lobby', Lobby);

// Game 1
game.state.add('SumoBoot', SumoBoot);
game.state.add('SumoPreload', SumoPreload);
game.state.add('SumoMenu', SumoMenu);
game.state.add('SumoGame', SumoGame);
game.state.add('SumoGameOver', SumoGameOver);

// Game 2
// ...

// Game 3
// ...

game.state.start('Lobby');
``` 

#### Lobby State
In `lobby.js`, either a game is selected or the session is ended. If a game is selected, Lobby State will call the Boot State of the selected game.
####Boot State
Boot State is handled by `boot.js`. This screen loads the instructions and calls the Preload State.
####Preload State
Preload State is handled by `preload.js`. This preloads all the assets, background music, spritesheets, audio into the game. Once done, mouse click will bring it to the Menu State.
#### Menu State
Menu State is handled by `menu.js`. We display the game name and simple animation to introduce the game. When a mouse click is registered, it will call the Game State.
#### Game State
Game State is handled by `game.js`. We implement the actual game logic here. When a player wins, we call the Game Over state.  
#### Game Over State
Game Over state is handled by `gameover.js`. It will display the game over screen.  Upon mouse click, it will return to Lobby State. 


##Client-Side Device Sensors
Our game aims to explore the various uses of sensors in our mobile devices. Some of the sensors exposed by the HTML5 Javascript API that our group employed are: 

### DeviceOrientationEvent
DeviceOrientationEvent returns the alpha, beta and gamma values of the device's orientation obtained from the device's gyroscope.
![Device Orientation](http://www.html5rocks.com/en/tutorials/device/orientation/rotation.png)
Alpha refers to the direction the device is facing according to the compass.
Beta refers to the angle in degrees the device is tilted front-to-back
Gamma refers to the angle in degrees the device is tilted left-to-right.

We used the gamma values to move the player left and right in the Run Sumo Run! game.

The following code snippet is from `synchronizer-client.js`, the **client-side script responsible for communication between players** *(on phones/tablets)* **and their respective game screens** *(on *computers/tablets)*.  It allows us to track the the DeviceOrientationEvents from different hosts. We can now fetch individual device orientation data from different devices. 
```
if (window.DeviceOrientationEvent) {
      var options = {
            alphaThreshold: 5,
            betaThreshold: 5,
            gammaThreshold: 5,
            yThreshold: 0
          };

      _instance.prevOrientation = {
        alpha: 0,
        beta: 0,
        gamma: 0
      };

      _instance.prevMotion = {
        y: 0,
      };

      window.addEventListener('deviceorientation', function (eventData) {

        var orientation = {
          alpha: eventData.alpha,
          beta: eventData.beta,
          gamma: eventData.gamma
        };

        if(Math.abs(orientation.alpha - _instance.prevOrientation.alpha) >= options.alphaThreshold ||
            Math.abs(orientation.beta - _instance.prevOrientation.beta) >= options.betaThreshold ||
            Math.abs(orientation.gamma - _instance.prevOrientation.gamma) >= options.gammaThreshold
            ) {

          _instance.socket.emit('synchronizer-data',
            {
              username: _instance.username,
              roomId: _instance.roomId,
              buttons: _instance.buttons,
              orientation: orientation,
              motion: _instance.prevMotion,
              timestamp: Date.now()
            });
          _instance.prevOrientation = orientation;
        }
      })
```

### DeviceMotionEvent
DeviceMotionEvent returns data about the rotational movement and acceleration information about the device.

The acceleration data is returned in three axes: x, y and z. They are measured in meters per second squared (m/s^2).

We used the acceleration on the Y axis to move the player forward in Run Sumo Run!.

The following code snippet is also from `synchronizer-script.js`. It allows us to track the the DeviceMotionEvents from different hosts. Having this capability, we can now modify the movements of each player individually based on the acceleration data from individual devices.
```
window.addEventListener('devicemotion', function (eventData) {

  var motion = {
    y: eventData.accelerationIncludingGravity.y.toFixed(3)
  };

  if(Math.abs(motion.y - _instance.prevMotion.y) >= options.yThreshold) {

    _instance.socket.emit('synchronizer-data',
      {
        username: _instance.username,
        roomId: _instance.roomId,
        buttons: _instance.buttons,
        orientation: _instance.prevOrientation,
        motion: motion,
        timestamp: Date.now()
      });
    _instance.prevMotion = data;
  }
})
}
```



###getUserMedia
getUserMedia is a media capture API which allows web apps to access the user's camera and microphone.

Using this in conjunction with the Web Audio API, we can add real time effects to the live microphone input sound.

We used this API to register players blowing the flute in the Sumos Can Charm Snakes Too! game.
[insert some code snippets from the game demonstrating getUserMedia]
 

#Code Structure 

*Sun Jun: By Code Structure, I mean explaining to certain level of details on how each system components are implemented, e.g., what are the main methods, data structures, etc. Some code comments will help, but likely I won't be able to read every line of code.* 

## File Structure

![Overall File Structure](https://github.com/christabella/freewee/blob/master/assets/Report/filestructure/overall%20file%20structure.png?raw=true "Overall File Structure")

> **`bin`**:  `.sh` startup scripts for dev and production environments. 
> **`config`**: `.yaml` configuration files for various environments, set by `$NODE_ENV` environmental variable.
> **`lib`**: modules for application logic, namely `freewee` and `synchronizer`.
> **`node_modules`**: third-party modules installed via `npm install modulename --save`.
> **`public`**: static assets, namely `images`, `js`, `css`, and `bower_components`.
> **`test`**: automated Mocha unit and integration tests.
> **`views`**: shared template files configured for rendering with the Handlebars template engine.


### The **`freewee`** module
![Freewee File Structure](https://github.com/christabella/freewee/blob/master/assets/Report/filestructure/freewee%20file%20structure.png?raw=true "Freewee File Structure")
 
> * `freewee.js` contains routing for the app, and is responsible for rendering different views depending on user-agent (phone, tablet, computer etc.). 
> 
> * `package.json` is a short file containing the metadata of this local module.
> 
> Everything else is organized into **`scripts`**, **`img`**, **`sound`**, and **`views`**. 
> 
> * **`views`** contains the 2 different views that the server will render, depending on the user-agent header of the HTTP request.
> 
> * **`scripts`** contains various client-side JavaScript files for both _game screens_ and _controllers_:
> &emsp;+ `main.js` for _game screen_ clients, initialises a Synchronizer Prototype and implements Synchronizer methods, and initializes a Phaser game.
> &nbsp;+  `controller.js` for _controller_ clients, initialises a Synchronizer Prototype and implements Synchronizer methods, and contains controller screen utilities.

> * **`img`** and **`sounds`** contains the image and sound assets for each game and the lobby.
##### Class Diagram

![Freewee Module Class Diagram](https://github.com/christabella/freewee/blob/master/assets/Report/classDiagrams/freeweeClassDiagram.png?raw=true "Freewee Module Class Diagram")

### The **`synchronizer`** module
![enter image description here](https://github.com/christabella/freewee/blob/master/assets/Report/filestructure/synchronizer%20file%20structure.png?raw=true "Synchronizer File Structure")


 > * `synchronizer.js` runs on the server, and defines the events and messages that the server sends and receives, and the server-side socket behaviour.
> 
> * `scripts/synchronizer-client.js` is to be included on all clients (both _game screen_ and _controller_ clients), and defines the Synchronizer constructor, which provides an **application programming interface** (API) for clients to **communicate with the Socket.IO server through socket connections**, and send various types of data --- including `deviceOrientationEvent` and `deviceMotionEvent` data (from gyroscope and accelerometer sensors), `micStream` audio data (from microphones), and `<button>` `touchstart` and `touchend` presses.

##### Class Diagram
`synchronizer.js` exports an anonymous function that listens on the connection event for incoming sockets, which is then required by `server.js` (or rather, `appConfig.js`) where the `socket.io` instance is passed into it:
>`require('synchronizer')(socketio);`

![Synchronizer Module Class Diagram](https://github.com/christabella/freewee/blob/master/assets/Report/classDiagrams/synchronizerClassDiagram.png?raw=true "Synchronizer Module Class Diagram")

### Phaser.io Game Logic

#### Main Functions

 1. `preload()` - Phaser will preload all the assets in this function before starting the game. After it is done preloading, the code proceeds to the `create()` function.
 2. `create()` - Initialises the Phaser.Physics.Arcade game engine and game assets such as sprites or characters. The game starts and the code enters the `update()` function.
 3. `update()` - This function runs in a continuous loop. This allows us to constantly check conditions and update variables.
 
![Phaser Game Loop](https://leanpub.com/site_images/html5shootemupinanafternoon/game_loop.png)

####Class Diagram

![Class Diagram for Game implemented in Phaser.io game framework](https://raw.githubusercontent.com/christabella/freewee/master/assets/Report/ClassDiagramSumo.png)

Above is the class diagram of the main game flow in the game state. Loading of assets are generally handled by Phaser.Loader class. In the create function, assets are added as GameObjects into the game through the method `game.add`, aided by the Phaser.GameObjectFactory class. 

The assets are organised into groups, using the Phaser.Group class. Initialising the groups in a specific order allows us to specify its visibility and arrange the different groups by layers. (eg. In the Run Sumo Run group, a group was first initialised to create the tracks first before a group was initialised for the sumos because we want all sumos to be arranged on the topmost layer, for visibility sake. Groups hold display objects such as sprites or text. 

Various methods and functions are written to take in player data, interpret them and translate them into game effects that can be visually shown such as animation of the sprite (handled by Phaser.AnimationManager), playing of sounds and audio (handled by Phaser.Sound) and moving of the sprites (handled by Phaser. Physics.Arcade.Body). These are all called in the update loop, until the game over condition is met and the game state transits to the game over state.

# System Testing

##Unit Testing in Mocha
We wrote automated unit tests with the Mocha JavaScript unit test framework for two purposes: to verify the server is working correctly, and to verify that the socket programming is functional.

### Webserver Tests
We use `supertest` to execute HTTP requests against the server.

Result of acceptance tests: 
```
  webserver
    ✓ responds to / with a 200 OK (66ms)
    ✓ should have proper headers
    ✓ should have proper text/html content-type
    ✓ 404 everything else
```
### Socket Communication Tests
Before each test, we initialize a `gameScreenSocket` and a `controllerSocket`, and test whether specific expected events and messages are received (testing server-side `synchronizer.js`).

Result of tests:
```
  socket communication
...establishing socket connection...
    ✓ game screen client can create room
...establishing socket connection...
    ✓ controller client can join room
...establishing socket connection...
emitted
    ✓ controller client is notified of game start triggered by game screen client
...establishing socket connection...
data: mydata
    ✓ controller client can send data to game screen client
```

##Play Testing
###Ngrok and its issues 
![Ngrok and How it works](http://i.imgur.com/WaV4mLb.png)
Ngrok is a handy tool and service that allows you to tunnel requests from the wide open Internet to your local machine when it's behind a NAT or firewall. 
https://developer.atlassian.com/blog/2015/05/secure-localhost-tunnels-with-ngrok/
However, when we implemented our game and tested it on Ngrok, it revealed some critical flaws that will jeopardise the playability and stability of our game.

####Intermittent Disconnects
Firstly, we found that when there is a lot of data being sent from the players' mobile devices to the server, the Ngrok tunnel will intermittently disconnect, presumably due to the high load. The player will experience a huge lag spike when this happens because the packets containing player data were dropped during the disconnect. We decided that this was unacceptable as it makes the game play experience sluggish and disappointing. It is unable to support our game requirements as we require data to be sent over reliably and efficiently. 

#### HTTPS support
Secondly, Ngrok does not support HTTPS. HTTPS support is critical for one of our games because we require the use of the device's microphone, which is not possible on pages with insecure origins (non-HTTPS).

#### Server load and Uptime
Hosting the website using Ngrok on a laptop PC was not optimal because of performance issues, especially when the PC is being used to run other applications as well. Also, we are unable to achieve 24/7 uptime for the game using our laptop PCs because of the fact that we have to move our PCs around when we attend classes.

###Solution to Ngrok's issues

#### Intermittent Disconnects
We migrated over to Heroku. Heroku is a free cloud Platform-as-a-Service supporting several programming languages, including Node.js. 
It supports HTTPS so that problem is solved as well. 
#### HTTPS support
Heroku has support for HTTPS out of the box which solves our previous issue with Ngrok and HTTPS support for microphone usage.
#### Server load and Uptime
Web hosting has been migrated to the cloud at heroku.com. This allows us to achieve 24/7 uptime and much better performance when compared to Ngrok.

###Client-Side Testing 
####User Agent Overrider Extension 
Websites identify browsers by their user agents. When we modify the browser’s user agent, we are able to make it will appear as a different browser – or even a browser running on another device, such as a smartphone or tablet. 

This hack allows us to test our game on a localhost using `npm run dev`, without the need to update changes on Heroku. This saved a lot of development time because it meant that we can quickly test new builds on the client side without pushing our changes to the web host (Heroku).

####Remote Debugging on Android using Chrome
![Android Chrome Browser Inspect Tool](http://i.imgur.com/eXFeg9Z.png "Android Chrome Browser Inspect Tool")
We initially faced an issue with debugging on the client side as the Android Chrome browser does not have the developer tools feature built into the browser.

To overcome this problem, we required a few things:

 1. Chrome 32 or later on the PC
 2. USB cable for the android device
 3. Android 4.0+ and Chrome for Android

After enabling USB debugging on the Android device, we can access the developer tools for Chrome for Android by navigating to chrome://inspect on Chrome for PC.


# Concurrency

> "[JavaScript] has no concept of threads. Its model of concurrency is completely based around events"

## Threading
 **All operations in Node.js are thread safe**, as Node.js is a **single-threaded**, event-driven runtime environment, so it is impossible for any two JavaScript statements to run at the same time. 

However, other than your code, **everything else runs in parallel**. Since Node.js operates as a single thread with non-blocking I/O calls, it can support *tens of thousands of concurrent connections* without incurring the cost of thread **context switching**, which gets very heavy if you create a separate thread for each connection (à la memory overhead in Apache).

In Freewee, we have no CPU-intensive code, but a whole lot of I/O functions. Because of its structure, Node.js is a great choice for a **high-concurrency game application** such as Freewee.


### Non-blocking I/O
How can Node.js support high-concurrency applications while being single-threaded? While it is impossible to breach thread safety in any of the application code, behind the scenes, Node.js is multithreaded.  Node.js implements a fixed-size threadpool in C++ in the background that is responsible for all non-blocking asynchronous I/O operations. Therefore, all functions using I/O must be written asynchronously with callbacks, or they will block.

A Node.js server accepts web requests in a single-threaded event loop and quickly dispatches them to non-blocking worker threads in the threadpool for asynchronous processing (disk or network I/O), thus freeing the main thread for servicing a new request:

![Internal Thread Architecture](http://i.stack.imgur.com/YCTgK.png%20%27Internal%20Thread%20Architecture%27)

The call functions in the JavaScript code post tasks to the shared task queue that threads in the thread pool. When a thread in the thread pool completes a task, it informs the main thread of this that in turn wakes up and execute the registered callback. Callbacks are handled in serial on the main thread:

![Simplified diagram of execution flow for a function using the thread pool](https://www.future-processing.pl/wp-content/uploads/2015/04/threads-in-node.ja_.png)

## Vertical Scaling
Because of the single-threaded nature of Node.js, vertical scaling --- by increasing the number of CPU cores of the machine it is running on --- can only be achieved by using an additional module, such as cluster, StrongLoop Process Manager or pm2, to fork multiple processes to maximize resources. Although we implemented cluster in Freewee, we could not find a free hosting solution that supported cluster, hence http://freewee.herokuapp.com is not a clustered application. 
Nevertheless, it is not a great cause for concern since the threads in the C++ threadpool are likely to be distributed across multiple cores by the server OS. 

# Bibliography

AudioContext. (2016). Mozilla Developer Network. Retrieved 24 April 2016, from https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

Making Your First HTML5 Game With Phaser | Tutorialzine. (2015). Tutorialzine. Retrieved 24 April 2016, from http://tutorialzine.com/2015/06/making-your-first-html5-game-with-phaser/

Capturing Audio & Video in HTML5 - HTML5 Rocks. (2012). HTML5 Rocks - A resource for open web HTML5 developers. Retrieved 24 April 2016, from http://www.html5rocks.com/en/tutorials/getusermedia/intro/

Vibration API. (2015). Mozilla Developer Network. Retrieved 24 April 2016, from https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API

Understanding the node.js event loop. (2011). Blog.mixu.net. Retrieved 24 April 2016, from http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/

Node.js. (2016). Wikipedia. Retrieved 24 April 2016, from https://en.wikipedia.org/wiki/Node.js

Scaling Isomorphic Javascript Code | Nodejitsu Inc.. (2011). Blog.nodejitsu.com. Retrieved 24 April 2016, from http://blog.nodejitsu.com/scaling-isomorphic-javascript-code/#mvc

Node.js Express Framework. (2016). www.tutorialspoint.com. Retrieved 24 April 2016, from http://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

photonstorm.com, P. (2016). Phaser - Learn - Phaser 2.4.7 API Docs. Phaser.io. Retrieved 24 April 2016, from http://phaser.io/docs/2.4.7/index

> ***Group 9, The Magical Programming Machine*** 
> Christabella, Jiuqi, Nigel, Rong Ying
