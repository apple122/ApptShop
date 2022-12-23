import React from "react";
import { Link } from "react-router-dom";
import '../component/Component.css'

export default function Headder (){
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light position-fixedS">
                <Link class="navbar-brand" to="/ໂປຣເຈັກຂາຍເຄື່ອງ"><strong>ໂປຣເຈັກຂາຍເຄື່ອງ</strong></Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/" class="nav-link active" aria-current="page"><i class="bi bi-pie-chart-fill"></i> ໜ້າຫຼັກ</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="./TypePro" class="nav-link">ປະເພດສີນຄ້າ</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="./importedTYPE" class="nav-link">ນຳເຂົ້າສິນຄ້າ</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="./SellTYPE" class="nav-link"><i class="bi bi-shop"></i> ຂາຍສີນຄ້າ</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="./HistorySell" class="nav-link"><i class="bi bi-clock-history"></i> ປະຫວັດການຂາຍ</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="./HistoryTYPE" class="nav-link"><i class="bi bi-clock-history"></i> ເກັບປະຫວັດສີນຄ້າໝົດ</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="p-5"></div>
        </>
    )
}