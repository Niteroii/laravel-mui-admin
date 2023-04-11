import React from 'react';

/**
 * Limpa os erros de navegação ao sair do componente,
 * quando utilizando navegação por SPA.
 */
export default () => {
    React.useEffect(() => () => error.clear(), []);
};

