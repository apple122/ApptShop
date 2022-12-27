const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    v1type: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    curdate: {
        type: String
    },
    status: {
        type: String,
        default: false
    },
})

let typepro = mongoose.model("TypePro", Schema)

module.exports = { typepro }