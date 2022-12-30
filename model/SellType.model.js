const mongoose = require('mongoose')
const data = require('./Importtpe.model');

const Schema = new mongoose.Schema({
    v2ImId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : data.Imtype,
        default: null
    },
    number_bin: {
        type: Number,
        default: null
    },
    v4qty: {
        type: Number,
        default: null
    },
    v4bprice: {
        type: Number,
        default: null
    },
    v4amount: {
        type: Number,
        default: null
    },
    curdate: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: false
    },
    UserUID: {
        type: String,
        required: true
    }
})

let SellType = mongoose.model("SellType", Schema)

module.exports = { SellType }