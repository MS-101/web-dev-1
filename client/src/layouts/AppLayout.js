import React from 'react'
import { Outlet } from 'react-router-dom'
import TopPanel from '../components/TopPanel'
import SideBar from '../components/SideBar'
import '../styles/AppLayout.css'

const AppLayout = () => {
    return (
        <div className='App'>
            <TopPanel />
            <div className='ContentWrapper'>
                <SideBar />
                <div className='Content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AppLayout