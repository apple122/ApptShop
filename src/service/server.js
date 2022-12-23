export default {
    URL : 'http://localhost:3022',
    IMG : 'http://localhost:3022/profile/',

    // API TypePro
    PostTypePro : '/v1/type/add',
    PutTypePro : '/v1/type/put/',
    getTypePro : '/v1/type/get',
    getTypeProUID: '/v1/type/getById/',
    DeTypePro : '/v1/type/delete/',

    // API IMP 
    PostIMP : '/v2/imtype/add',
    PutIMP : '/v2/imtype/put/',
    PatchIMP : '/v2/imtype/patch/',
    PatchIMPSTATUS : '/v2/imtype/patchstatus/',
    PatchHistory : '/v2/imtype/historyQty/',
    GetIMP : '/v2/imtype/get',
    GetIdIMP : '/v2/imtype/getById/',
    getTypeUID: '/v2/imtype/getByIdType/',
    getTypeNameOffline: '/v2/imtype/Offline',
    DelIMP : '/v2/imtype/delete/',

    // API SellType
    PostSell : '/v4/selltype/add',
    GetSell : '/v4/selltype/get',
    GetBySell : '/v4/selltype/getById/',
    GetByNameSell : '/v4/selltype/getByIdName/',
    DelBySell : '/v4/selltype/delete/',
}