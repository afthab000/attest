var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var session = require('express-session');

var passport = require("passport")
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var ObjectId = require('mongoose').ObjectId;
var db = null;
mongoose.connect("mongodb://localhost:27017/files", function(err, dbconn) {
  if(!err) {
    console.log("We are connected");
    db = dbconn;
  }
});

/* Init App */
var app = express();

/* View Engine */


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({secret: "This is a secret"}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done){
    
   
    
}));


app.get('/files', function(req, res, next){
   db.collection('files', function(err, filesCollection){
       filesCollection.find().toArray(function(err, files){
           return res.json(files);
       });
   });
})


app.post('/files', function(req, res, next){
    var newFile = req.body.newFile;
    
    db.collection('files', function(err, filesCollection){ 
       filesCollection.insert(newFile, {w:1}, function(err, files){    
           return res.send();  
       });
   });
});

app.put('/files/remove', function(req, res, next){ 
   db.collection('files', function(err, filesCollection){
       var fileId = req.body.removeFile._id;
       filesCollection.remove({_id: ObjectId(fileId)}, {w:1}, function(err, files){  
           return res.send();
       });
   }); 
})

app.put('/files/update', function(req, res, next){
   db.collection('files', function(err, filesCollection){ 
       var fileId = req.body.updateFile._id;
       var updateFile = req.body.updateFile;
       delete updateFile._id;
       console.log(fileId);
       filesCollection.update({_id: ObjectId(fileId)}, updateFile, {upsert: true}, function(err, files){  
           return res.send();
           console.log('Success');
       });
   }); 
})

console.log("inside server");
app.listen(3000, function(){
    

});