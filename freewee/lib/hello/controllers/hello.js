var exports = module.exports;

var greeter   = require('../models/greeter');

// express middleware fn
exports.sayHello = function(req, res) {

  var name = req.query.name || "";

  var context = {
    // O_O how did homedoc get to siteTitle
    siteTitle: "Node.js Bootstrap Demo Page"
  , welcomeMessage: greeter.welcomeMessage(name)
  };
  console.log("COntrollLerrrs");

  var template = __dirname + '/../views/hello';
  res.render(template, context);

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};