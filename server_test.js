var express = require('express');

var session = require('express-session');



var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();




var passport = require("passport")
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var ObjectId = require('mongoose').ObjectId;
var flash    = require('connect-flash');
var morgan   = require('morgan');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var db = null;
mongoose.connect("mongodb://localhost:27017/attest", function(err, dbconn) {
  if(!err) {
    console.log("We are connected");
    db = dbconn;
  }
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

require('./app/passport.js')(passport); // pass passport for configuration


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());


	// set up our express application


	// required for passport
	app.use(passport.initialize());
app.use(passport.session());
	
//	app.use(flash()); // use connect-flash for flash messages stored in session
//




require('./app/routes.js')(app, passport);


app.listen(3000, function(){
    

});