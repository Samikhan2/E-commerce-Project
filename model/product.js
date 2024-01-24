const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: [true, 'Please provide a name for the product']
    },
    ProductCategory: {
        type: String,
        enum: ['Electronics', 'Furniture', 'Clothing'],
        default: 'Electronics',
    },
    ProductPrice: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    ProductKey: {
        type: String,
        unique: true,
        required: [true, "Please assign your product with a unique key"]
    },
    ProductDescription: {
        type: String,
        maxlength: 1024,
    },
    ProductTags: {
        type: [{ type: String }],
        default: [],
    },
})

module.exports = mongoose.model('product', productSchema)