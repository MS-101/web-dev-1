import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'contexts/auth-context';

const Home = () => {
    const { user } = useContext(AuthContext);

    return user
        ? <Navigate to="/feed" replace />
        : <Navigate to="/trending" replace />;
};

export default Home;