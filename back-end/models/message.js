let mongoose = require('mongoose')

var Message = mongoose.model("Message", { content: String, createdAt: Date, userId: String,chat:String })


module.exports = Message;