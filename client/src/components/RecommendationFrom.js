import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../actions/recommendation";

const RecommendationFrom = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: "",
    title: "",
  });

  const { text, title } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
      e.preventDefault();
      addPost(formData);
      setFormData({text: '', title: ''});
  }

  return (
    <div className="recommedations-form p-1">
      <form className="form my-1" onSubmit= {e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            required
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
          <label>Recommend a movie</label>
        </div>
        <div className="msg">
          <textarea
            className="msg__textarea"
            placeholder="Say something about the movie"
            name="text"
            value={text}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
};

RecommendationFrom.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(RecommendationFrom);
