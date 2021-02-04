let mongoose = require('mongoose')

var Chat = mongoose.model("Chat", { users: [String] })
module.exports = Chat;