/* @see: https://gist.github.com/branneman/8048520 -- 3. The Module
 * for easy linking to npm node_modules, using app-module-path@1.0.5
 * now all require() calls will be to the application entry point file, server.js, 
 * AND to the /lib directory
 */
require('app-module-path').addPath(__dirname + '/lib');

var handlebars    = require('hbs')
  , favicon       = require('serve-favicon')
  , cookieParser  = require('cookie-parser')
  , express       = require('express');

// , logger = require('morgan');  // can implement http request logging... another  time...
                                  // http://devgigs.blogspot.sg/2014/01/mastering-nodejs-logging.html



exports.setup = function(runningApp, callback) {
  // Nothing ever comes from "x-powered-by", but a security hole
  runningApp.disable("x-powered-by");

  /* Block helpers, e.g. for {{#section 'head'}}. `options` hash contains a function 
   * (options.fn) that behaves like a normal compiled Handlebars template. 
   * Specifically, the function will take a context and return a String.
   */
  handlebars.registerHelper("section", function (name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            });

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
  runningApp.use('/', require('freewee')); // attach to root route
  runningApp.use('/sumo', require('sumo')); // attach to sub-route


  // attach synchronizer scripts to scripts...???? actually i don't think i need to do this, just need inter-lib/module communications?!
  runningApp.use('/synchronizer', express.static(__dirname + '/lib/synchronizer/scripts'));
  
  runningApp.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client'));

  // If you need websockets: I DO NEED WEBSOCKETS!!!
  var socketio = require('socket.io')(runningApp.http);

  /* LINK UP SYNCHRONIZER SERVER -- important; as synchronizer.js (main file of /synchronizer module) 
   * contains the entire
   *  io.on('connection', function(socket){ 
   *    console.log('A user connected'); socket.on('synchronizer-create', function(id){}); 
   *  } 
   * setup
   */
  require('synchronizer')(socketio);

  if(typeof callback === 'function') {
    callback(runningApp);
  }
};