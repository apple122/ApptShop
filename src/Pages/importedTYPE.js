import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import Moment from 'moment';
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import DB from '../service/server'
import Swal from 'sweetalert2';

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

    const Save = () => {
        try {
            axios.post(DB.URL + DB.PostIMP, {
                v1typeId: UIDSL,
                v2typeSl: v2typeSl,
                sizev2: sizev2,
                v2sprice: ImSprice,
                v2qty: AmountMoney,
                v2amount: (ImSprice * AmountMoney),
                curdate: Moment().format('YYYY/MM/DD')
              }).then((res) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'ບັນທືກຂໍ້ມູນສຳເລັດ',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 400,
                  })
                setRedeuce()
              })
        } catch (error) {
            alert(error)
        }
    }

    const Delete = (ID) => {
        try {
            Swal.fire({
                title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ ຫຼື່ ບໍ່?',
                text: "ຂໍ້ມູນຈະຖືກລົບຖາວ່ອນ ບໍ່ສາມາດກູ້ຄືນໄດ້ເມືອລົບສຳເລັດ!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(DB.URL + DB.DelIMP + ID).then((res) => {
                        Swal.fire(
                            'ລົບຂໍ້ມູນສຳເລັດ!',
                            'Your file has been deleted.',
                            'success'
                            )
                         setRedeuce()
                    })
                }
            })
        } catch (error) {
            alert(error)
        }
    }

    const [preview, setPreview] = useState()
    const [Image, setImage] = useState('')
    function imageHandler(e) {
        setImage(e.target.files[0])
        setPreview(e.target.files[0])
    }

    const [ UIDSHOW, setUIDSHOW ] = useState('')
    const Update = (id) => {
        setUIDSHOW(id)
    }

    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
       <div className='container'>
            <div className='card'>
            <div className='card-header d-flex'>
                <div className="d-flex col-md-4">
                    <label><h4>ຈັດການ ການນຳເຂົ້າສິນຄ້າ</h4></label>&nbsp;
                    <label className="btn btn-sm btn-warning" onClick={Reload}><i class="bi bi-arrow-clockwise"></i> ResetData</label>
                </div>&nbsp;
                <div className="d-flex justify-content-end col-md-8">
                    <label className={`btn btn-sm btn-primary ${show == false ? "" : "d-none"}`} onClick={handleShow} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-cloud-download"></i> ເພີມຂໍ້ມູນ</label> 
                    <label className={`btn btn-sm btn-danger ${show == true ? "" : "d-none"}`} onClick={handleClose} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-x-diamond"></i> Closs</label>
                </div>
            </div>
            <div className='card card-body'>
                <form method="post" enctype="multipart/form-data">
                <input type="file" onChange={handleChange} />
                <img src={file} />
                    <div class="collapse" id="collapseExample">
                        <div className={`card-renative row`}>
                            <div className='col-md-3'>
                                <div className='form-group'>
                                    <label>ເລືອກ ປະເພດ:</label>
                                    <select className='form-control form-select' onChange={(e) => setUIDSL(e.target.value)} required>
                                        <option value='null'>ເລືອກ ປະເພດ:</option>
                                        {GetAPI.map((item) => (
                                            <option value={item._id}>{item.v1type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label>ໝາຍເຫດ:</label>
                                    <div className='card form-control p-3'>{v1remark}</div>
                                </div>&nbsp;
                                <div className='footer-group'>
                                    <button type='button' onClick={Save} className='btn btn-sm btn-info'>Save</button>&nbsp;
                                    <button type='reset' className='btn btn-sm btn-danger'>Reset</button>
                                </div>
                            </div>
                            
                            <div className='col-md-3'>
                                <div className='form-group'>
                                    <label>Image:</label>
                                    <input type='file' className='form-control' accept='image/*' onChange={imageHandler}/>
                                    {preview && (
                                        <img className='text-center mt-2' style={{maxWidth: 100+'%'}} src={URL.createObjectURL(preview)} alt={Image}/>
                                    )}
                                </div>
                            </div>
                            <div className='col-md-6 row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>ປະເພດ: {v1type}</label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-code-square"></i></span>
                                            <input type='search' className='form-control' onChange={(e) => setv2typeSl(e.target.value)} placeholder={`ປ່ອນຂໍ້ມູນປະເພດ: ${v1type}....`}/>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>ລາຄາຕໍ່ໂຕ: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text text-success'>₭</span>
                                            <NumericFormat type='search' className='form-control text-success' onChange={(e) => setImSprice(e.target.value)} placeholder='*......'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>Size: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-sort-alpha-up-alt"></i></span>
                                            <input type='search' className='form-control' onChange={(e) => setsizev2(e.target.value)} placeholder='ຂະໜາດ....'/>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>ຈຳນວນ: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-sort-numeric-up-alt"></i></span>
                                            <NumericFormat type='number' min="1" className='form-control' onChange={(e) => setamountMoney(e.target.value)} placeholder='ປ່ອນຈຳນວນ....'/>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <label>ເງີນລວມ: </label>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-cash-stack"></i></span>
                                            <input type='search' className='form-control' value={AmontDown} placeholder='ເງີນລວມ: *......' readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>&nbsp;                                
                    </div>
                </form>
                <div className='card overflow-hidden'>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th className="col-md-1"><strong className="text-danger">( {GetAPI.length} )</strong></th>
                                <th>ປະເພດ</th>
                                <th>ຂະໜາດ</th>
                                <th>ລາຄາຕໍ່ໂຕ</th>
                                <th>ຈຳນວນ</th>
                                <th>ເງີນລວມ</th>
                                <th className='col-1'>ຈັດການ</th>
                                <th className="col-1 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetAPIIMP.map((item) => (
                                item._id == UIDSHOW ? 
                                    <tr>
                                        <td>{x++}</td>
                                        <td colSpan='5'>
                                            <div className={`card-renative row`}>
                                                <div className='col-md-3'>
                                                    <div className='form-group'>
                                                        <label>ເລືອກ ປະເພດ:</label>
                                                        <select className='form-control form-select' onChange={(e) => setUIDSL(e.target.value)} required>
                                                            <option value='null'>ເລືອກ ປະເພດ:</option>
                                                            {GetAPI.map((item) => (
                                                                <option value={item._id}>{item.v1type}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className='form-group'>
                                                        <label>ໝາຍເຫດ:</label>
                                                        <div className='card form-control p-3'>{v1remark}</div>
                                                    </div>&nbsp;
                                                    
                                                </div>
                                                
                                                <div className='col-md-3'>
                                                    <div className='form-group'>
                                                        <label>Image:</label>
                                                        <input type='file' className='form-control' accept='image/*' onChange={imageHandler}/>
                                                        {preview && (
                                                            <img className='text-center mt-2' style={{maxWidth: 100+'%'}} src={URL.createObjectURL(preview)} alt={Image}/>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='col-md-6 row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label>ປະເພດ: {v1type}</label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-code-square"></i></span>
                                                                <input type='search' className='form-control' onChange={(e) => setv2typeSl(e.target.value)} placeholder={`ປ່ອນຂໍ້ມູນປະເພດ: ${v1type}....`}/>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label>ລາຄາຕໍ່ໂຕ: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text text-success'>₭</span>
                                                                <NumericFormat type='search' className='form-control text-success' onChange={(e) => setImSprice(e.target.value)} placeholder='*......'/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label>Size: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-sort-alpha-up-alt"></i></span>
                                                                <input type='search' className='form-control' onChange={(e) => setsizev2(e.target.value)} placeholder='ຂະໜາດ....'/>
                                                            </div>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label>ຈຳນວນ: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-sort-numeric-up-alt"></i></span>
                                                                <NumericFormat type='number' min="1" className='form-control' onChange={(e) => setamountMoney(e.target.value)} placeholder='ປ່ອນຈຳນວນ....'/>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className='col-md-12'>
                                                        <div className='form-group'>
                                                            <label>ເງີນລວມ: </label>
                                                            <div className='input-group'>
                                                                <span className='input-group-text'><i class="bi bi-cash-stack"></i></span>
                                                                <input type='search' className='form-control' value={AmontDown} placeholder='ເງີນລວມ: *......' readOnly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan='2'>
                                            <div className='footer-group pt-5'>
                                                <button type='button' className='btn btn-sm btn-info'>Save</button>&nbsp;
                                                <button type='reset' className='btn btn-sm btn-danger'>Reset</button>
                                            </div>
                                        </td>
                                    </tr>
                                : 
                                <tr>
                                    <td>{x++}</td>
                                    <td>{item.v2typeSl}</td>
                                    <td>{item.sizev2}</td>
                                    <td>{item.v2sprice}</td>
                                    <td>{item.v2qty}</td>
                                    <td>{item.v2amount}</td>
                                    <td>
                                        <a className="btn-sm btn-primary" onClick={() => Update(item._id)}><i class="bi bi-pencil-square"></i></a>&nbsp;
                                        <a className="btn-sm btn-danger" onClick={() => Delete(item._id)}><i class="bi bi-trash3"></i></a>
                                    </td>
                                    <td className="text-center">
                                        {item.curdate == Moment().format('YYYY/MM/DD') ? <label class="dote bg-success"></label> : <label class="dote bg-warning"></label>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default ImportedTYPE