import React, {useContext} from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/SideBar.css'

const Sidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="SideBar">
            <ul>
                {user && <SidebarItem to='/Feed'>Feed</SidebarItem>}
                <SidebarItem to='/Trending'>Trending</SidebarItem>
            </ul>
        </nav>
    )
}

const SidebarItem = ({to, children, ...props}) => {
    const resoledPath = useResolvedPath(to);
    const isActive = useMatch({path: resoledPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Sidebar;