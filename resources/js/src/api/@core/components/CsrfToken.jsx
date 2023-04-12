import React from 'react';

const CSRF_TOKEN = blade('csrf');

const CsrfToken = () => (
    <input
        type="hidden"
        name="_token"
        value={CSRF_TOKEN}
    />
);

export default CsrfToken;
