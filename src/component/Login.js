import React, { useState } from 'react'
import './Login.css'
import LogoLogin from '../assets/Img/img-01.webp'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import DB from '../service/server'
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate()

    const [ Username, setUsername ] = useState('')
    const [ Password, setPassword ] = useState('')

    const SubLogin = () => {
        if(!(Username && Password)){
            alert("ກະລຸນາປ່ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ")
        }else{
            axios.post(DB.URL + DB.Login, {
                UserName: Username,
                Password: Password
            }).then((res) => {
                let timerInterval
                Swal.fire({
                    title: 'ກວດສອບຄວາມຖືກຕ້ອງ!',
                    html: 'I will close in <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        localStorage.setItem('APITOKEN', res.data.token)
                        localStorage.setItem('OLDAPITOKEN', res.data._id)
                        navigate('/')
                    }
                })
            }).catch((err) => {alert("ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ")})
        }
    }


    const [showpass, setshowpass ] = useState('false') 
    const showpassword = () => setshowpass('true')
    const hidpassword = () => setshowpass('false')

  return (
    <>
        <div className='container p-2'>
            <div className='d-flex justify-content-center p-5 align-items-center limiter renative'>
                <div className='body-Login100 row wallpaper'></div>
                <div className='body-Login100 row posiblur'>
                    <div className='col-md-6 col-img-login'>
                        <img src={LogoLogin} style={{width: 100 + '%'}}/>
                    </div>
                    <div className='col-md-6 col-input-login'>
                        <div className='row w-80'>
                            <label className='text-center'><h4><strong className='text-white'>ຮ້ານຄ້າຂ້ອຍເອງ</strong></h4></label>&nbsp;
                            <div className='form-group'>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text boder-100 wspan-100'>ຊື່ຜູ້ໃຊ້</span>
                                    <input type='text' className='form-control boder-100' onChange={(e) => setUsername(e.target.value)} placeholder='Username: .....' required/>
                                </div>
                            </div>
                            <div className='form-group hidden-eye'>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text boder-100 wspan-100'>ລະຫັດຜ່ານ</span>
                                    <input type={showpass == 'true' ? 'text' : 'password'} className='form-control boder-100' onChange={(e) => setPassword(e.target.value)} placeholder='Password: .....' required/>
                                </div>
                            {showpass == 'true' ?
                                <span className='eye' onClick={hidpassword}><i class="bi bi-eye-fill"></i></span>
                                : <span className='eye' onClick={showpassword}><i class="bi bi-eye-slash-fill"></i></span> 
                            }
                            </div>&nbsp;
                            <div className='form-group'>
                                <button type='button' className='form-control boder-100 btn btn-success' onClick={SubLogin}>Longin</button>
                            </div>
                            <a href='https://wa.me/+8562095188702' target="_blank" className='btn btn-sm'><span className='span-cash'>devaloper: Apple.Phomsungcan</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
