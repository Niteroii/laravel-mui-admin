import React from 'react';
import { useParams } from 'react-router-dom';

const Reset = () => {
    const { token } = useParams();
    return (
        <div>
            Hello reset {token}
        </div>
    );
};

export default Reset;

