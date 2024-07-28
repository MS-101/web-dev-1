import React from 'react';
import Feed from './Feed';
import Trending from './Trending';

const Home = () => {
    const isAuthenticated = () => {
        return true;
    };

    return isAuthenticated() ? <Feed /> : <Trending />;
};

export default Home;