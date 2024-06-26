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


//fire function before saving doc to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
next();

});

//static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('incorrect password');

    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;