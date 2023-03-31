import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Navigate } from 'react-router-dom';

/**
 * Verifica se o usuário possui todas as permissões especificadas
 * 
 * @param {*} param0 
 * @returns 
 */
const HasAbilitiesMiddleware = ({
    element, abilities, userAbilities,
}) => {

    if (userAbilities.filter((ability) => abilities.includes(ability.code)).length !== abilities.length) {
        return (
            <Navigate to="/" />
        );
    }

    return element;
};


HasAbilitiesMiddleware.propTypes = {
    element: PropTypes.node,
    abilities: PropTypes.array,
    userAbilities: PropTypes.array,
};

const mapStateToProps = (state) => ({
    userAbilities: state.app.user?.abilities,
});

export default connect(mapStateToProps)(HasAbilitiesMiddleware);
