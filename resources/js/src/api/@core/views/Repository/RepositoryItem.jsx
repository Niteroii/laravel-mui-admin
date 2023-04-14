import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const RepositoryItem = () => {
    const { id = 0 } = useParams();
    const { className } = useLoaderData();
    return <div>RepositoryItem for {className} - {id}</div>;
};

export default RepositoryItem;
