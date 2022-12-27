const data = require('../model/Login.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const ImControl = {
    // POST
    addLogin: async ( req, res ) => {
        try {

            const olduser = await data.Login.findOne({ UserName: req.body.UserName })
            if(olduser){
                return res.status(409).send("User already exist. Please Login")
            }

            const newLogin = await data.Login.create({
                UserName: req.body.UserName,
                Password: bcrypt.hashSync(req.body.Password, 8)
            })

            const token = jwt.sign(
                { user_id: newLogin._id },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h"
                }
            )

            newLogin.token = token
            res.status(200).json(newLogin)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // Login
    addPOSTLogin: async ( req, res ) => {
        try {
            const { UserName, Password } = req.body

            if( !(UserName && Password)) {
                res.status(400).json("All input is required")
            }

            const olduser = await data.Login.findOne({ UserName })
            if(olduser && (await bcrypt.compare(Password, olduser.Password))){
                const token = jwt.sign(
                    { user_id: olduser._id },
                    process.env.TOKEN_KEY, {
                        expiresIn: "2h"
                    }
                )
                olduser.token = token
                const dataTrue = {
                    status: 'true'
                }
                StatusLogin = await data.Login.findByIdAndUpdate(olduser._id, dataTrue, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                });
                res.status(200).send(olduser)

            }else{
                res.status(400).send("Invalid Credentials")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    },
    
   
    //GET
    getLogin: async ( req, res ) => {
        try {
            const getLogin = await data.Login.find()
            res.status(200).json(getLogin)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET ById
    getByIdLogin: async ( req, res ) => {
        try {
            const getLogin = await data.Login.findById(req.params.id)
            res.status(200).json(getLogin)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //PUT
    PutLogin: async ( req, res ) => {
        let PutLogin = await data.Login.findById(req.params.id);
        PutLogin = await data.Login.findByIdAndUpdate(req.params.id, req.body, {
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
    DelLogin: async ( req, res ) => {
        try {
            const Delete = await data.Login.findByIdAndDelete(req.params.id)
            console.log({
                respone: 'ລົບຂໍ້ມູນສຳເລັດ',
                status: Delete
            })
            res.status(200).json({
                respone: 'ລົບຂໍ້ມູນສຳເລັດ',
                status: Delete
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    Logout: async ( req, res ) => {
        let PutLogin = await data.Login.findById(req.params.id);
        const dataTrue = {
            status: 'false'
        }
        StatusLogin = await data.Login.findByIdAndUpdate(PutLogin._id, dataTrue, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json(StatusLogin)
    },
}

module.exports = ImControl