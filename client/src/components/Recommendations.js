import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecommendations } from '../actions/recommendation';
import Spinner from './Spinner';

const Recommendations = props => {
    return (
        <div>
            
        </div>
    )
}

Recommendations.propTypes = {

}

const mapStateToProps = state => ({
    recommendations: state.recommendations
});

export default connect(mapStateToProps, { getRecommendations })(Recommendations)
