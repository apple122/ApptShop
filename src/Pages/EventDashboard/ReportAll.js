import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import DB from '../../service/server'

export default function ReportAll() {
    
    const [ GetIMP, setGetIMP ] = useState([])
    const [ GetSell, setGetSell ] = useState([])
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(DB.URL + DB. GetIMP).then((res) => {
            setGetIMP(res.data)
        })
        axios.get(DB.URL + DB.GetSell).then((res) => {
            setGetSell(res.data)
        })
    }, [reducer])

    const cost = GetIMP.map(item => item.v2amount).reduce((prev, curr) => prev + curr, 0);
    const income = GetSell.map(item => item.v4amount).reduce((prev, curr) => prev + curr, 0);

    const ResetData = () => {
        setRedeuce()
    }

  return (
    <div className='card'>
        <div className='card-header d-flex'>
            <div className="d-flex">
                <label><h4>ສະຫຼຸບລາຍງານທັ້ງໝົດ</h4></label>&nbsp;
                <label className="btn btn-sm btn-warning" onClick={ResetData}><i class="bi bi-arrow-clockwise"></i> ResetData</label>&nbsp;
            </div>&nbsp;
            <div className="col-md-4">
                
            </div>
        </div>
        <div className='card-body w-100 overflow-auto'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='card card-body'>
                        <label>ລາຍຮັບທັ້ງໝົດ</label>
                        <h4 className='text-center text-success'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(income)}</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card card-body'>
                        <label>ລາຍຈ່າຍທັ້ງໝົດ</label>
                        <h4 className='text-center text-danger'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(cost)}</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card card-body'>
                        <label>ກຳໄລທັ້ງໝົດ</label>
                        <h4 className='text-center text-success'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(income < cost ? '' : (cost - income))}</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='card card-body'>
                        <label>ຫຼຸດທືນ</label>
                        <h4 className='text-center text-danger'>- {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'LAK' }).format(income > cost ? '' : (cost - income))}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}
