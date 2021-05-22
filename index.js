const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongodbUri = process.env.MONGODB_URI;
const port = parseInt(process.env.PORT, 10);

mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => {
            console.log('Successfully connected!')
        })
    .catch(
        err => {
            console.log('Connection failed: ', err)
        })

mongoose.connection.on('error', err => {
    console.log('Error occurred in DB: ', err)
});

require('./models/example.model');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

app.get('/', ((req, res) => {
    console.log('hello')
    res.send("Hello world!")
}));

app.use('/', require('./routes/example.route'));

app.use((req, res) => {
    console.log("Invalid request URL!")
    res.status(404).send(
        {
            statusCode: 404,
            requestUri: req.protocol + '://' + req.get('host') + req.originalUrl,
            message: 'The requested resource not found.'
        })
})

app.listen(port, () => {
    console.log('The server is running!')
})