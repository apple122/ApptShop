import React, { useReducer } from "react";
import winter from '../assets/GIF/Winter.gif'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import '../assets/Css/Page.css'
import DB from '../service/server'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Moment from 'moment';

export default function TypePro (props) {
    let x = 1

    //POST API
    const [ type, setType ] = useState('')
    const [ Remark, setRemark ] = useState('')
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
  
    const Save = () => {
        if(type == ''){}else{
            axios.post(DB.URL + DB.PostTypePro, {
                v1type: type,
                remark: Remark,
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
            }).catch((err) => {alert(err)})
        }
    }

    // Reset Data API
    const Reload = () => {
        setRedeuce()
    }
    
    // ລົບຂໍ້ມູນ ແລະ Reset
    const Delete = (Id) => {
        Swal.fire({
            title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ ຫຼື່ ບໍ່?',
            text: "ຂໍ້ມູນນີ້ມີການເຊື່ອມໂຍງກັບຂໍ້ມູນອືນໆ ກະລຸນາກວດສອບຂໍ້ມູນ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(DB.URL + DB.DeTypePro + Id).then((res) => {
                    Swal.fire(
                        'ລົບຂໍ້ມູນສຳເລັດ!',
                        'Your file has been deleted.',
                        'success'
                        )
                     setRedeuce()
                }).catch((err) => {alert(err)})
            }
        })
    }
    
    // GET API
    const [ GetAPI, setGETAPI ] = useState([])
    const [ GetFalse, setFalse ] = useState([])
    useEffect(() => {
      axios.get(DB.URL + DB.getTypePro).then((res) => {
        setGETAPI(res.data.reverse())
        axios.get(DB.URL + DB.getTypeUID + res.data._id).then((res) => {
            setFalse(res.data.reverse())
        })
      })
    }, [reducer])


    // action ການຈັດການ - Update
    const [ ShowUPdate, setUPdate ] = useState('')
    const [ ShowSuc, setShowSuc ] = useState('null')

    const [ v1type, setv1type ] = useState('')
    const [ v1remark, setv1remark ] = useState('')
    const Update = (id) => {
        try {
            axios.get(DB.URL + DB.getTypeProUID + id).then((res) => {
                axios.put(DB.URL + DB.PutTypePro + id, {
                    v1type: v1type == '' ? res.data.v1type : v1type,
                    remark: v1remark == '' ? res.data.remark : v1remark,
                    curdate: Moment().format('YYYY/MM/DD')
                }).then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'ປ່ຽນແປງຂໍ້ມູນສຳເລັດ',
                        showConfirmButton: false,
                        timer: 1500,
                        width: 400,
                        })
                    setUPdate('success')
                    setRedeuce()
                })
            })
        } catch (error) {
            alert(error)
        }
        
    }

    const Offline = (Id) => {
        Swal.fire({
            title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ ຫຼື່ ບໍ່?',
            text: "ຂໍ້ມູນນີ້ມີການເຊື່ອມໂຍງກັບຂໍ້ມູນອືນໆ ກະລຸນາກວດສອບຂໍ້ມູນ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(DB.URL + DB.PatchtypePro + Id, {
                    status: 'Offline'
                }).then((res) => {
                    Swal.fire(
                        'ລົບຂໍ້ມູນສຳເລັດ!',
                        'Your file has been deleted.',
                        'success'
                        )
                    setRedeuce()
                })
            }
        })
    }

    const onlineUpdate = (id) => {
        setShowSuc(id)
        setUPdate('')
        setv1type('')
        setv1remark('')
    }
    const cancel = () => {
        setShowSuc('')
    }

    // action button add
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
        <div className='container'>
            <div className='card'>
            <div className='card-header d-respone'>
                <div className="d-flex col-md-6">
                    <label><h4>ຈັດການປະເພດສີນຄ້າ</h4></label>&nbsp;
                </div>&nbsp;
                <div className="d-flex justify-respone col-md-6">
                    <label className="btn btn-sm btn-warning" onClick={Reload}><i class="bi bi-arrow-clockwise"></i> ResetData</label>&nbsp;
                    <label className={`btn btn-sm btn-primary ${show == false ? "" : "d-none"}`} onClick={handleShow} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-cloud-download"></i> ເພີມຂໍ້ມູນ</label> 
                    <label className={`btn btn-sm btn-danger ${show == true ? "" : "d-none"}`} onClick={handleClose} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-x-diamond"></i> Closs</label>
                </div>
            </div>
                <div className='card-body'>
                    <form>
                    <div class="collapse" id="collapseExample">
                        <div className={`card-renative`}>
                            <div className='form-group'>
                                <label>ປະເພດ: {type}</label>
                                <input className='form-control' onChange={(e) => setType(e.target.value)} required/>
                            </div>
                            
                            <div className='form-group'>
                                <label>ໝາຍເຫດ: {Remark}</label>
                                <textarea className='form-control' onChange={(e) => setRemark(e.target.value)}/>
                            </div>&nbsp;
                            <div className='form-group'>
                                <button type='button' onClick={Save} className='btn btn-sm btn-info'>Save</button>&nbsp;
                                <button type='reset' className='btn btn-sm btn-danger'>Reset</button>
                            </div>&nbsp;
                        </div>                                  
                    </div>
                    </form>
                    {GetAPI.length > 0 ? 
                    <div className='card w-100 overflow-auto'>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th className="col-1"><strong className="text-danger">#{GetAPI.length}</strong></th>
                                    <th className="col-4">ປະເພດ</th>
                                    <th className="col-4">ໝາຍເຫດ</th>
                                    <th scope="col-2">ຈັດການ</th>
                                    <th className="col-1 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {GetAPI.filter((e) => e.status !== 'Offline').map((item) => (
                                    item._id == ShowSuc ?
                                    (
                                        <tr>
                                            <td>{x++}</td>
                                            <td><input type='search' className="form-control" defaultValue={item.v1type} onChange={(e) => setv1type(e.target.value)} required/></td>
                                            <td><textarea type='search' className="form-control" onChange={(e) => setv1remark(e.target.value)}>{item.remark}</textarea></td>
                                            <td>
                                                {ShowUPdate == 'success' ? 
                                                    <button className="btn btn-sm btn-success"><i class="bi bi-check2-circle"></i> Success</button> : 
                                                    <button className="btn btn-sm btn-primary" onClick={() => Update(item._id)}>ປ່ຽນແປງ</button>
                                                }&nbsp;
                                                <button className="btn btn-sm btn-warning" onClick={cancel}>ຍົກເລີກ</button>&nbsp;
                                            </td>
                                            <td className="text-center">
                                                {item.status == 'true' ? (<label class="dote bg-success"></label>) : (<label class="dote bg-warning"></label>)}
                                            </td>
                                        </tr>
                                    ) : 
                                    <tr>
                                        <td>{x++}</td>
                                        <td>{item.v1type}</td>
                                        <td>{item.remark}</td>
                                        <td>
                                            <div className="btn-group">
                                                <a className="btn-sm btn-primary" onClick={() => onlineUpdate(item._id)}><i class="bi bi-pencil-square"></i></a>&nbsp;
                                                {GetFalse.filter((e) => e.status == 'offline' && e.v1typeId == item._id).length == GetFalse.filter((e) => e.v1typeId == item._id).length ?
                                                <a className="btn-sm btn-danger" onClick={() => Offline(item._id)}><i class="bi bi-inboxes-fill"></i></a> : <label className="btn-sm btn-success" style={{width: 115}}><i class="bi bi-chevron-bar-contract"></i> ຂໍ້ມູນມີການນຳໃຊ້</label>
                                                }
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {GetFalse.filter((e) => e.status == 'offline' && e.v1typeId == item._id).length == GetFalse.filter((e) => e.v1typeId == item._id).length ?
                                             <label class="dote bg-warning"></label> : item.status == 'true' ? (<label class="dote bg-success"></label>) : (<label class="dote bg-warning"></label>)
                                            }
                                        </td>
                                    </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    : <label><img src={winter}/><strong>ບໍ່ມີຂໍ້ມູນ....</strong></label>} 
                </div>
            </div>
        </div>
        </>
    )
}