const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Types.ObjectId, required: true, ref:"Product" },
    quantity: { type: Number, required: true },
    adresss:{
        street :{type:String},
        suite: {type: String},
    }
})