const mongoose = require('mongoose')

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connection successful');
      } catch (err) {
        console.error('MongoDB connection error:', err.message);
      }
    
}

module.exports = {
    connectToMongoDB
}