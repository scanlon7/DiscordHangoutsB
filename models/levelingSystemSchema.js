const mongoose = require('mongoose');

const levelingSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
})

const levelingSystemModel = mongoose.model("LevelingSystem", levelingSchema);

module.exports = levelingSystemModel;
