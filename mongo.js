const mongoose = require('mongoose')
require('dotenv').config();

module.exports = async () => {
  mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}