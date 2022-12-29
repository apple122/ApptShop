import axios from 'axios'
import atom from '../assets/GIF/Atom.gif'
import React, { useState, useEffect, useReducer } from 'react';
import Moment from 'moment';
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import DB from '../service/server'
import Swal from 'sweetalert2';

export default function HistoryTYPE() {

    const [ GETAPI, setAPI ] = useState([])
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(DB.URL + DB.GetIMP).then((res) => {
            setAPI(res.data.reverse())
        })
    }, [reducer])

    const reload = () => {
        setRedeuce()
    }

    return (
        <>
            <div className='container'>
                <div className='card'>
                    <div className='card-header d-flex'>
                        <div className="d-flex">
                            <label><h4>ປະຫວັດສີນຄ້າໝົດ HistoryTYPE</h4></label>&nbsp;
                            <label className="btn btn-sm btn-warning" onClick={reload}><i class="bi bi-arrow-clockwise"></i> ResetData</label>&nbsp;
                        </div>&nbsp;
                    </div>
    
                    <div className='card-body w-100 overflow-auto'>
                    {GETAPI.filter((e) => e.status == 'offline').length > 0 ? 
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th className="col-md-1"><strong className="text-danger">( {GETAPI.filter((e) => e.status == 'offline').length} )</strong></th>
                                    <th className='col-md-2'>ຮູບພາບ</th>
                                    <th>ຂໍ້ມູນປະເພດ</th>
                                    <th>ຂະໜາດ</th>
                                    <th>ລາຄາຊື້ ຕໍ່ໂຕ</th>
                                    <th>ຈຳນວນ</th>
                                    <th>ເງີນລວມ</th>
                                    <th><strong className='text-danger'>( Status )</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {GETAPI.filter((e) => e.status == 'offline').map((item, index) => (
                                    <tr>
                                        <td>{index +1}</td>
                                        <td><img src={DB.IMG + item.v2image} style={{width: 100}}/></td>
                                        <td>{(item.v1typeId.v1type)+ ': '+(item.v2typeSl)}</td>
                                        <td>{item.sizev2}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2sprice)}</td>
                                        <td>{item.v2qty - item.HistoryQty}</td>
                                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(item.v2amount)}</td>
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
