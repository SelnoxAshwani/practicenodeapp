const mongoose = require('mongoose');
async function mongodbconnect(){
   mongoose.connect( process.env.MONGO_URI || 'mongodb://localhost:27017/admin').then(() => console.log('Connected to MongoDB using Mongoose!'))
}
module.exports={mongodbconnect}