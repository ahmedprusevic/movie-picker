import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../actions/recommendation";
import Spinner from './Spinner';

const RecommendationItem = ({
  addLike,
  removeLike,
  auth,
  deletePost,
  post: { _id, text, title, name, user, likes, comments, date },
  singlePost,
  loading
}) => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const movie = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${title}&apikey=753aad9a`
      );
      if (movie.data.Response === "True") {
        setMovie(movie.data.Search[0]);
      }
      console.log(movie.data);
    };

    getMovie();
  }, []);

  return loading ? <Spinner /> : ( 
    <div className="post border-white my-1">
      <div>
        <img
          src={
            movie
              ? `${movie.Poster}`
              : `https://m.media-amazon.com/images/M/MV5BMTk3MzU1OTM2Nl5BMl5BanBnXkFtZTgwOTIyODM1MjE@._V1_SX300.jpg`
          }
          alt="Slika u predlogu"
        />
      </div>
      <div className="post-body">
        <h4 className="text-white">{movie ? `${movie.Title}` : text}</h4>

        <p className='my-1 text-white'>{text}</p>
        {singlePost ? <></> : <div> <button className="btn" onClick={(e) => addLike(_id)}>
            <i className="fas fa-thumbs-up"></i> <span>{likes.length}</span>
          </button>
          <button className="btn" onClick={(e) => removeLike(_id)}>
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/recommendations/${_id}`} className="btn btn-secondary">
            Discussion ({comments.length})
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button className="btn" onClick= {(e) => deletePost(_id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          )} </div> }
        <div>
          
          <p className="text-white my-2">
            Recommendation by {name} /// Posted on{" "}
            <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
          </p>
        </div>
      </div>
    </div>
  )
};

RecommendationItem.defaultProps = {
  singlePost: false
}

RecommendationItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  RecommendationItem
);
