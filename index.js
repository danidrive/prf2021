const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

const mongodbUri = process.env.MONGODB_URI;
const port = parseInt(process.env.PORT, 10);

mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Successfully connected!')})
    .catch(err => {console.log('Connection failed: ', err)})

mongoose.connection.on('error', err => {
    console.log('Error occurred in DB: ', err)
});

require('./node_api/models/user.model');
require('./node_api/models/product.model');
const userModel = mongoose.model('user');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

app.use(cors({
    origin: ['http://localhost:4200', 'https://prf2021.herokuapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

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

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', ((req, res) => res.render('pages/index')));

app.use('/api/', require('./node_api/routes/user.routes'));
app.use('/api/', require('./node_api/routes/product.routes'));
app.use('/api/', require('./node_api/routes/cart.routes'));
app.use((req, res) => { return res.sendFile(path.join(__dirname,'public/index.html')); });

app.listen(port, () => {
    console.log('The server is running!')
})
