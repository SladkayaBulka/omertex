const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({ 
    token:String,
    userId:String,
    tokenCreationTime: Date,
    tokenExpirationTime: Date
});

module.exports = mongoose.model('Token', TokenSchema);