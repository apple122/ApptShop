const data = require('../model/mdTypePro')

const conTypePro = {
    // POST
    addTYpe: async ( req, res ) => {
        try {
            const newTypro = new data.typepro(req.body)
            const saveTYpro = await newTypro.save()
            res.status(200).json(saveTYpro)
        } catch (error) {
            res.status(500).json(error)
        }
    },
   
    //GET
    getType: async ( req, res ) => {
        try {
            const getType = await data.typepro.find()
            res.status(200).json(getType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById
    getByIdType: async ( req, res ) => {
        try {
            const getByIdType = await data.typepro.findById(req.params.id)
            res.status(200).json(getByIdType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //PUT
    PutType: async ( req, res ) => {
        let PutType = await data.typepro.findById(req.params.id);
        PutType = await data.typepro.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            res.status(200).json({
                success: true,
                    PutType
            })
    },

    //Delete
    DelType: async ( req, res ) => {
        try {
            const DelType = await data.typepro.findByIdAndDelete(req.params.id)
            res.status(200).json(DelType)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    PatchType: async ( req, res ) => {
        try {
            const dataIm = {
                status: req.body.status
            }
            const PutType = await data.typepro.findByIdAndUpdate(req.params.id, dataIm, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            res.status(200).json(PutType)
            console.log(PutType)
        } catch (error) {
           console.log(error)
        }
       
    },
}

module.exports = conTypePro