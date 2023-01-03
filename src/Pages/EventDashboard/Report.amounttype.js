import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import DB from '../../service/server'

export default function Report_amounttype() {

    const [ getTypePro, setTypepro ] = useState([])
    const [ GetIMP, setGetIMP ] = useState([])
    const [ GetSell, setGetSell ] = useState([])
    useEffect(() => {
        axios.get(DB.URL + DB.getTypePro).then((res) => {
            setTypepro(res.data)
        })

        axios.get(DB.URL + DB.GetIMP).then((res) => {
            setGetIMP(res.data)
        })

        axios.get(DB.URL + DB.GetSell).then((res) => {
            setGetSell(res.data)
        })
    }, [])


  return (
    <div className='card'>
        <div className='card-header d-flex'>
            <div className="d-flex">
                <label><h4>ປະຫວັດລາຍການສີນຄ້າທັ້ງໝົດ ( ລວມທັ້ງປະຫວັດການລົບດ້ວຍ )</h4></label>&nbsp;
            </div>&nbsp;
            <div className="col-md-4">
            </div>
        </div>
        <div className='card-body w-100 overflow-auto text-white'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='card-body box-zero text-white'>
                        <label>ຈຳນວນປະເພດສີນຄ້າ ທັ້ງໝົດ</label>
                        <h4 className='text-center p-2'><strong>{getTypePro.length}</strong> QTY</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card-body box-zero text-white'>
                        <label>ສີນຄ້ານຳເຂົ້າ ທັ້ງໝົດ</label>
                        <h4 className='text-center p-2'><strong>{GetIMP.length}</strong> QTY</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card-body box-zero text-white'>
                        <label>ປະຫວັດການຂາຍ ທັ້ງໝົດ</label>
                        <h4 className='text-center p-2'><strong>{GetSell.length}</strong> QTY</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card-body box-zero text-white'>
                        <label>ຈຳນວນປະເພດທີ່ປົດການນຳໃຊ້ ທັ້ງໝົດ</label>
                        <h4 className='text-center p-2'><strong>{GetIMP.filter((e) => e.status == 'offline').length}</strong> QTY</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
