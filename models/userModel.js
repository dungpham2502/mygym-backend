const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const validateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

// Static method for Signup
userSchema.statics.signup = async function(email, password) {
    validateUser({ email, password });

    const userExists = await this.findOne({ email });
    if (userExists) {
        throw new Error('Email already used');
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPass });
    return user;
}

// Static method for Login
userSchema.statics.login = async function(email, password) {
    validateUser({ email, password });

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password');
    }
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
        throw new Error('Incorrect email or password');
    }
    return user;
}

function validateUser(email, password) {
    const { error, value } = validateSchema.validate(email, password);
    if (error) {
        throw new Error(error.message);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;