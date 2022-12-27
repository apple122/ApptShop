import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../component/Login";
export default function RouterLogin () {
    return ( 
        <>
            <Routes>
            <Route exact path='/ປະເພດສີນຄ້າ' element={< Login />}></Route>
                <Route exact path='/ນຳເຂົ້າສິນຄ້າ' element={ < Login /> }></Route>
                <Route exact path='/ຂາຍສີນຄ້າ' element={ < Login /> }></Route>
                <Route exact path='/ປະຫວັດການຂາຍ' element={ < Login /> }></Route>
                <Route exact path='/ເກັບປະຫວັດສີນຄ້າໝົດ' element={ < Login /> }></Route>
                
                <Route exact path='/Login' element={ < Login /> }></Route>
                <Route exact path='/' element={ < Login /> }></Route>
                <Route exact path='/ໜ້າຫຼັກ' element={ < Login /> }></Route>
                <Route exact path='/ໂປຣເຈັກຂາຍເຄື່ອງ' element={ < Login /> }></Route>
            </Routes>
        </>
    )
}