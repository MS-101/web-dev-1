import React from 'react'
import { Outlet } from 'react-router-dom'
import TopPanel from '../components/TopPanel'
import Navbar from '../components/Navbar'

const AppLayout = () => {
    return (
        <div className='App'>
            <TopPanel />
            <Navbar />
            <div className='Content'>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout