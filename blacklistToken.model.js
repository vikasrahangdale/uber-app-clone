const mongoose = require('mongoose');

// Blacklist Schema
const blacklistSchema = new mongoose.Schema({
 
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }

})
module.exports = mongoose.model('Blacklist', blacklistSchema);
