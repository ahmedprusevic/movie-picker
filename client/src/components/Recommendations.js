import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import RecommendationItem from './RecommendationItem';
import { connect } from 'react-redux';
import { getRecommendations } from '../actions/recommendation';
import Spinner from './Spinner';

const Recommendations = ({ getRecommendations, recommendation: { recommendations, loading }}) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getRecommendations();
    }, [getRecommendations]);

    useEffect(() => {
        const rec = recommendations.map(mov => mov.text);
        console.log(recommendations);
        if(rec.length !== 0) {
        setMovies(s => rec) }
    }, [loading])


    return loading ? <Spinner /> : (
        <section className='container'>
            <h1 className='large text-primary'>Recommendations</h1>
            <p className='lead text-white'>Here are some recommendations from our users</p>
            {/* FORM */}
            <div className='posts'>
                {recommendations.map(post => (
                    <RecommendationItem key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}

Recommendations.propTypes = {
    getRecommendations: PropTypes.func.isRequired,
    recommendation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recommendation: state.recommendation
});

export default connect(mapStateToProps, { getRecommendations })(Recommendations)
