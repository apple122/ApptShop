import axios from 'axios';
import plant from '../assets/GIF/Plant.gif'
import React, { useState, useEffect, useReducer } from 'react';
import Moment from 'moment';
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import DB from '../service/server'
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'

function ImportedTYPE() {

    let x = 1

    const [ GetAPI, setGETAPI ] = useState([])
    const [ GetAPIIMP, setGETAPIIMP ] = useState([])
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    useEffect(() => {
      axios.get(DB.URL + DB.getTypePro).then((res) => {
        setGETAPI(res.data.reverse())
      })

      axios.get(DB.URL + DB.GetIMP).then((res) => {
        setGETAPIIMP(res.data.reverse())
      })
    }, [reducer])

    const Reload = () => {
        setRedeuce()
        
    }

    const [ UIDSL, setUIDSL ] = useState('')
    let [ v1type, setv1type ] = useState('')
    let [ v1remark, setv1reamrk ] = useState('')
    if(UIDSL == ''){}else{
        axios.get(DB.URL + DB.getTypeProUID + UIDSL).then((res) => {
            setv1type(res.data.v1type)
            setv1reamrk(res.data.remark)
        }).catch((err) => {
            setv1type('')
            setv1reamrk('')
        })
    }
    const [ ImSprice, setImSprice ] = useState('')
    const [ AmountMoney, setamountMoney ] = useState('')
    const [ v2typeSl, setv2typeSl ] = useState('')
    const [ sizev2, setsizev2 ] = useState('')
    let AmontDown = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(ImSprice * AmountMoney)

    const [file, setFile] = useState();
    const [fileShow, setFileShow] = useState();
    function handleChange(e) {
        setFile((e.target.files[0]));
        setFileShow(URL.createObjectURL(e.target.files[0]));
    }
    const [ spineSave, setSpinner ] = useState(false)
    const Save = (e) => {
        e.preventDefault()
        setSpinner(true)
        try {
            const formData = new FormData()
            formData.append('v1typeId', UIDSL)
            formData.append('v2image', file)
            formData.append('v2typeSl', v2typeSl)
            formData.append('sizev2', sizev2)
            formData.append('v2sprice', ImSprice)
            formData.append('v2qty', AmountMoney)
            formData.append('v2amount', (ImSprice * AmountMoney))
            formData.append('curdate', Moment().format('YYYY/MM/DD'))
            
            axios.post(DB.URL + DB.PostIMP, formData).then((res) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '??????????????????????????????????????????????????????',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 400,
                  })
                setRedeuce()
                setSpinner(false)
                console.log('POST: Success ', Moment().format('YYYY/MM/DD H:mm:ss'))
                
              }).then((res) => {
                axios.patch(DB.URL + DB.PatchtypePro + UIDSL, {
                    status: 'true'
                })
              })
        } catch (error) {
            alert(error)
        }
    }

    const Delete = (ID) => {
        try {
            Swal.fire({
                title: '????????????????????????????????????????????????????????????????????? ???????????? ??????????',
                text: "???????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '???????????????????????????!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(DB.URL + DB.DelIMP + ID).then((res) => {
                        Swal.fire(
                            '?????????????????????????????????????????????!',
                            'Your file has been deleted.',
                            'success'
                            )
                        setRedeuce()
                        console.log('DELETE: Success ', Moment().format('YYYY/MM/DD H:mm:ss'))
                    })
                }
            })
        } catch (error) {
            alert(error)
        }
    }

// Edit Update
    const [ EImSprice, EsetImSprice ] = useState('')
    const [ EAmountMoney, EsetamountMoney ] = useState('')
    const [ Ev2typeSl, Esetv2typeSl ] = useState('')
    const [ Esizev2, Esetsizev2 ] = useState('')
    const [ v2UIDImage, setv2UIDImage ] = useState('')
    const [ v1typeId, setv2UIDv1typeId ] = useState('')

    const EAmontDown = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(EImSprice * EAmountMoney))
    const [preview, setPreview] = useState('')
    const [Image, setImage] = useState('')
    function imageHandler(e) {
        setImage(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    // v2UIDType
    const [ v2UIDType, setv2UIDType ] = useState('')
    const [ v2UIDTypeS, setv2UIDTypeS ] = useState('')
    const [ v2UIDremark, setv2UIDremark ] = useState('')
    if(v2UIDType == ''){}else{
        axios.get(DB.URL + DB.getTypeProUID + v2UIDType).then((res) => {
            setv2UIDTypeS(res.data.v1type)
            setv2UIDremark(res.data.remark)
        }).catch((err) => {
            setv1type('')
            setv1reamrk('')
        })
    }

    const [ v2UIDTypeSS, setv2UIDTypeSS ] = useState('')
    const [ v2UIDremarkS, setv2UIDremarkS ] = useState('')
    const [ UIDSHOW, setUIDSHOW ] = useState('')
    const Update = (id) => {
        setSuccess('')
        setPreview('')
        setUIDSHOW(id)
        axios.get(DB.URL + DB.GetIdIMP + id).then((res) => {
            EsetImSprice(res.data.v2sprice)
            EsetamountMoney(res.data.v2qty)
            Esetv2typeSl(res.data.v2typeSl)
            Esetsizev2(res.data.sizev2)
            setv2UIDImage(res.data.v2image)
            setv2UIDv1typeId(res.data.v1typeId._id)
            setv2UIDTypeSS(res.data.v1typeId.v1type)
            setv2UIDremarkS(res.data.v1typeId.remark)
        })        
    }
    const Cancel = () => {
        setUIDSHOW('')
    }

    const [ Success, setSuccess ] = useState('')
    const updateSave = (e) => {
        e.preventDefault()
        setSpinner(true)
        try {
            const formData = new FormData()
            formData.append('v1typeId', v2UIDType == '' ? v1typeId : v2UIDType)
            formData.append('v2image', Image == '' ? v2UIDImage : Image)
            formData.append('v2typeSl', Ev2typeSl)
            formData.append('sizev2', Esizev2)
            formData.append('v2sprice', EImSprice)
            formData.append('v2qty', EAmountMoney)
            formData.append('v2amount', (EImSprice * EAmountMoney))
            formData.append('curdate', Moment().format('YYYY/MM/DD'))

            axios.patch(DB.URL + DB.PatchIMP + UIDSHOW, formData).then((res) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '??????????????????????????????????????????????????????',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 400,
                  })
                setRedeuce()
                setSuccess('Success')
                setSpinner(false)
                console.log('PATCH: Success ', Moment().format('YYYY/MM/DD H:mm:ss'))

              })
        } catch (error) {
            alert(error)
        }
    }

    async function OnlineSell (UID) {
        const { value: text } = await Swal.fire({
            title: '?????????????????????????????? (???????????????)',
            input: 'text',
            inputLabel: '?????????????????????????????? ????????????????????? (???????????????)',
            inputPlaceholder: '??????????????????????????????: ...',
            inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
            }
        })
        
        if (text) {
            const bprice = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(text))
            try {
                axios.patch(DB.URL + DB.PatchIMPSTATUS + UID, {
                    bprice: text,
                    status: true
                }).then((res) => {
                    Swal.fire(
                        '????????????????????????????????????????????????!',
                        `???????????????????????????????????????????????? ????????????: ${bprice}`,
                        'success'
                        )
                    setRedeuce()
                })
            } catch (error) {
                alert(error)
            }
            
        }
    }
    async function OffSell (UID) {
        const { value: text } = await Swal.fire({
            title: '???????????????????????????',
            input: 'text',
            inputLabel: '?????????????????????????????? Confirm',
            inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
            }
        })
        
        if(text) {
            try {
                if(text == 'Confirm'){
                    axios.patch(DB.URL + DB.PatchIMPSTATUS + UID, {
                        bprice: null,
                        status: false
                    }).then((res) => {
                        Swal.fire(
                            '?????????????????????????????????????????????!',
                            `????????????????????????????????????????????? Key: ${text}`,
                            'success'
                            )
                        setRedeuce()
                    })
                }else{
                    Swal.fire(
                        '????????????????????????????????????????????????????????????!',
                        `?????????????????????????????? Key: Confirm`,
                        'question'
                        )
                    setRedeuce()
                }
            } catch (error) {
                alert(error)
            }
            
        }
    }

    function OffLineSell (UID) {
        try {
            Swal.fire({
                title: '???????????????????????????????',
                text: "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '???????????????????????????!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch(DB.URL + DB.PatchIMPSTATUS + UID, {
                        bprice: null,
                        status: 'offline'
                    }).then((res) => {
                        axios.patch(DB.URL + DB.PatchIMPDATE + UID, {
                            curdate: Moment().format("YYYY/MM/DD")
                        }).then(() => {
                            Swal.fire(
                                '?????????????????????????????????????????????!',
                                `?????????????????????????????????????????????: ${Moment().format('YYYY/MM/DD H:mm:ss')}`,
                                'success'
                                )
                            setRedeuce()
                            console.log('PATCH: ?????????????????????????????????????????????: ', Moment().format('YYYY/MM/DD H:mm:ss'))
                        })
                    })
                }
              })
        } catch (error) {
            alert(error)
        }
    }
   
    const [ SetAPI, setAPI ] = useState('')

    const [ ShowIMG, setIMGAE ] = useState('')
    const showImgae = (IMGID) => {
        axios.get(DB.URL + DB.GetIdIMP + IMGID).then((res) => {
            setIMGAE(res.data)
            setShowIMG(true);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showIMG, setShowIMG] = useState(false);
    const handleCloseIMG = () => setShowIMG(false);
    const handleShowIMG = () => setShowIMG(true);
  return (
    <>
    <Modal show={showIMG} onHide={handleCloseIMG} aria-labelledby="contained-modal-title-vcenter">
        <img src={DB.IMG + ShowIMG.v2image} style={{width: 100+'%'}}/>
    </Modal>
       <div className='container'>
            <div className='card'>
            <div className='card-header d-respone'>
                <div className="d-flex col-md-6">
                    <label><h4>?????????????????? ????????????????????????????????????????????????</h4></label>&nbsp;
                </div>&nbsp;
                <div className="d-flex justify-content-end col-md-6">
                    <label className="btn btn-sm btn-warning" style={{width: 130}} onClick={Reload}><i class="bi bi-arrow-clockwise"></i> ResetData</label>&nbsp;
                    <label>
                        <select className='form-control form-select' onChange={(e) => setAPI(e.target.value)}>
                            <option value=''>??????????????? ???????????????:</option>
                            {GetAPI.filter((e) => e.status !== 'Offline').map((item) => (
                                <option value={item._id}>{item.v1type}</option>
                            ))}
                        </select>  
                    </label>&nbsp;
                    <label className={`btn btn-sm btn-primary ${show == false ? "" : "d-none"}`} style={{width: 130}} onClick={handleShow} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-cloud-download"></i> ??????????????????????????????</label> 
                    <label className={`btn btn-sm btn-danger ${show == true ? "" : "d-none"}`} style={{width: 130}} onClick={handleClose} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-x-diamond"></i> Closs</label>
                </div>
            </div>
            <div className='card card-body'>
                <div class="collapse" id="collapseExample">
                    <form method="post" onSubmit={Save} enctype="multipart/form-data">
                        <div className={`card-renative row`}>
                            <div className='col-md-3'>
                                <div className='form-group'>
                                    <label>??????????????? ???????????????:</label>
                                    <select className='form-control form-select' onChange={(e) => setUIDSL(e.target.value)} required>
                                        <option value='null'>??????????????? ???????????????:</option>
                                        {GetAPI.map((item) => (
                                            <option value={item._id}>{item.v1type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label>??????????????????:</label>
                                    <div className='card form-control p-3'>{v1remark}</div>
                                </div>&nbsp;
                                <div className='footer-group renative'>
                                    <button type='submit' className='btn btn-sm btn-info'><i class="bi bi-cloud-download"></i> ????????????????????????????????????</button>&nbsp;
                                    <button type='reset' className='btn btn-sm btn-danger'>Reset</button>
                                    {spineSave == false ? '' :
                                        <div class="d-flex justify-content-center spinner-absolute">
                                            <div class="spinner-border" role="status">
                                                <span class="sr-only"></span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>&nbsp;
                            <div className='col-md-3'>
                                <div className='form-group'>
                                    <label>Image:</label>
                                    <input type='file' className='form-control' accept='image/*' onChange={handleChange}/>&nbsp;
                                    <img src={fileShow} style={{width: 100 + '%'}}/>
                                </div>
                            </div>
                            <div className='col-md-6 row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>???????????????: {v1type}</label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-code-square"></i></span>
                                            <textarea type='search' className='form-control' onChange={(e) => setv2typeSl(e.target.value)} placeholder={`?????????????????????????????????????????????: ${v1type}....`}/>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>???????????????????????????: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text text-success'>???</span>
                                            <NumericFormat type='search' className='form-control text-success' onChange={(e) => setImSprice(e.target.value)} placeholder='*......'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>Size: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-sort-alpha-up-alt"></i></span>
                                            <input type='search' className='form-control' onChange={(e) => setsizev2(e.target.value)} placeholder='???????????????....'/>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>???????????????: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-sort-numeric-up-alt"></i></span>
                                            <NumericFormat type='number' min="1" className='form-control' onChange={(e) => setamountMoney(e.target.value)} placeholder='???????????????????????????....'/>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <label>?????????????????????: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-cash-stack"></i></span>
                                            <input type='search' className='form-control' value={AmontDown} placeholder='?????????????????????: *......' readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>&nbsp;  
                    </form>
                </div>
                <form method="put" onSubmit={updateSave} enctype="multipart/form-data">
                {GetAPIIMP.length > 0 ? 
                <div className='card w-100 overflow-auto'>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th className="col-md-1"><strong className="text-danger">#{GetAPI.length}</strong></th>
                                <th className='col-md-2'>??????????????????</th>
                                <th>?????????????????????????????????</th>
                                <th>???????????????</th>
                                <th>????????????????????? ???????????????</th>
                                <th>???????????????</th>
                                <th>?????????????????????</th>
                                <th>?????????????????????????????? ( ??????????????? )</th>
                                <th className='col-1'>??????????????????</th>
                                <th className="col-1 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetAPIIMP.map((item) => (
                                item.status == 'offline' ? '' : item.v2qty - item.HistoryQty == 0 ? 
                                <tr>
                                    <td>{x++}</td>
                                    <td><img src={DB.IMG + item.v2image} onClick={() => showImgae(item._id)} style={{width: 100}}/></td>
                                    <td>{(item.v1typeId.v1type)+ ': '+(item.v2typeSl)}</td>
                                    <td>{item.sizev2}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2sprice)}</td>
                                    <td>{item.v2qty - item.HistoryQty}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2amount)}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.bprice)}</td>
                                    <td>
                                        
                                        <div className='pt-3'>
                                            <button type='button' className="btn btn-sm btn-danger" onClick={() => OffLineSell(item._id)}>???????????????????????????</button>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <label class="dote bg-danger"></label>
                                    </td>
                                </tr>
                                :  item._id == UIDSHOW ? 
                                    <tr>
                                        <td>{x++}</td>
                                        <td colSpan='7'>
                                            <div className={`card-renative row`}>
                                                <div className='col-md-3'>
                                                    <div className='form-group'>
                                                        <label>??????????????? ???????????????:</label>
                                                        <select className='form-control form-select' onChange={(e) => setv2UIDType(e.target.value)} required>
                                                            <option value={item.v1typeId}>{item.v1typeId == null ? '???????????????????????????' : item.v1typeId.v1type}</option>
                                                            {GetAPI.map((item) => (
                                                                <option value={item._id}>{item.v1type}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className='form-group'>
                                                        <label>??????????????????:</label>
                                                        <div className='card form-control p-3'>{v2UIDremark == '' ? (item.v1typeId == null ? '???????????????????????????' : item.v1typeId.remark) : v2UIDremark}</div>
                                                    </div>&nbsp;
                                                    
                                                </div>
                                                
                                                <div className='col-md-3'>
                                                    <div className='form-group'>
                                                        <label>Image:</label>
                                                        <input type='file' className='form-control' accept='image/*' onChange={imageHandler}/>
                                                        {preview == '' ? 
                                                        <img src={DB.IMG + item.v2image} className='text-center mt-2' style={{maxWidth: 100+'%'}}/>
                                                        : 
                                                        <img src={preview} className='text-center mt-2' style={{maxWidth: 100+'%'}}/>}
                                                    </div>
                                                </div>
                                                <div className='col-md-6 row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label>???????????????: {v2UIDTypeS == '' ? (item.v1typeId == null ? '???????????????????????????' : item.v1typeId.v1type) : v2UIDTypeS}</label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-code-square"></i></span>
                                                                <textarea type='search' className='form-control' onChange={(e) => Esetv2typeSl(e.target.value)} placeholder={`?????????????????????????????????????????????: ${v2UIDTypeS == '' ? item.v1typeId.v1type : v2UIDTypeS}....`}>{item.v2typeSl}</textarea>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label>????????????????????? ???????????????: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text text-success'>???</span>
                                                                <NumericFormat type='search' className='form-control text-success' value={item.v2sprice} onChange={(e) => EsetImSprice(e.target.value)} placeholder='*......'/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label>Size: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-sort-alpha-up-alt"></i></span>
                                                                <input type='search' className='form-control' defaultValue={item.sizev2} onChange={(e) => Esetsizev2(e.target.value)} placeholder='???????????????....'/>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label>???????????????: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-sort-numeric-up-alt"></i></span>
                                                                <NumericFormat type='number' min="1" className='form-control' onChange={(e) => EsetamountMoney(e.target.value)} value={item.v2qty} placeholder='???????????????????????????....'/>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className='col-md-12'>
                                                        <div className='form-group'>
                                                            <label>?????????????????????: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-cash-stack"></i></span>
                                                                <input type='search' className='form-control' value={EAmontDown} placeholder='?????????????????????: *......' readOnly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan='2'>
                                            <div className='footer-group pt-5 renative'>
                                                {Success == 'Success' ? 
                                                    <button type='submit' className="btn btn-sm btn-success"><i class="bi bi-check2-circle"></i> Success</button> : 
                                                    <button type='submit' className='btn btn-sm btn-info'>Save</button>
                                                }&nbsp;
                                                
                                                <button type='reset' className='btn btn-sm btn-danger'>Reset</button>

                                                {spineSave == true ? <div class="d-flex justify-content-center spinner-absolute2">
                                                    <div class="spinner-border" role="status">
                                                        <span class="sr-only"></span>
                                                    </div>
                                                </div> : ''}
                                            </div>
                                            <div className='footer-group pt-2'>
                                                <button type='button' onClick={Cancel} className='btn btn-sm btn-warning'>Cancel</button>&nbsp;
                                            </div>
                                            
                                        </td>
                                    </tr>
                                : 
                                SetAPI == item.v1typeId._id ? 
                                    <tr>
                                        <td>{x++}</td>
                                        <td><img src={DB.IMG + item.v2image} onClick={() => showImgae(item._id)} style={{width: 100, height: 100}}/></td>
                                        <td>{(item.v1typeId == null ? '???????????????????????????' : item.v1typeId.v1type)+ ': '+(item.v2typeSl)}</td>
                                        <td>{item.sizev2}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2sprice)}</td>
                                        <td>{item.v2qty - item.HistoryQty}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2amount)}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.bprice)}</td>
                                        <td>
                                            <div>
                                                <a className="btn-sm btn-primary" onClick={() => Update(item._id)}><i class="bi bi-pencil-square"></i></a>&nbsp;
                                                {item.statusSell == 'true' ? 
                                                    <button type='button' className="btn btn-sm btn-danger" onClick={() => OffLineSell(item._id)}><i class="bi bi-inboxes-fill"></i></button>
                                                    : <a className="btn-sm btn-danger" onClick={() => Delete(item._id)}><i class="bi bi-trash3"></i></a>
                                                }
                                                
                                            </div>
                                            <div className='pt-3'>
                                                {item.status == 'false' ? 
                                                <button className="btn btn-sm btn-warning" onClick={() => OnlineSell(item._id)}>??????????????????????????????</button> : 
                                                <button className="btn btn-sm btn-success" onClick={() => OffSell(item._id)}>???????????????????????????</button>}&nbsp;
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {item.status == 'true' ? <label class="dote bg-success"></label> : <label class="dote bg-warning"></label>}
                                        </td>
                                    </tr>
                                : 
                                SetAPI == '' ? 
                                    <tr>
                                        <td>{x++}</td>
                                        <td><img src={DB.IMG + item.v2image} onClick={() => showImgae(item._id)} style={{width: 100, height: 100}}/></td>
                                        <td>{(item.v1typeId == null ? '???????????????????????????' : item.v1typeId.v1type)+ ': '+(item.v2typeSl)}</td>
                                        <td>{item.sizev2}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2sprice)}</td>
                                        <td>{item.v2qty - item.HistoryQty}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2amount)}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.bprice)}</td>
                                        <td>
                                            <div className='btn-group'>
                                                <a className="btn-sm btn-primary" onClick={() => Update(item._id)}><i class="bi bi-pencil-square"></i></a>&nbsp;
                                                {item.statusSell == 'true' ? 
                                                    <button type='button' className="btn btn-sm btn-danger" onClick={() => OffLineSell(item._id)}><i class="bi bi-inboxes-fill"></i></button>
                                                    : <a className="btn-sm btn-danger" onClick={() => Delete(item._id)}><i class="bi bi-trash3"></i></a>
                                                }
                                                
                                            </div>
                                            <div className='pt-3'>
                                                {item.status == 'false' ? 
                                                <button type='button' className="btn btn-sm btn-warning" style={{width: 100}} onClick={() => OnlineSell(item._id)}>??????????????????????????????</button> : 
                                                <button type='button' className="btn btn-sm btn-success" style={{width: 100}} onClick={() => OffSell(item._id)}>???????????????????????????</button>}&nbsp;
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {item.status == 'true' ? <label class="dote bg-success"></label> : <label class="dote bg-warning"></label>}
                                        </td>
                                    </tr>
                                : ''
                            ))}
                        </tbody>
                    </table>
                </div>
                : <label><img src={plant}/><strong>?????????????????????????????????....</strong></label>} 
                </form>
            </div>
            </div>
        </div>
    </>
  )
}

export default ImportedTYPE