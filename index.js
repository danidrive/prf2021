const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const mongodbUri = process.env.MONGODB_URI;
const port = parseInt(process.env.PORT, 10);

mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Successfully connected!')})
    .catch(err => {console.log('Connection failed: ', err)})

mongoose.connection.on('error', err => {
    console.log('Error occurred in DB: ', err)
});

require('./models/user.model');
require('./models/product.model');
const userModel = mongoose.model('user');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

const jwtSecret = process.env.JWT_SECRET;

passport.use('local', new LocalStrategy({}, async (username, password, done) => {

    try {
        const user = await userModel.findOne({username: username}, '-_id username password');
        if (!user){
            return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return done(null, false);
        }

        const payload = {
            username: user.username
        }

        return done(null, jwt.encode(payload, jwtSecret));

    } catch (e) {
        console.log(e);
        return done(e, null);
    }
}));

passport.use('bearer', new BearerStrategy({}, async (token, done) => {
    try {
        const payload = jwt.decode(token, jwtSecret);
        const user = await userModel.findOne({username: payload.username}, '-_id username accessLevel');

        if (!user){
            return done(null, false);
        }

        return done(null, user)

    } catch (e) {
        console.log(e)
        return done(e, null);
    }
}));

app.get('/', ((req, res) => {
    console.log('hello')
    res.send("Hello world!")
}));

app.use('/', require('./routes/user.routes'));
app.use('/', require('./routes/product.routes'));
app.use('/', require('./routes/cart.routes'));

app.use((req, res) => {
    console.log("Invalid request URL!");
    return res.status(404).send(
        {
            statusCode: 404,
            requestUri: req.protocol + '://' + req.get('host') + req.originalUrl,
            message: 'The requested resource not found.'
        });
    }
);

app.use((err, req, res) => {
    console.error(err.stack)
    return res.status(500).send({
        statusCode: 500,
        requestUri: req.protocol + '://' + req.get('host') + req.originalUrl,
        message: 'Internal Server Error. Something broke during your request.'
    });
});

app.listen(port, () => {
    console.log('The server is running!')
})
