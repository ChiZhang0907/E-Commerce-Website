const express = require('express')
const connectDataBase = require('./database/database')


connectDataBase()
const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(3000)
