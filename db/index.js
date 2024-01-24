const mongoose = require('mongoose')

const connectDB = async ()=>{
try{
    const res = await mongoose.connect(process.env.MONOGOURL);
    console.log('Connected to database');
}catch(err){
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
}
};
module.exports = connectDB;