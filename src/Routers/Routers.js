import React from "react";
import { Routes, Route } from "react-router-dom";
import TypePro from "../Pages/typePro";
import ImportedTYPE from "../Pages/importedTYPE";
import SellTYPE from "../Pages/SellTYPE";
import SellTYPE_modal from "../Pages/ModalEvent/SellTYPE.modal";
import HistorySell from "../Pages/HistorySell";
import HistoryTYPE from "../Pages/HistoryTYPE";
import Dashboard from "../Pages/Dashboard";

export default function Routers () {
    return ( 
        <>
            <Routes>
                <Route exact path='/TypePro' element={< TypePro />}></Route>
                <Route exact path='/importedTYPE' element={ < ImportedTYPE /> }></Route>
                <Route exact path='/SellTYPE' element={ < SellTYPE /> }></Route>
                <Route exact path='/SellTYPE_modal/:id' element={ < SellTYPE_modal /> }></Route>
                <Route exact path='/HistorySell' element={ < HistorySell /> }></Route>
                <Route exact path='/HistoryTYPE' element={ < HistoryTYPE /> }></Route>
                <Route exact path='/' element={ < Dashboard /> }></Route>
            </Routes>
        </>
    )
}