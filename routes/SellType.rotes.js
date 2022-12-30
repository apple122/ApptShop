var express = require('express');
const ImControl = require('../controller/SellType.control');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Display : SellTYpe');
});

/**
    * @swagger
    * tags:
    *  name: SellType
    *  description: Sell API
    */
//POST
    /**
     * @swagger
     * /v4/selltype/add:
     *  post:
     *   summary: POST Sell
     *   tags: [SellType]
     *   description: Create new Sell API.
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              v2ImId:
     *                type: string
     *              number_bin:
     *                type: string
     *              v4qty:
     *                type: string
     *              v4bprice:
     *                type: string
     *              v4amount:
     *                type: string
     *              curdate:
     *                type: string
     *              UserUID:
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
router.post('/selltype/add', ImControl.addSelType)

//GET
/**
    * @swagger
    * /v4/selltype/get:
    *  get:
    *   summary: GET SellType
    *   tags: [SellType]
    *   description: GET SellType API.
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
router.get('/selltype/get', ImControl.getSelType)

//GET ById
    /**
     * @swagger
     * /v4/selltype/getById/{id}:
     *  get:
     *   summary: Get single SellType
     *   tags: [SellType]
     *   description: Get single SellType by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: SL_ID
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
    router.get('/selltype/getById/:id', ImControl.getByIdSel)

//GET ById Name
    /**
     * @swagger
     * /v4/selltype/getByIdName/{v2ImId}:
     *  get:
     *   summary: Get single getByIdName
     *   tags: [SellType]
     *   description: Get all getByIdName by id.
     *   parameters:
     *    - in: path
     *      name: v2ImId
     *      schema:
     *       type: string
     *      required: true
     *      description: SL_ID
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
    router.get('/selltype/getByIdName/:v2ImId', ImControl.getByIdNameSelType)

//Delete
    /**
     * @swagger
     * /v4/selltype/delete/{id}:
     *  delete:
     *   summary: Delete SellType
     *   tags: [SellType]
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: SL_ID
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
router.delete('/selltype/delete/:id', ImControl.DelSelType)


module.exports = router;
