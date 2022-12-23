import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DB from '../service/server'
import ReportAll from './EventDashboard/ReportAll'
import Report_allday from './EventDashboard/Report_allday'
import Report_Chart from './EventDashboard/Report_Chart'

export default function Dashboard() {

    return (
        <>
            <div className='container'>
                {/* Event Dashboard */}
                <ReportAll /> &nbsp;
                <Report_allday />
                <Report_Chart />
                {/* Event Dashboard */}
            </div>
        </>
      )
}
