import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import DB from '../../service/server'
import IMGLOGO from '../../assets/Img/Screenshot 2022-12-30 102512.png'
import WAAPPLE from '../../assets/Img/flowcode.png'
import Moment from 'moment';

export default function Printer_HistorySell(props) {

    const [ GETAPISEL, setAPISEL ] = useState([])
    const [ GETAPIUSER, setAPIUSER ] = useState([])
    const [ GETUSER, setGETUSER ] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        axios.get(DB.URL + DB.GetBySell + props.id).then((res) => {
            setAPISEL(res.data)
            
            axios.get(DB.URL + DB.GetByLogin + localStorage.getItem('OLDAPITOKEN')).then((res) => {
                setAPIUSER(res.data)
            })
            res.data.UserUID == null ? setGETUSER('') :
            axios.get(DB.URL + DB.GetByLogin + (res.data.UserUID)).then((res) => {
                setGETUSER(res.data)
            })
        })
    };

    const Printter = () => {
        window.print()
    }
  return (
    <>
        <button className='btn btn-sm btn-info' onClick={handleShow}><i class="bi bi-printer-fill"></i> ອອກບີນ</button><br/>
        <Modal show={show} onHide={handleClose} size='' aria-labelledby="contained-modal-title-vcenter">
            <div className=''>
                <div className='row printer-card-boody' id='printDIV'> 
                    <div className='text-center'>
                        <img src={IMGLOGO} style={{width: 50+'%'}}/>
                    </div>
                    <div className='p-1 text-center'>
                        <strong>ໃບເຊັດການຊື້ຂາຍ</strong>
                    </div>

                    <table class="table-light">
                        <tbody className='border-hr'>
                            <tr>
                                <th>
                                    <div className='p-1 text-start'>
                                        <strong>ເລກບີນ: </strong><label>{GETAPISEL.number_bin}</label>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div className='p-1 text-start'>
                                        <strong>ຜູ້ຂ່າຍ: </strong><label>{GETUSER == '' ? <label className='text-danger'>ປິດສະຖານະແລ້ວ</label> : GETUSER.fullname}</label>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div className='p-1 text-start'>
                                        <strong>ຜູ້ອອກບີນ: </strong><label>{GETAPIUSER.fullname}</label>
                                    </div>
                                </th>
                            </tr>&nbsp;
                        </tbody>&nbsp;
                        <tbody className='border-hr'>
                            <tr>
                                <th>
                                    <div className='p-1 col-md-12'>
                                        <strong>ປະເພດສີນຄ້າ: </strong><label>{GETAPISEL.v2ImId == null ? 'ຂໍ້ມູນຖືກລົບ' : GETAPISEL.v2ImId.v2typeSl}</label>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div className='p-1 col-md-6'>
                                        <strong>Size: </strong><label>{GETAPISEL.v2ImId == null ? 'ຂໍ້ມູນຖືກລົບ' : GETAPISEL.v2ImId.sizev2}</label>
                                    </div>
                                </th>
                                <th className='col-md-6'>
                                    <div className='p-1 col-md-12'>
                                        <strong>ຈຳນວນ: </strong><label>{GETAPISEL.v4qty}</label>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div className='p-1 col-md-12'>
                                        <strong>ລາຄາຊື້: </strong><strong className='text-danger'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(GETAPISEL.v4bprice)}</strong>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div className='p-1 col-md-12'>
                                        <strong>ເງີນລວມທັ້ງໝົດ: </strong><strong className='text-danger'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(GETAPISEL.v4amount)}</strong>
                                    </div>
                                </th>
                            </tr>&nbsp;
                        </tbody>&nbsp;
                        <tbody>
                            <tr>
                                <th className='col-md-8'>
                                    <div className='p-1'>
                                        <strong>ເວລາຊື້: </strong><label>{Moment(GETAPISEL.curdate).format("DD/MM/YYYY")}</label>
                                    </div>
                                </th>
                                <th rowspan="4" className='col-md-2 text-end'>                        
                                    <img src={WAAPPLE} width='100'/>
                                </th>
                            </tr>
                            <tr>
                                <th className='col-md-6'>
                                    <div className='p-1'>
                                        <strong>ເບີໂທຕິດຕໍ່: </strong><label>{GETAPIUSER.phone}</label>
                                    </div>
                                </th>
                                <th rowspan="2"></th>

                            </tr>
                            <tr>
                                <th className='col-md-6'>
                                    <div className='p-1'>
                                        <strong>ເມວ: </strong><label>{GETAPIUSER.email}</label>
                                    </div>
                                </th>
                                <th rowspan="2"></th>
                            </tr>
                        </tbody>
                    </table>
                    <div className='text-end col-md-3'>
                    </div> 
                </div>
            </div>
            <Modal.Footer className='print-none'>
                <button type='button' className='btn btn-sm btn-info' onClick={Printter}><i class="bi bi-printer-fill"></i> Print</button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
