const data = require('../model/Importtpe.model')
var multer = require('multer');
var path = require('path')

const storage = multer.diskStorage({
    destination: './upload/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}-image-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

const ImControl = {
    // POST
    addImType: ( req, res ) => {
        const file = req.files.v2image
        file.mv('./upload/IMG/' + file.name, async function(err, result) {
            try {
                const dataIm = {
                    v1typeId: req.body.v1typeId,
                    v2image: req.files.v2image.name,
                    v2typeSl: req.body.v2typeSl,
                    sizev2: req.body.sizev2,
                    v2sprice: req.body.v2sprice,
                    v2qty: req.body.v2qty,
                    v2amount: req.body.v2amount,
                    curdate: req.body.curdate
                }
                const saveTYpro = await data.Imtype.create(dataIm)
                console.log(saveTYpro)
                res.status(200).json(saveTYpro)
            } catch (error) {
                res.status(500).json(error)
            }
        })
        
    },
   
    //GET
    getImType: async ( req, res ) => {
        try {
            const getType = await data.Imtype.find().populate("v1typeId")
            res.status(200).json(getType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById
    getByIdImType: async ( req, res ) => {
        try {
            const getByIdType = await data.Imtype.findById(req.params.id).populate("v1typeId")
            res.status(200).json(getByIdType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById Name
    getByIdNameImType: async ( req, res ) => {
        try {
            const getByIdType = await data.Imtype.find({"v1typeId" : req.params.v1typeId}).populate("v1typeId")
            console.log(getByIdType.length)
            res.status(200).json({
                length: getByIdType.length,
                getByIdType
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById Name Status
    getByIdNameImType: async ( req, res ) => {
        try {
            const getByIdType = await data.Imtype.find({"id" : req.params.id})
            console.log(getByIdType.length)
            res.status(200).json(
                getByIdType
            )
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //PUT
    PutImType: async ( req, res ) => {
        const file = req.files.v2image
        file.mv('./upload/IMG/' + file.name, async function(err, result) {
            let PutType = await data.Imtype.findById(req.params.id);
            try {
                const dataIm = {
                    v1typeId: req.body.v1typeId,
                    v2image: req.files.v2image.name,
                    v2typeSl: req.body.v2typeSl,
                    sizev2: req.body.sizev2,
                    v2sprice: req.body.v2sprice,
                    v2qty: req.body.v2qty,
                    v2amount: req.body.v2amount,
                    curdate: req.body.curdate
                }
                const PutType = await data.Imtype.findByIdAndUpdate(req.params.id, dataIm, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                })
                console.log(PutType)
                res.status(200).json(PutType)
            } catch (error) {
                res.status(500).json(error)
            }
        })
    },
    

    //Delete
    DelImType: async ( req, res ) => {
        try {
            const DelType = await data.Imtype.findByIdAndDelete(req.params.id)
            console.log({
                respone: 'ລົບຂໍ້ມູນສຳເລັດ',
                status: DelType
            })
            res.status(200).json({
                respone: 'ລົບຂໍ້ມູນສຳເລັດ',
                status: DelType
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // PATCH
    PatchImType: async ( req, res ) => {
        
        let PutType = await data.Imtype.findById(req.params.id);
        try {
            const file = req.files.v2image
            file.mv('./upload/IMG/' + file.name, async function(err, result) {
            const dataIm = {
                v1typeId: req.body.v1typeId,
                v2image: req.files.v2image.name,
                v2typeSl: req.body.v2typeSl,
                sizev2: req.body.sizev2,
                v2sprice: req.body.v2sprice,
                v2qty: req.body.v2qty,
                v2amount: req.body.v2amount,
                curdate: req.body.curdate
            }
            const PutType = await data.Imtype.findByIdAndUpdate(req.params.id, dataIm, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            console.log(PutType)
            res.status(200).json(PutType)
            })
        } catch (error) {
            const dataIm = {
                v1typeId: req.body.v1typeId,
                v2image: req.body.v2image,
                v2typeSl: req.body.v2typeSl,
                sizev2: req.body.sizev2,
                v2sprice: req.body.v2sprice,
                v2qty: req.body.v2qty,
                v2amount: req.body.v2amount,
                curdate: req.body.curdate
            }
            const PutType = await data.Imtype.findByIdAndUpdate(req.params.id, dataIm, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            console.log(PutType)
            res.status(200).json(PutType)
        }
    },


    // PATCH STATUS
    PatchImTypeSTATUS: async ( req, res ) => {
        
        try {
            const dataIm = {
                bprice: req.body.bprice,
                status: req.body.status
            }
            const PutType = await data.Imtype.findByIdAndUpdate(req.params.id, dataIm, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            console.log(PutType)
            res.status(200).json(PutType)
        } catch (error) {
            console.log(error)
        }
    },

    // PATCH DATE
    PatchImTypeDATE: async ( req, res ) => {
        try {
            const dataIm = {
                curdate: req.body.curdate
            }
            const PutType = await data.Imtype.findByIdAndUpdate(req.params.id, dataIm, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            console.log(PutType)
            res.status(200).json(PutType)
        } catch (error) {
            console.log(error)
        }
    },

    // PATCH HistoryQty
    HistoryQty: async ( req, res ) => {
        
        try {
            const file = req.files.v2image
            file.mv('./upload/IMG/' + file.name, async function(err, result) {})
        } catch (error) {
            const dataIm = {
                HistoryQty: req.body.HistoryQty,
            }
            const PutType = await data.Imtype.findByIdAndUpdate(req.params.id, dataIm, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            console.log(PutType)
            res.status(200).json(PutType)
        }
    },
}

module.exports = ImControl