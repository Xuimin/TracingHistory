const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI
db.history = require("./history.model.js")(mongoose);

module.exports = db