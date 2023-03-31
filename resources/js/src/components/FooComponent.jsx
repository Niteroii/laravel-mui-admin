import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const FooComponent = () => {

    return (
        <React.Fragment>
            Componente FooComponent
        </React.Fragment>
    );
};

FooComponent.propTypes = {
    // appIsLoaded: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
    // appIsLoaded: state.app.loaded,
});


export default connect(mapStateToProps)(FooComponent);
