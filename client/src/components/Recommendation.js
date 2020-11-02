import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { getRecommendation } from '../actions/recommendation';


const Recommendation = ({ getRecommendation, recommendation: { recommendation, loading }, match}) => {

    useEffect(() => {
        getRecommendation(match.params.id);
    }, [getRecommendation]);

    return (
        <section class="container">
        <button class="btn btn-secondary"> Go Back </button>
            <div class="post border-white my-1">
                <div>
                    <img src="https://m.media-amazon.com/images/M/MV5BMTk3MzU1OTM2Nl5BMl5BanBnXkFtZTgwOTIyODM1MjE@._V1_SX300.jpg" alt="" />
                </div>
                <div class="post-body">
                    <h4 class="text-white">Batman and Robin</h4>
                    <p class="my-1 text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum quo reprehenderit quam voluptate ut at, ex unde tenetur voluptates explicabo debitis animi cumque nemo vel. Exercitationem magnam, perferendis saepe deleniti quos quod dignissimos obcaecati odio blanditiis sequi facilis quaerat qui.
                    </p>
                </div>
            </div>
        <div class="recommedations-form my-2">
            <form class="form ">
                <div class="form-group">
                    <input type="text" required />
                    <label>Leave a comment</label>
                </div>
                <input type="submit" value="Submit" class="btn btn-primary" />
            </form>
        </div>
        <div class="posts">
            <div class="post border-white my-1">
                <div>
                    <img src="https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" alt="" class="rounded-img" />
                </div>
                <div class="post-body">
                    <p class="my-1 text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum quo reprehenderit quam voluptate ut at, ex unde tenetur voluptates explicabo debitis animi cumque nemo vel. Exercitationem magnam, perferendis saepe deleniti quos quod dignissimos obcaecati odio blanditiis sequi facilis quaerat qui.
                    </p>
                </div>
            </div>
        </div>
    </section>
    )
}

Recommendation.propTypes = {
    getRecommendation: PropTypes.func.isRequired,
    recommendation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    recommendation: state.recommendation
})

export default connect(mapStateToProps, { getRecommendation })(Recommendation);
