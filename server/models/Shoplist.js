const mongoose = require('mongoose');
const Schema = mongoose.Schema

const paymentSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps: true})

const Shoplist = mongoose.model('Shoplist', paymentSchema);

module.exports = {Shoplist}