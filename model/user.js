const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:[true,'Please provide your first name']
    },
    LastName:{
        type: String,
        required: [true, 'Please provide your last name']
    },
    UserName:{
        type : String ,
        unique : true,
        lowercase : true,
        required : [true,"Username can't be empty"]
    },
    Phone:{
        type:Number,
        maxlength:12,
        minlength:9,
        required: [true,"Phone number is required"],
    },
    Email:{
        type:String,
        required: [true,"Email id can't be empty"]
    },
    Password:{
        type:String,
        required: [true,"Password can't be empty"],
    },
    Address:{
        StreetAddress : {type:String},
        City :{type:String}
    },
    role:{
        type:String,
        enum:['customer','vendor','Vendor','Customer'],
        default:"customer"
    }
})

module.exports = mongoose.model('user', userSchema)