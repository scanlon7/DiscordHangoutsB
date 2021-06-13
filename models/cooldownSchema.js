const mongoose = require('mongoose')

let cooldownSchema = new mongoose.Schema({
    userId: String,
    cmd: String,
    time: Number,
    cooldown: Number,
})

module.exports = mongoose.model('cooldown', cooldownSchema)