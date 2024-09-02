import React from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import '../styles/TopPanel.css'

const TopPanel = () => {
    const { user, showLogin } = useAuthContext();

    return (
        <nav className='TopPanel'>
            <div className='TitleContainer'>
                <h1 className='Title'>
                    <Link to="/">Banter</Link>
                </h1>
            </div>
            <div className='SearchContainer'>
                <SearchBar/>
            </div>
            <nav className='ButtonContainer'>
                {user ? <button>Logout</button> : <button onClick={showLogin}>Login</button>}
            </nav>
        </nav>
    )
}

export default TopPanel;