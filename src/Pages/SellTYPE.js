import axios from 'axios'
import skateboarding from '../assets/GIF/Skateboarding.gif'
import React, { useReducer } from 'react'
import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import DB from '../service/server'
import Moment from 'moment';
import Swal from 'sweetalert2';

function SellTYPE() {

    const [ GETSELAPITYPE, setSELLAPITYPE ] = useState([])
    const [ GETSELAPI, setSELLAPI ] = useState([])
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(DB.URL + DB.getTypePro).then((res) => {
            setSELLAPITYPE(res.data.reverse())
        })

        axios.get(DB.URL + DB.GetIMP).then((res) => {
            setSELLAPI(res.data.reverse())
        })
    }, [reducer])

    const [ qty, setQty ] = useState(1) 

    function increaseQty() {
        if(qty === v2qty - HistoryQty) {

        } else {
            setQty(qty+1)
        }
    }

    function decreaseQty() {
        if(qty <= 1) {

        } else {
            setQty(qty-1)
        }
    }

    const [ Percen, SellPercen ] = useState('false')
    function TruePercen () {
        SellPercen('true')
    }
    function FalsePercen () {
        SellPercen('false')
        inputSell('')
    }

    const [ inputsel, inputSell ] = useState('')

    const [ UIDTYE, setUIDTYPE ] = useState('')
    const [ v2image, setv2image ] = useState('')
    const [ v2typeSl, setv2typeSl ] = useState('')
    const [ sizev2, setsizev2 ] = useState('')
    const [ v2qty, setv2qty ] = useState('')
    const [ HistoryQty, setHistoryQty ] = useState('')
    const [ bprice, setbprice ] = useState('')
    const [ type, settype ] = useState('')
    const setAPIID = (APIID) => {
        axios.get(DB.URL + DB.GetIdIMP + APIID).then((res) => {
            setUIDTYPE(res.data._id)
            setv2image(res.data.v2image)
            setv2typeSl(res.data.v2typeSl)
            setsizev2(res.data.sizev2)
            setv2qty(res.data.v2qty)
            setbprice(res.data.bprice)
            settype(res.data.v1typeId.v1type)
            setHistoryQty(res.data.HistoryQty)
        })
        setQty(1)
        setShow(true);
    }
    
    let min = 100000;
    let max = 99999999;
    const random = Math.round(Math.random() * (max - min) + min);

    const SaveSell = () => {
        axios.post(DB.URL + DB.PostSell, {
            v2ImId: UIDTYE,
            number_bin: random,
            v4qty: qty,
            v4bprice: bprice,
            v4amount: (inputsel == '' ? bprice : inputsel) * qty,
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
              axios.patch(DB.URL + DB.PatchHistory + UIDTYE, {
                HistoryQty:  HistoryQty + qty
              }).then((res) => {
                console.log("Success and PATCHHistory")
                setShow(false);
                setRedeuce()
              })
        }).catch((err) => {alert(err)})
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
    <>
        <div className='container pb-5'>
            <div className='card'>
                <div className='card-header d-flex'>
                    <div className="d-flex col-md-4">
                        <label><h4>ໜ້າຮ້ານ ການຂາຍສີນຄ້າ</h4></label>&nbsp;
                        <label className="btn btn-sm btn-warning"><i class="bi bi-arrow-clockwise"></i> ResetData</label>
                    </div>&nbsp;
                
                </div>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    {GETSELAPITYPE.filter((e) => e.status == 'true').map((Loop) => (
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + Loop.v1type} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    ປະເພດ: {Loop.v1type}
                                </button>
                            </h2>
                            <div id={Loop.v1type} class="accordion-collapse collapse show">
                                <div class="accordion-body">
                                    <div className='row'>
                                        {GETSELAPI.filter((e) => e.v1typeId._id == Loop._id && e.status == 'true').map((item) => (
                                            item.v2qty - item.HistoryQty > 0 ? 
                                            <div className='col-md-2'>
                                                <div className='pt-2'>
                                                    <div className='btn btn-hover card p-2 ps-relative' onClick={() => setAPIID(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        <label className='ps-absolute btn-sm btn-danger text-wite'>ຂາຍ</label>
                                                        <div className='card-content'>
                                                            <img src={DB.IMG + item.v2image} style={{width: 100+ "%", height: 150}}/>
                                                        </div>
                                                        <div className='card-footer'>
                                                            <label>{Loop.v1type}: {item.v2typeSl}</label><br/>
                                                            <label>Size: {item.sizev2}</label><br/>
                                                            <label>ຈຳນວນ: {item.v2qty - item.HistoryQty}</label><br/>
                                                            <label>ລາຄາ: <strong className='text-danger'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.bprice)}</strong></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='col-md-2'>
                                                <div className='pt-2 ps-relative'>
                                                    <div className='None-History'>
                                                        <button className='btn btn-sm btn-light'>ສີນຄ້າໝົດ!</button>
                                                    </div>
                                                    <div className='btn btn-hover card p-2' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        <label className='ps-absolute btn-sm btn-warning text-wite'>ປິດ</label>
                                                        <div className='card-content'>
                                                            <img src={DB.IMG + item.v2image} style={{width: 100+ "%", height: 150}}/>
                                                        </div>
                                                        <div className='card-footer'>
                                                            <label>{Loop.v1type}: {item.v2typeSl}</label><br/>
                                                            <label>Size: {item.sizev2}</label><br/>
                                                            <label>ຈຳນວນ: {item.v2qty - item.HistoryQty}</label><br/>
                                                            <label>ລາຄາ: <strong className='text-danger'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.bprice)}</strong></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal show={show} onHide={handleClose} size="xl" aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title>ແກ້ໄຂຂໍ້ມູນເມືອງ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={DB.IMG + v2image} style={{width: 100 + '%', height: 100 + '%'}} className="btn"/>
                            </div>
                            <div className='col-md-6 text-left'>
                                <h2><strong>ປະເພດສີນຄ້າ: {type}</strong></h2><hr/>
                                <label className='card card-body '>
                                    <label>ລາຍລະອຽດສີນຄ້າ:</label>
                                    <h5 className='p-2'><strong>{type} {v2typeSl}</strong></h5>
                                </label>&nbsp;

                                <h5>ຂະໜາດ Size: <strong>{sizev2}</strong></h5>
                                <h5>ຈຳນວນຈຳກັດ: <strong>{v2qty - HistoryQty} qty</strong></h5>

                                <nav aria-label="...">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link nextleft" onClick={decreaseQty} href="#">-</a>
                                        </li>
                                        <li class="page-item numberpage" aria-current="page">
                                            <input className='form-control text-center' min='1' value={qty} disabled/>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link nextright" onClick={increaseQty} href="#">+</a>
                                        </li>
                                    </ul>
                                </nav>

                                <div className='card card-body'>
                                    {Percen == 'false' ? 
                                        <h4 className='row'>
                                            <label className='col-md-3'>ລາຄາຂາຍ:</label><strong className='text-success col-md-4'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(bprice)}</strong>&nbsp; <label className='col-md-4  text-end'><button className='btn btn-sm btn-outline-success' onClick={TruePercen}>% ລົດລາຂາ</button></label>
                                        </h4>
                                        : 
                                        <h4 className='row'>
                                            <label className='col-md-3'>ລາຄາຂາຍ:</label><label className='col-md-5'><input className='form-control text-success' defaultValue={bprice} onChange={(e) => inputSell(e.target.value)}/></label>&nbsp; <label className='col-md-3'><button className='btn btn-sm btn-outline-danger' onClick={FalsePercen}>% ລົດລາຂາ</button></label>
                                        </h4>
                                    }
                                    <h4>ເງີນລວມ: <strong className='text-danger'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format((inputsel == '' ? bprice : inputsel) * qty)}</strong></h4>
                                </div>
                            </div>
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={handleClose} class="btn btn-danger" data-bs-dismiss="modal">ຍົກເລີກ</button>
                        <button type="button" onClick={SaveSell} class="btn btn-primary"><i class="bi bi-bag-check"></i> ຂາຍອອກ</button>
                    </Modal.Footer>
                </Modal>
            </div>

            {GETSELAPI.length > 0 ? '' : <label><img src={skateboarding} style={{width: 80}}/><strong>ບໍ່ມີຂໍ້ມູນ....</strong></label>}

        </div>
    </>
  )
}

export default SellTYPE