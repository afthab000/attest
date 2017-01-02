var bodyParser = require('body-parser');

module.exports = function(app, passport) {
    var mongoose = require('mongoose');
    require('../models/model.js')(mongoose);
    
var users = mongoose.model('user');
    
/*User Routes*/
    
app.post('/user/login', function(req, res, next) {


    
    req.body = req.body.user;
  passport.authenticate('local-login', function(err, user, info) {

      if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting login
    if (! user) {
      return res.send({ success : false, message : 'loginfailed' });
    }
     req.login(user, function(err) {
         
        if(err) {
            return res.status(401).json(err);
        } else {
            return res.send(user);
        }
      });
  })(req, res, next);
});
    
    
    
    
    
    
    app.post('/user/signup', function(req, res, next) {
    req.body = req.body.user;
        
  passport.authenticate('local-signup', function(err, user, info) {
      
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting signup
    if (! user) {
      return res.send({ success : false, message : 'Signup failed' });
    }
    return res.send(user);
  })(req, res, next);
});
    

    /*File Routes*/
    
 app.get('/files/view', function(req, res, next){
     
     
     var File = mongoose.model('files');
     var name = req.user.name;
     var User = mongoose.model('user');

/*    User.findOne({name : name})
         .exec(function (err, user) {

          console.log(user.files[1].parent);

          for(var i=0; i< user.files.length-1; i++)
          {
            var j=(i+1);

            console.log(i,",", j);
            if(user.files[i].parent < user.files[j].parent)
            {
              console.log(i, "swap")
              var swap = user.files[i];
              user.files[i] = user.files[j];
              user.files[j] = swap;
            }

          }
        return res.json(user);
    })*/

          var user = req.user;
          for(var i=0; i< user.files.length; i++)
          {
            console.log(user.files[i].parent)
    
          }
          console.log("----------------------")
          for(var i=0; i< user.files.length-1; i++)
          {
            for(var j=i+1; j< user.files.length; j++)
          {
            if(user.files[i].parent < user.files[j].parent)
            {
              var swap = user.files[i];
              user.files[i] = user.files[j];
              user.files[j] = swap;
              user.save(function(err) {
              console.log(i, "saved")
            })
            }
          }
          }
          for(var i=0; i< user.files.length; i++)
          {
            console.log(user.files[i].parent)
    
          }
        return res.json(user);
  });


app.post('/files/add', function(req, res, next){
    
    var newFile = req.body.newFile;
    var name = req.user.name;
    var User = mongoose.model('user');

    User.findOne({name : name})
         .exec(function (err, user) {
          console.log('pushing');
        user.files.push(newFile);
        user.save(function(err) {
           //saved
            })
        })
       return res.send();  
       });


app.put('/files/remove', function(req, res, next){ 

  var User = mongoose.model('user');
  var user = req.user;
  var fileId = req.body.removeFile._id;
  var doc = user.files.id(fileId).remove();

  user.save(function (err) {
    if (err) return handleError(err);
    console.log('the sub-doc was removed')
  });
   return res.send();
});

app.put('/files/update', function(req, res, next){

       var User = mongoose.model('user');
        console.log(req.body.updateFile);
       var fileId = req.body.updateFile._id;
       var updateFile = req.body.updateFile;
       var user = req.user;

       for(var i=0; i<user.files.length; i++)
       {
          if(user.files[i]._id == updateFile._id)
          {
            user.files[i]=updateFile;
            user.save(function(err) {
           //saved
            })
          }

       }
       return res.send();  
});

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
