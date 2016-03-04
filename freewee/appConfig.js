// @see: https://gist.github.com/branneman/8048520 -- 3. The Module
// for easy linking to npm node_modules, using app-module-path@1.0.5
// now all require() calls will be to the application entry point file, server.js, and to the /lib directory

var handlebars    = require('hbs')
  , favicon       = require('serve-favicon')
  , cookieParser  = require('cookie-parser')
  , express       = require('express');

// , logger = require('morgan');  // can implement http request logging another  time...
                                  // http://devgigs.blogspot.sg/2014/01/mastering-nodejs-logging.html


require('app-module-path').addPath(__dirname + '/lib');

exports.setup = function(runningApp, callback) {
  // Nothing ever comes from "x-powered-by", but a security hole
  runningApp.disable("x-powered-by");

  // Choose your favorite view engine(s)
  runningApp.set('view engine', 'handlebars');
  runningApp.engine('handlebars', handlebars.__express);

  runningApp.use(favicon(__dirname + '/public/img/favicon.ico'));
  runningApp.use(cookieParser());

  //// you could use two view engines in parallel (if you are brave):
  // runningApp.set('view engine', 'j2');
  // runningApp.engine('j2', require('swig').renderFile);


  //---- Mounting well-encapsulated application modules (so-called: "mini-apps")
  //---- See: http://expressjs.com/guide/routing.html and http://vimeo.com/56166857
  runningApp.use('/hello', require('hello')); // attach to sub-route
  runningApp.use('/testgame', require('testgame')); // attach to sub-route
  runningApp.use('/testgame2', require('testgame2')); // attach to sub-route

  // API endpoint attached to root route:
  runningApp.use('/', require('homedoc')); // attach to root route

  // attach synchronizer scripts to scripts...???? actually i don't think i need to do this, just need inter-lib/module communications LULZ
  runningApp.use('/synchronizer', express.static(__dirname + '/lib/synchronizer/scripts'));
  runningApp.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client'));

  // If you need websockets: I DO NEED WEBSOCKETS!!!
  var socketio = require('socket.io')(runningApp.http);
  // LINK UP SYNCHRONIZER SERVER
  require('synchronizer')(socketio);

  if(typeof callback === 'function') {
    callback(runningApp);
  }
};