const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    UserName: {
        type : String,
        required: true
    },
    Password: {
        type : String,
        required: true
    },
    token: {
        type: String,
    },
    status: {
        type: String,
        default: false
    }
})

let Login = mongoose.model("Login", Schema)

module.exports = { Login }