import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

const Suspense = ({ children: Component }) => (
    <React.Suspense fallback={<Loading />}>
        <Component />
    </React.Suspense>
);

Suspense.propTypes = {
    children: PropTypes.shape({
        $$typeof: PropTypes.symbol.isRequired,
        _init: PropTypes.func.isRequired,
        _payload: PropTypes.shape({
            _status: PropTypes.number.isRequired,
            _result: PropTypes.func.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Suspense;
