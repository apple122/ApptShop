var express = require('express');
var router = express.Router();
const Login = require('../controller/Login.control')
const auth = require('../min]ddleware/auth')

router.get('/', function(req, res, next) {
    res.send('Display : Login');
});

/**
    * @swagger
    * tags:
    *  name: Login
    *  description: Create API
    */
//POST
    /**
     * @swagger
     * /Login/Create:
     *  post:
     *   summary: POST Login
     *   tags: [Login]
     *   description: Create new Login API.
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              UserName:
     *                type: string
     *              Password:
     *                type: string
     *   responses:
     *    200:
     *       description: OK
     *    403:
     *       description: Forbiden
     *    401:
     *       description: Unauthorization
     *    404:
     *       description: Not found
     *    500:
     *       description: Some server error
     */
router.post('/Create', Login.addLogin), 

//POST LOGIN
    /**
     * @swagger
     * /Login/Login:
     *  post:
     *   summary: POST Login
     *   tags: [Login]
     *   description: Create new Login API.
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              UserName:
     *                type: string
     *              Password:
     *                type: string
     *   responses:
     *    200:
     *       description: OK
     *    403:
     *       description: Forbiden
     *    401:
     *       description: Unauthorization
     *    404:
     *       description: Not found
     *    500:
     *       description: Some server error
     */
router.post('/Login', Login.addPOSTLogin), 
router.post('/welcom', auth, (req, res) => {
    res.status(200).send('Welcom OK')
})

//GET
/**
    * @swagger
    * /Login/GetLogin:
    *  get:
    *   summary: GET Login
    *   tags: [Login]
    *   description: GET Login API.
    *   responses:
    *    200:
    *       description: OK
    *    403:
    *       description: Forbiden
    *    401:
    *       description: Unauthorization
    *    404:
    *       description: Not found
    *    500:
    *       description: Some server error
    */
router.get('/GetLogin', Login.getLogin), 

// GETBYID
/**
     * @swagger
     * /Login/GetById/{id}:
     *  get:
     *   summary: GetById Login
     *   tags: [Login]
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: User_ID
     *   responses:
     *    200:
     *       description: OK
     *    403:
     *       description: Forbiden
     *    401:
     *       description: Unauthorization
     *    404:
     *       description: Not found
     *    500:
     *       description: Some server error
     */
router.get('/GetById/:id', Login.getByIdLogin), 

router.put('/Update/:id', Login.PutLogin), 

//Delete
    /**
     * @swagger
     * /Login/delete/{id}:
     *  delete:
     *   summary: Delete Login
     *   tags: [Login]
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: User_ID
     *   responses:
     *    200:
     *       description: OK
     *    403:
     *       description: Forbiden
     *    401:
     *       description: Unauthorization
     *    404:
     *       description: Not found
     *    500:
     *       description: Some server error
     */
router.delete('/delete/:id', Login.DelLogin), 
router.patch('/logout/:id', Login.Logout), 

module.exports = router;