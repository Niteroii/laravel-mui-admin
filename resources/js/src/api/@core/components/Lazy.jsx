/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

const Lazy = ({ Component }) => {
    if (!Component.$$typeof === 'Symbol(react.lazy)') {
        throw new Error('Component must be a lazy component.');
    }

    return (
        <React.Suspense fallback={<Loading />}>
            <Component />
        </React.Suspense>
    );
};

Lazy.propTypes = { Component: PropTypes.object.isRequired };

export default Lazy;
