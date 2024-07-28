import React from 'react';
import { useParams } from 'react-router-dom';

const Community = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Community Page - {id}</h2>
            <p>Content for community page.</p>
        </div>
    );
};

export default Community;