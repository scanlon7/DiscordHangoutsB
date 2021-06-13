const mongoose = require('mongoose');

const specialSchema = new mongoose.Schema({
    User: String,
})

const specialSchemaModel = mongoose.model("Special List", specialSchema);

module.exports = specialSchemaModel;
