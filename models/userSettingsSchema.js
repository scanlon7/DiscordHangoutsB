const mongoose = require('mongoose');

const UserSettingsSchema = new mongoose.Schema({
    // Guild ID
    _id: { type: String, require: true },
    noExp: { type: String, require: true }
})

const userSettingsModel = mongoose.model("User Settings", UserSettingsSchema);

module.exports = userSettingsModel;
 