import React from "react";
import { Routes, Route } from "react-router-dom";
import TypePro from "../Pages/typePro";
import ImportedTYPE from "../Pages/importedTYPE";
import SellTYPE from "../Pages/SellTYPE";
import SellTYPE_modal from "../Pages/ModalEvent/SellTYPE.modal";
import HistorySell from "../Pages/HistorySell";
import HistoryTYPE from "../Pages/HistoryTYPE";
import Dashboard from "../Pages/Dashboard";
import CreateUsers from "../Setting/CreateUsers";

export default function Routers () {
    return ( 
        <>
            <Routes>
                <Route exact path='/ປະເພດສີນຄ້າ' element={< TypePro />}></Route>
                <Route exact path='/ນຳເຂົ້າສິນຄ້າ' element={ < ImportedTYPE /> }></Route>
                <Route exact path='/ຂາຍສີນຄ້າ' element={ < SellTYPE /> }></Route>
                <Route exact path='/ປະຫວັດການຂາຍ' element={ < HistorySell /> }></Route>
                <Route exact path='/ເກັບປະຫວັດສີນຄ້າໝົດ' element={ < HistoryTYPE /> }></Route>
                <Route exact path='/CreateUsers' element={ < CreateUsers /> }></Route>
                
                <Route exact path='/Login' element={ < Dashboard /> }></Route>
                <Route exact path='/' element={ < Dashboard /> }></Route>
                <Route exact path='/ໜ້າຫຼັກ' element={ < Dashboard /> }></Route>
                <Route exact path='/ໂປຣເຈັກຂາຍເຄື່ອງ' element={ < Dashboard /> }></Route>
            </Routes>
        </>
    )
}