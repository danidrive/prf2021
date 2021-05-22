const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('Connected');
    client.close().then(() => console.log('Closed'));
});

const port = parseInt(process.env.PORT, 10);

app.get('/', ((req, res) => {
    console.log('hello')
    res.send("Hello world!")
}));

app.listen(port, () => {
    console.log('The server is running!')
})