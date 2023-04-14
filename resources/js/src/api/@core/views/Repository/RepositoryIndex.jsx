import React from 'react';
import { useLoaderData } from 'react-router-dom';

const RepositoryIndex = () => {
    const { className } = useLoaderData();
    return <div>RepositoryIndex for {className}</div>;
};
export default RepositoryIndex;
