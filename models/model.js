
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our file model
var fileSchema = mongoose.Schema({
        parent          : String,
        batch           : String,
        client          : String,
        id              : Number,
        name            : String,
        recDate         : String,
        duedate         : String,
        notary          : Boolean,
        mha             : Boolean,
        mea             : Boolean,
        consulateType   : String,
        completed       : String,
        status          : String,
        remarks         : String,
        selected        : Boolean}, { collection: 'attest' });


// create the model for files and expose it to our app
module.exports = mongoose.model('files', fileSchema);



var userSchema = mongoose.Schema({

        name         : String,
        email        : String,
        password     : String,
        role         : String,
        files        : [fileSchema]
    }, { collection: 'attest' });


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);
