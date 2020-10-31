import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

const RecommendationItem = ({
  auth,
  post: { _id, text, name, user, likes, comments, date },
}) => {
  return (
    <div className="post border-white my-1">
      <div>
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTk3MzU1OTM2Nl5BMl5BanBnXkFtZTgwOTIyODM1MjE@._V1_SX300.jpg"
          alt=""
        />
      </div>
      <div className="post-body">
        <h4 className="text-white">Batman and Robin</h4>
        <p className="my-1 text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum quo
          reprehenderit quam voluptate ut at, ex unde tenetur voluptates
          explicabo debitis animi cumque nemo vel. Exercitationem magnam,
          perferendis saepe deleniti quos quod dignissimos obcaecati odio
          blanditiis sequi facilis quaerat qui.
        </p>
        <div>
          <button className="btn">
            <i className="fas fa-thumbs-up"></i> <span>4</span>
          </button>
          <button className="btn">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <a href="post.html" className="btn btn-secondary">
            Discussion
          </a>
          <p></p>
        </div>
      </div>
    </div>
  );
};

RecommendationItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RecommendationItem);
