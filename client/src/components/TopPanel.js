import React from 'react';
import { Link } from "react-router-dom";

const TopPanel = () => {
    return (
        <nav>
            <h1>
                <Link to="/">Banter</Link>
            </h1>
        </nav>
    )
}

export default TopPanel;