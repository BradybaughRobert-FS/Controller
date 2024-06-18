const mongoose = require('mongoose');

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
    
    });
    console.log(`Connected to MongoDB ${conn.connection.host}`);
}    catch(error){
    console.log(error)
}
};

module.exports = connectDB;