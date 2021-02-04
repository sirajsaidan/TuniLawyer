
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    phone: String,
    cin: Number,
    sex: Boolean,
    description: String,
    specialities: [String],
    role: String,
    zipCode: String

})
module.exports = mongoose.model("user", UserSchema);
