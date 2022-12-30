var express = require('express');
const ImControl = require('../controller/Importtype.controller');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Display : ImportTYpe');
});

    /**
    * @swagger
    * tags:
    *  name: ImportType
    *  description: IMP API
    */
//POST
    /**
     * @swagger
     * /v2/imtype/add:
     *  post:
     *   summary: POST IMP
     *   tags: [ImportType]
     *   description: Create new IMP API.
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              v1typeId:
     *                type: string
     *              v2image:
     *                type: string
     *                format: binary
     *              v2typeSl:
     *                type: string
     *              sizev2:
     *                type: string
     *              v2sprice:
     *                type: string
     *              v2qty:
     *                type: string
     *              v2amount:
     *                type: string
     *              curdate:
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
router.post('/imtype/add', ImControl.addImType)

//GET
/**
    * @swagger
    * /v2/imtype/get:
    *  get:
    *   summary: GET IMP
    *   tags: [ImportType]
    *   description: GET IMT API.
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
router.get('/imtype/get', ImControl.getImType)

//GET ById
    /**
     * @swagger
     * /v2/imtype/getById/{id}:
     *  get:
     *   summary: Get single IMP
     *   tags: [ImportType]
     *   description: Get single IMP by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: IMP_ID
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
router.get('/imtype/getById/:id', ImControl.getByIdImType)

//GET getByIdType
    /**
     * @swagger
     * /v2/imtype/getByIdType/{v1typeId}:
     *  get:
     *   summary: Get all IMP
     *   tags: [ImportType]
     *   description: Get All IMP by id.
     *   parameters:
     *    - in: path
     *      name: v1typeId
     *      schema:
     *       type: string
     *      required: true
     *      description: TYPE_ID
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
    router.get('/imtype/getByIdType/:v1typeId', ImControl.getByIdNameImType)

//PUT
    /**
     * @swagger
     * /v2/imtype/put/{id}:
     *  put:
     *   summary: Put Update IMP
     *   tags: [ImportType]
     *   description: update IMP by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *      type: string
     *      required: true
     *      description: IMP_ID
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              v1typeId:
     *                type: string
     *              v2image:
     *                type: string
     *                format: binary
     *              v2typeSl:
     *                type: string
     *              sizev2:
     *                type: string
     *              v2sprice:
     *                type: string
     *              v2qty:
     *                type: string
     *              v2amount:
     *                type: string
     *              curdate:
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
router.put('/imtype/put/:id', ImControl.PutImType)

//Delete
    /**
     * @swagger
     * /v2/imtype/delete/{id}:
     *  delete:
     *   summary: Delete IMP
     *   tags: [ImportType]
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: IMP_ID
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
router.delete('/imtype/delete/:id', ImControl.DelImType)

//PATCH
    /**
     * @swagger
     * /v2/imtype/patch/{id}:
     *  patch:
     *   summary: patch Update IMP
     *   tags: [ImportType]
     *   description: update IMP by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *      type: string
     *      required: true
     *      description: IMP_ID
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              v1typeId:
     *                type: string
     *              v2image:
     *                type: string
     *                format: binary
     *              v2typeSl:
     *                type: string
     *              sizev2:
     *                type: string
     *              v2sprice:
     *                type: string
     *              v2qty:
     *                type: string
     *              v2amount:
     *                type: string
     *              curdate:
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
    router.patch('/imtype/patch/:id', ImControl.PatchImType)

    //PATCH STATUS
    /**
     * @swagger
     * /v2/imtype/patchstatus/{id}:
     *  patch:
     *   summary: patch Update status IMP
     *   tags: [ImportType]
     *   description: update IMP by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *      type: string
     *      required: true
     *      description: IMP_ID
     *   requestBody:
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              bprice:
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
    router.patch('/imtype/patchstatus/:id', ImControl.PatchImTypeSTATUS)

//PATCH HistoryQty
    router.patch('/imtype/historyQty/:id', ImControl.HistoryQty)

//GET ById Name Status
    /**
     * @swagger
     * /v2/imtype/Offline/{id}:
     *  get:
     *   summary: Get Offline IMP
     *   tags: [ImportType]
     *   description: Get Offline IMP by id.
     *   parameters:
     *    - in: path
     *      name: id
     *      schema:
     *       type: string
     *      required: true
     *      description: TYPE_ID
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
    router.get('/imtype/Offline/:id', ImControl.getByIdNameImType)
    router.patch('/imtype/curdate/:id', ImControl.PatchImTypeDATE)


module.exports = router;
