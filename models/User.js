const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'enter and email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please eneter a valid email'] 
    },
    password: {
        type: String,
        required: [true, 'enter password'],
        minlength: [6, 'minimiun of 6 characters for password']
    },
});

// fire function after saving doc to db
userSchema.post('save', function (doc, next) {

console.log('new user was created and saved', doc);

next();

});

//fire function before saving doc to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
next();

});
const User = mongoose.model('user', userSchema);

module.exports = User;