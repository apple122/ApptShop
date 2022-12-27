var express = require('express');
const conTypePro = require('../controller/conTypePro');
var router = express.Router();

/* GET users listing. */
router.get('/type', function(req, res, next) {
    res.send('Display con OK');
});
    /**
    * @swagger
    * tags:
    *  name: TYPE
    *  description: Type api
    */

//POST
   /**
     * @swagger
     * /v1/type/add:
     *  post:
     *   summary: post type
     *   tags: [TYPE]
     *   description: Create new TYPE API.
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              v1type:
     *                type: string
     *              remark:
     *                type: string
     *              curdate:
     *                type: string
     *              status:
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
router.post('/type/add', conTypePro.addTYpe)

//GET
    /**
    * @swagger
    * /v1/type/get:
    *  get:
    *   summary: get type
    *   tags: [TYPE]
    *   description: get type API.
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
router.get('/type/get', conTypePro.getType)

//GET ById
    /**
     * @swagger
     * /v1/type/getById/{id}:
     *  get:
     *   summary: Get single TYPE
     *   tags: [TYPE]
     *   description: Get single type by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: type_id
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
router.get('/type/getById/:id', conTypePro.getByIdType)

//PUT
    /**
     * @swagger
     * /v1/type/put/{id}:
     *  put:
     *   summary: Put Update type
     *   tags: [TYPE]
     *   description: update type by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *      type: string
     *      required: true
     *      description: type_id
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              v1type:
     *                type: string
     *              remark:
     *                type: string
     *              curdate:
     *                type: string
     *              status:
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
router.put('/type/put/:id', conTypePro.PutType)

//Delete
    /**
     * @swagger
     * /v1/type/delete/{id}:
     *  delete:
     *   summary: Delete type
     *   tags: [TYPE]
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: id
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
router.delete('/type/delete/:id', conTypePro.DelType)

router.patch('/type/patchStatus/:id', conTypePro.PatchType)


module.exports = router;