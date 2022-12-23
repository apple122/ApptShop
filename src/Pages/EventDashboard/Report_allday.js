import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'moment'
import DB from '../../service/server'

export default function Report_allday() {

  const [ GetIMP, setGetIMP ] = useState([])
  const [ GetSell, setGetSell ] = useState([])
  const [ Select, setSelect ] = useState('')
  useEffect(() => {
      axios.get(DB.URL + DB. GetIMP).then((res) => {
          setGetIMP(res.data)
      })
      axios.get(DB.URL + DB.GetSell).then((res) => {
          setGetSell(res.data)
      })
  }, [])

  const cost = GetIMP.filter((e) => Moment(e.curdate).format("MM") == (Select == '' ? Moment().format("MM") : Select)).map(item => item.v2amount).reduce((prev, curr) => prev + curr, 0);
  const income = GetSell.filter((e) => Moment(e.curdate).format("MM") == (Select == '' ? Moment().format("MM") : Select)).map(item => item.v4amount).reduce((prev, curr) => prev + curr, 0);
  const LoopQnumberDrw = [...new Set(GetIMP.map(item => Moment(item.curdate).format("MM")))]


  return (
    <div className='card'>
        <div className='card-header d-flex'>
            <div className="d-flex">
                <label><h4>ສະຫຼຸບເງີນລາຍເດືອນ</h4></label>&nbsp;
            </div>&nbsp;
            <div className="col-md-4">
                <select className='form0=-select form-control text-center' onChange={(e) => setSelect(e.target.value)}>
                  <option value={''}>~~ Seletc Month ~~</option>
                  {LoopQnumberDrw.map((item) => (
                    <option value={item}>ເດືອນ: {item}</option>
                  ))}
                </select>
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
