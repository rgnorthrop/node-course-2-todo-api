const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//const eSchema = new mongoose.Schema ({ model... }, { usePushEach: true })
var UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
        password: {
            type: String,
            require: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
);

UserSchema.methods.toJSON = function () {
    // Only send the userObject fields you specify back to the caller
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

// methods makes it an instance method
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // console.log('Access:', access);
    // console.log('Token:', token);
    // console.log('user.tokens0: ', user.tokens);

    //user.tokens.push({access, token});
    user.tokens = [{access: 'a1', token: 't1'}];

    user.tokens = user.tokens.concat({access: access, token: token});
    console.log('user.tokens1: ', user.tokens);
    user.tokens = user.tokens.splice(1, 1);
    console.log('user.tokens2: ', user.tokens);
    // Swapped the following line with the previous line the array.push command is not working with Mongo 3.6+
    // user.tokens = user.tokens.concat[{access: access, token: token}];
    // user.tokens = user.tokens.concat[{access, token}];

    return user.save().then(() => {
        return token;
    });
}

// statics makes it a model method
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        console.log('Error Occurred.', e);
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    })
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User}
