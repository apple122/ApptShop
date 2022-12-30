import axios from 'axios'
import ghost from '../assets/GIF/Ghost.gif'
import React, { useReducer } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import DB from '../service/server'
import Moment from 'moment';
import { Modal, Button, Form } from 'react-bootstrap'
import Printer_HistorySell from './ModalEvent/Printer.HistorySell'


function HistorySell() {
    let x = 1
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    const [ GETAPISEL, setAPISEL ] = useState([])
    useEffect(() => {
        axios.get(DB.URL + DB.GetSell).then((res) => {
            setAPISEL(res.data.reverse())
        })
    }, [reducer])

    const [ CurdateSelect, setCurdateSelect ] = useState('')
    const LoopQnumberDrw = [...new Set(GETAPISEL.map(item => (Moment(item.curdate).format("DD/MM/YYYY"))))]

    const reload = () => {
        setRedeuce()
    }

    async function RemoveSell (ID) {
        try {
            axios.get(DB.URL + DB.GetBySell + ID).then((res) => {
                Swal.fire({
                    title: 'ທ່ານຕ້ອງການຍົກເລີກການຂາຍ ຫຼື່ ບໍ່?',
                    text: "The data will be recovered to the merchandise!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ຍົກເລີກການຂາຍ!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        axios.patch(DB.URL + DB.PatchHistory + res.data.v2ImId._id ,{
                            HistoryQty:  res.data.v2ImId.HistoryQty - res.data.v4qty
                        }).then((res) => {
                            axios.delete(DB.URL + DB.DelBySell + ID).then((res) => {
                                Swal.fire(
                                    'ຍົກເລີກການຂາຍສຳເລັດ!',
                                    'Your file has been deleted.',
                                    'success'
                                    )
                                setRedeuce()
                                console.log('Remove: Success ', Moment().format('YYYY/MM/DD H:mm:ss'))
                            })
                        })
                       
                    }
                })
            })
        } catch (error) {
            alert(error)
        }
    }

    const [ IMGSHOW, swtSHOWIMG ] = useState('')
    const ShowIMage = (IMG) => {
        swtSHOWIMG(IMG)
        setShow(true);
    }

    const OpenWindows = (ID) => {
        window.open("ປະຫວັດການຂາຍ", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=-300,left=2300,width=900,height=800");
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
            <img src={DB.IMG + IMGSHOW} style={{width: 100+'%'}}/>
        </Modal>
        <div className='container' id='print-none'>
            <div className='card'>
                <div className='card-header d-flex'>
                    <div className="d-flex">
                        <label><h4>ປະຫວັດການຂາຍ HistorySell</h4></label>&nbsp;
                        <label className="btn btn-sm btn-warning" onClick={reload}><i class="bi bi-arrow-clockwise"></i> ResetData</label>&nbsp;
                    </div>&nbsp;
                    <div className="col-md-4">
                        <select className='form-control form-select text-center' onChange={(e) => setCurdateSelect(e.target.value)}>
                            <option value=''>~~Select Curdate~~</option>
                            {LoopQnumberDrw.map((item) => (
                                <option value={item}>ຂາຍວັນທີ່: {item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='card-body w-100 overflow-auto'>
                {GETAPISEL.length > 0 ? 
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th className="col-md-1"><strong className="text-danger">( {GETAPISEL.filter(e => e.curdate !== CurdateSelect).length} )</strong></th>
                                <th>ເລກບີນ</th>
                                <th>ຮູບພາບ</th>
                                <th>ລາຍລະອຽດ</th>
                                <th>ຈຳນວນ</th>
                                <th>ລາຄາຂາຍ</th>
                                <th>ເງິນລວມ (ຂາຍ)</th>
                                <th>ວັນທີ່ (ຂາຍ)</th>
                                <th>ຈັດການ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CurdateSelect == '' ? GETAPISEL.map((item) => (
                                <tr>
                                    <td>{x++}</td>
                                    <td>{item.number_bin}</td>
                                    <td><img src={DB.IMG + (item.v2ImId == null ? 'ຂໍ້ມູນຫາຍ' : item.v2ImId.v2image)} onClick={() => ShowIMage(item.v2ImId == null ? 'ຂໍ້ມູນຫາຍ' : item.v2ImId.v2image)} style={{width: 100, height: 100}}/></td>
                                    <td>{item?.v2ImId.v2typeSl}</td>
                                    <td>{item.v4qty}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v4bprice)}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v4amount)}</td>
                                    <td>{Moment(item.curdate).format("DD/MM/YYYY")}</td>
                                    <td>
                                        <Printer_HistorySell id={item._id}/>
                                        {Moment(item.curdate).format("YYYY/MM/DD") == Moment().format("YYYY/MM/DD") ?
                                            <button type='button' className='btn btn-sm btn-danger mt-1' onClick={() => RemoveSell(item._id)}><i class="bi bi-x-diamond-fill"></i> ຍົກເລີກການຂາຍ</button>
                                        :''}
                                    </td>
                                </tr>
                            )) : GETAPISEL.filter((e) => (Moment(e.curdate).format("DD/MM/YYYY")) == CurdateSelect).map((item) => (
                                <tr>
                                    <td>{x++}</td>
                                    <td>{item.number_bin}</td>
                                    <td><img src={DB.IMG + (item.v2ImId == null ? 'ຂໍ້ມູນຫາຍ' : item.v2ImId.v2image)} onClick={() => ShowIMage(item.v2ImId.v2image)} style={{width: 100, height: 100}}/></td>
                                    <td>{item?.v2ImId.v2typeSl}</td> 
                                    <td>{item.v4qty}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v4bprice)}</td>
                                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v4amount)}</td>
                                    <td>{Moment(item.curdate).format("DD/MM/YYYY")}</td>
                                    <td>
                                        <Printer_HistorySell id={item._id}/>
                                        {Moment(item.curdate).format("YYYY/MM/DD") == Moment().format("YYYY/MM/DD") ?
                                            <button type='button' className='btn btn-sm btn-danger mt-1' onClick={() => RemoveSell(item._id)}><i class="bi bi-x-diamond-fill"></i> ຍົກເລີກການຂາຍ</button>
                                        :''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <label><img src={ghost}/><strong>ບໍ່ມີຂໍ້ມູນ....</strong></label>} 
                </div>
            </div>
        </div>
    </>
  )
}

export default HistorySell