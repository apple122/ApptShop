import React from "react";
import { Routes, Route } from "react-router-dom";
import TypePro from "../Pages/typePro";
import ImportedTYPE from "../Pages/importedTYPE";

export default function Routers () {
    return ( 
        <>
            <Routes>
                <Route exact path='/TypePro' element={< TypePro />}></Route>
                <Route exact path='/importedTYPE' element={ < ImportedTYPE /> }></Route>
            </Routes>
        </>
    )
}