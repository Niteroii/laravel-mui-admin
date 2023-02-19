import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Navigate } from 'react-router-dom';

/**
 * Verifica se o usuário possui uma das permissões especificadas
 * 
 * @param {*} param0 
 * @returns 
 */
const HasAbilityMiddleware = ({
    element, abilities, userAbilities,
}) => {

    if (userAbilities.filter((ability) => abilities.includes(ability.code)).length === 0) {
        return (
            <Navigate to="/" />
        );
    }

    return element;
};


HasAbilityMiddleware.propTypes = {
    element: PropTypes.node,
    abilities: PropTypes.array,
    userAbilities: PropTypes.array,
};

const mapStateToProps = (state) => ({
    userAbilities: state.app.user?.abilities,
});

export default connect(mapStateToProps)(HasAbilityMiddleware);
