const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    // Guild ID
    _id: { type: String, require: true },
    language: { type: String, require: true }
})

const languageModel = mongoose.model("languages", languageSchema);

module.exports = languageModel;
