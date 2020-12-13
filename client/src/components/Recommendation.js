import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRecommendation, addComment } from "../actions/recommendation";
import RecommendationItem from './RecommendationItem';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const Recommendation = ({
  getRecommendation,
  recommendation: { recommendation, loading },
  match,
  addComment
}) => {
  
  const [text, setText] = useState(''); 

  useEffect(() => {
    getRecommendation(match.params.id);
  }, []);


  return loading || recommendation === null ? <Spinner /> : (
    <section className="container">
    <Link to='/recommendations' className="btn btn-secondary"> Go Back </Link>
    
    <RecommendationItem post={recommendation} singlePost={true} loading={loading} />
    <div className="recommedations-form my-2">
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addComment(recommendation._id, {text});
        setText('');
      }}>
        <div className="form-group">
          <input type="text" required onChange={e => setText(e.target.value)}/>
          <label>Leave a comment</label>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
    <div className="posts">
      {recommendation.comments.map(comment => (
        <div className="post border-white my-1" key={comment._id}>
        <div>
          <img
            src="https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
            alt=""
            className="rounded-img"
          />
        </div>
        <div className="post-body">
          <h2></h2>
          <p className="my-1 text-white">
           {comment.text}
          </p>
        </div>
      </div>
      ))}
    </div>
  </section>
  )
};

Recommendation.propTypes = {
  getRecommendation: PropTypes.func.isRequired,
  recommendation: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  recommendation: state.recommendation,
});

export default connect(mapStateToProps, { getRecommendation, addComment })(Recommendation);
