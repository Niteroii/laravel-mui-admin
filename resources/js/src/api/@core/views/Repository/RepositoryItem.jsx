import React from 'react';
import { useParams } from 'react-router-dom';

const RepositoryItem = () => {
    const { id = 0 } = useParams();
    return <div>RepositoryItem {id}</div>;
};

export default RepositoryItem;
