const mongoose = require('mongoose')
const data = require('./mdTypePro');

const Schema = new mongoose.Schema({
    v1typeId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : data.typepro,
        default: null
    },
    v2image: {
        type: String,
        default: null
    },
    v2typeSl: {
        type: String,
        default: null
    },
    sizev2: {
        type: String,
        default: null
    },
    v2sprice: {
        type: Number,
        default: null
    },
    v2qty: {
        type: Number,
        default: null
    },
    HistoryQty: {
        type: Number,
        default: 0
    },
    v2amount: {
        type: Number,
        default: null
    },
    curdate: {
        type: String,
        default: null
    },
    bprice: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: false
    },
    statusSell: {
        type: String,
        default: false
    },
})

let Imtype = mongoose.model("Importtype", Schema)

module.exports = { Imtype }