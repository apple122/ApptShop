import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Router, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../component/Component.css'
import DB from '../service/server'
import Routers from '../Routers/Routers';
import RouterLogin from "../Routers/RouterLogin";
import LogoutGIF from '../assets/GIF/kaioura-anime-girl.gif'
import IMGLOGO from '../assets/Img/LogoWebShoppy.png'
import './Setting.css'

export default function Headder (){
    const navigate = useNavigate()

    const APITOKEN = localStorage.getItem('APITOKEN')
    const [ APITKOKEN, setTOKEN ] = useState(false)
    const Logout = () => {
        Swal.fire({
            title: 'ອອກຈາລະບົບ!',
            text: 'ກົດປຸ່ມ ອອກຈາກລະບົບ ເພືອອກຈາກລະບົບ.',
            imageUrl: LogoutGIF,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonText: 'ອອກຈາກລະບົບ!',
            cancelButtonText: 'ຍົກເລີກ!',
            reverseButtons: true
          }).then((require) => {
            if(require.isConfirmed){
               axios.patch(DB.URL + DB.Logout + localStorage.getItem('OLDAPITOKEN')).then((res) => {
                    localStorage.removeItem('OLDAPITOKEN')
                    localStorage.removeItem('APITOKEN')
                    setTOKEN(false)
                    navigate('/Login')
               })
            }
          })
    }

    axios.get(DB.URL + DB.GetByLogin + localStorage.getItem('OLDAPITOKEN')).then((res) => {
    if(res.data.status == 'true'){
        setTOKEN(true)
    }else{
        localStorage.removeItem('OLDAPITOKEN')
        localStorage.removeItem('APITOKEN')
        setTOKEN(false)
        alert('ໄອດີໝົດອາຍຸແລ້ວ ກະລຸນາລົງຊື່ເຂົ້າໃຊ້ໄໝ່ອີກຄັ້ງ!')
    }
    })

    const [ hidareshow, sethidshow ] = useState(false)
    const handleshow = () => sethidshow(true)
    const handlehid = () => sethidshow(false) 

    return (
        <>
        <div className={`${APITKOKEN == true ? '' : 'd-none'}`} id='print-none'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light position-fixedS">
                <Link class={`navbar-brand ${hidareshow == true ? 'd-none' : ''}`} id="hover-imglogo" onClick={handleshow}><img src={IMGLOGO} width="150"/></Link>
                <Link class={`navbar-brand ${hidareshow == false ? 'd-none' : ''}`} id="hover-imglogo" onClick={handlehid}><img src={IMGLOGO} width="150"/></Link>
                <div className={`card-body bg-white setting-web ${hidareshow == true ? '' : 'd-none'}`}>
                    <ul>
                        <li class="nav-item item_hover">
                            <Link to="/CreateUsers" class="nav-link active text-danger" aria-current="page"><i class="bi bi-person-fill-gear"></i> Create Users</Link>
                        </li>
                    </ul>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item item_hover">
                            <Link to="/ໜ້າຫຼັກ" class="nav-link active text-dark" onClick={handlehid} aria-current="page"><i class="bi bi-pie-chart-fill"></i> ໜ້າຫຼັກ</Link>
                        </li>
                        <li class="nav-item item_hover">
                            <Link to="./ປະເພດສີນຄ້າ" class="nav-link text-dark" onClick={handlehid}>ປະເພດສີນຄ້າ</Link>
                        </li>
                        <li class="nav-item item_hover">
                            <Link to="./ນຳເຂົ້າສິນຄ້າ" class="nav-link text-danger" onClick={handlehid}>ນຳເຂົ້າສິນຄ້າ</Link>
                        </li>
                        <li class="nav-item item_hover">
                            <Link to="./ຂາຍສີນຄ້າ" class="nav-link text-dark" onClick={handlehid}><i class="bi bi-shop"></i> ຂາຍສີນຄ້າ</Link>
                        </li>
                        <li class="nav-item item_hover">
                            <Link to="./ປະຫວັດການຂາຍ" class="nav-link text-dark" onClick={handlehid}><i class="bi bi-clock-history"></i> ປະຫວັດການຂາຍ</Link>
                        </li>
                        <li class="nav-item item_hover">
                            <Link to="./ເກັບປະຫວັດສີນຄ້າໝົດ" class="nav-link text-dark" onClick={handlehid}><i class="bi bi-clock-history"></i> ເກັບປະຫວັດສີນຄ້າໝົດ</Link>
                        </li>

                    </ul>
                    <form class="form-inline my-2 my-lg-0 pr-2">
                        <button type="button" class="btn btn-outline-danger my-2 my-sm-0" onClick={Logout}><i class="bi bi-box-arrow-right"></i> Logout</button>
                    </form>
                </div>
            </nav>
            <div className="p-5"></div>
            <Routers/>
        </div>

        <div className={`${APITKOKEN == false ? '' : 'd-none'}`}>
            {/* <Login/> */}
            <RouterLogin/>
        </div>
            
        </>
    )
}