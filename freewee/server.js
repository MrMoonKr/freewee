// @see: https://gist.github.com/branneman/8048520 -- 3. The Module
// for easy linking to npm node_modules, using app-module-path@1.0.5
require('app-module-path').addPath(__dirname + '/lib');

var server    = require('nodebootstrap-server')
  , appConfig = require('./appConfig')
  , app       = require('express')();


app = require('nodebootstrap-htmlapp').setup(app); // basically app = express();

server.setup(app, appConfig.setup);