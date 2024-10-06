import React, {useContext} from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AuthContext } from 'contexts/auth-context';
import 'styles/side-bar.css'

const Sidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="SideBar">
            <ul>
                {user && <SidebarItem title='Feed' to='/Feed'/>}
                <SidebarItem title='Trending' to='/Trending'/>
            </ul>
        </nav>
    )
}

const SidebarItem = ({title, to}) => {
    const resoledPath = useResolvedPath(to);
    const isActive = useMatch({path: resoledPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}>
                {title}
            </Link>
        </li>
    )
}

export default Sidebar;