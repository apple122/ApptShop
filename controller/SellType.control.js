const data = require('../model/SellType.model')
const Importtpe = require('../model/Importtpe.model')

const ImControl = {
    // POST
    addSelType: async ( req, res ) => {
        try {
            const newSell = new data.SellType(req.body)
            const saveTYpro = await newSell.save()

            // Status Sell 
            const SellTure = {
                statusSell: 'true'
            }

            await Importtpe.Imtype.findByIdAndUpdate(saveTYpro.v2ImId, SellTure ,{
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

            console.log(saveTYpro)
            res.status(200).json(saveTYpro)
        } catch (error) {
            res.status(500).json(error)
        }
    },
   
    //GET
    getSelType: async ( req, res ) => {
        try {
            const getType = await data.SellType.find().populate("v2ImId")
            res.status(200).json(getType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById
    getByIdSel: async ( req, res ) => {
        try {
            const getByIdType = await data.SellType.findById(req.params.id).populate("v2ImId")
            res.status(200).json(getByIdType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById Name
    getByIdNameSelType: async ( req, res ) => {
        try {
            const getByIdType = await data.SellType.find({"v2ImId" : req.params.v2ImId}).populate("v2ImId")
            console.log(getByIdType.length)
            res.status(200).json({
                length: getByIdType.length,
                getByIdType
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //PUT
    PutSelType: async ( req, res ) => {
            try {
                
                const PutType = await data.SellType.findByIdAndUpdate(req.params.id, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                })
                console.log(PutType)
                res.status(200).json(PutType)
            } catch (error) {
                res.status(500).json(error)
            }
    },

    //Delete
    DelSelType: async ( req, res ) => {
        try {
            const DelType = await data.SellType.findByIdAndDelete(req.params.id)
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

}

module.exports = ImControl