import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommendation } from "../actions/recommendation";
import RecommendationItem from './RecommendationItem';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const Recommendation = ({
  getRecommendation,
  recommendation: { recommendation, loading },
  match,
}) => {
  
  useEffect(() => {
    getRecommendation(match.params.id);
  }, [getRecommendation]);


  return loading || recommendation === null ? <Spinner /> : (
    <section className="container">
    <Link to='/recommendations' className="btn btn-secondary"> Go Back </Link>
    
    <RecommendationItem post={recommendation} singlePost={true} loading={loading} />
    <div className="recommedations-form my-2">
      <form className="form ">
        <div className="form-group">
          <input type="text" required />
          <label>Leave a comment</label>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
    <div className="posts">
      <div className="post border-white my-1">
        <div>
          <img
            src="https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
            alt=""
            className="rounded-img"
          />
        </div>
        <div className="post-body">
          <p className="my-1 text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
            quo reprehenderit quam voluptate ut at, ex unde tenetur voluptates
            explicabo debitis animi cumque nemo vel. Exercitationem magnam,
            perferendis saepe deleniti quos quod dignissimos obcaecati odio
            blanditiis sequi facilis quaerat qui.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
};

Recommendation.propTypes = {
  getRecommendation: PropTypes.func.isRequired,
  recommendation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recommendation: state.recommendation,
});

export default connect(mapStateToProps, { getRecommendation })(Recommendation);
