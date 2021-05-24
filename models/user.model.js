const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: [ 6, "Username must be at least 6 characters." ],
            maxlength: [ 32, "Username max length is 32 characters."],
            validate: {
                validator: function (value) {
                    return /^[a-z0-9_\-]+$/i.test(value);
                },
                message: 'Username must contain only alphanumeric characters, underscores and dashes.'
            }
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/.test(value);
                },
                message: 'Email must be a valid email address.'
            }
        },
        password: {
            type: String,
            required: true,
            minlength: [ 8, "Password must be at least 8 characters." ]
        },
        accessLevel: {
            type: String,
            default: 'Customer',
            enum: {
                values: ['Customer', 'Admin'],
                message: '{VALUE} is not a valid access level'
            }
        },
        cart: [new mongoose.Schema({
            product: mongoose.ObjectId,
            amount: Number
        })]
    },
    {
        collection: 'users',
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            const salt = await  bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        } catch (e) {
            console.log('Error during password encryption!')
            next(e)
        }
    } else {
        next();
    }
});

mongoose.model('user', userSchema);