import axios from 'axios'
import atom from '../assets/GIF/Atom.gif'
import React, { useState, useEffect, useReducer } from 'react';
import Moment from 'moment';
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import DB from '../service/server'
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'

export default function HistoryTYPE() {

    const [ GETAPI, setAPI ] = useState([])
    const [ GESLTAPI, setSLAPI ] = useState([])
    const [ GetAPI, setGETAPI ] = useState([])
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(DB.URL + DB.GetIMP).then((res) => {
            setAPI(res.data.reverse())
        })
        
        axios.get(DB.URL + DB.getTypePro).then((res) => {
            setGETAPI(res.data.reverse())
          })
    }, [reducer])

    const LoopQnumberDrw = [...new Set(GETAPI.filter((e) => e.status == 'offline').map(item => item.v1typeId._id))]

    const reload = () => {
        setRedeuce()
    }

    const [ IMGSHOW, swtSHOWIMG ] = useState('')
    const ShowIMage = (IMG) => {
        swtSHOWIMG(IMG)
        setShow(true);
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
                <img src={DB.IMG + IMGSHOW} style={{width: 100+'%'}}/>
            </Modal>
            <div className='container'>
                <div className='card'>
                    <div className='card-header d-respone'>
                        <div className="d-flex">
                            <label><h4>ປະຫວັດສີນຄ້າໝົດ HistoryTYPE</h4></label>&nbsp;
                        </div>&nbsp;
                        <label className='d-flex'>
                            <label className="btn btn-sm btn-warning" style={{width: 180}} onClick={reload}><i class="bi bi-arrow-clockwise"></i> ResetData</label>&nbsp;
                            <select className='form-control form-select' onChange={(e) => setSLAPI(e.target.value)}>
                                <option value=''>ເລືອກ ປະເພດ:</option>
                                {GetAPI.map((item) => (
                                    item._id == LoopQnumberDrw ? 
                                    <option value={item._id}>{item.v1type}</option>
                                    : ''
                                ))}
                            </select>  
                        </label>
                    </div>
                    <div className='card-body w-100 overflow-auto'>
                    {GETAPI.filter((e) => e.status == 'offline').length > 0 ? 
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th className="col-md-1"><strong className="text-danger">#{GETAPI.filter((e) => e.status == 'offline').length}</strong></th>
                                    <th className='col-md-2'>ຮູບພາບ</th>
                                    <th>ຂໍ້ມູນປະເພດ</th>
                                    <th>ຂະໜາດ</th>
                                    <th>ລາຄາຊື້ ຕໍ່ໂຕ</th>
                                    <th>ຈຳນວນ</th>
                                    <th>ເງີນລວມ</th>
                                    <th>ວັນທີ່ເກັບປະຫວັດ</th>
                                    <th><strong className='text-danger'>Status</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {GETAPI.filter((e) => e.status == 'offline').map((item, index) => (
                                    <tr>
                                        <td>{index +1}</td>
                                        <td><img src={DB.IMG + item.v2image} onClick={() => ShowIMage(item.v2image)} style={{width: 100, height: 100}}/></td>
                                        <td>{(item.v1typeId == null ? 'ຂໍ້ມູນຫາຍ' : item.v1typeId.v1type)+ ': '+(item.v2typeSl)}</td>
                                        <td>{item.sizev2}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2sprice)}</td>
                                        <td>{item.v2qty - item.HistoryQty}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2amount)}</td>
                                        <td>{Moment(item.curdate).format("DD/MM/YYYY")}</td>
                                        <td><label className='btn btn-sm btn-danger'>ສີນຄ້າໝົດ</label></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : <label><img src={atom}/><strong>ບໍ່ມີຂໍ້ມູນ....</strong></label>} 
                    </div>
                </div>
            </div>
        </>
    )
}
