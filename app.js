const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const apiRoute = require('./controller/routers')

const app = express();

const PORT = process.env.PORT || 4000;
const mongoURI = 'mongodb+srv://nodeapi-reset:api_121@nodeapi-reset-civlt.mongodb.net/Todo?retryWrites=true&w=majority'


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.log('mongodb not connected' + err);
    } else {
        console.log('mongodb connected success');
    }
})

app.get('/', (req, res) => {
    console.log('api working');
    res.send('it is working')
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(apiRoute)

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`connected`);
    } else {
        console.log(`not connected ${err}`);
    }
})

