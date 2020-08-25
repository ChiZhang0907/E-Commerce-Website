const mongoose = require('mongoose')

function connectDataBase() {
    mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.on('error', () => {
        console.log('Database connection error')
    })

    mongoose.connection.on('open', async() => {
        console.log('Database connection success')
    })
}

module.exports = connectDataBase