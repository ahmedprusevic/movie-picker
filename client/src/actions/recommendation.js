import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_RECOMMENDATIONS,
  RECOMMENDATION_ERROR,
  REMOVE_RECOMMENDATION,
  UPDATE_LIKES,
  ADD_RECOMMENDATION,
  GET_RECOMMENDATION
} from "./types";

// Get Recommendations

export const getRecommendations = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");

    dispatch({
      type: GET_RECOMMENDATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Likes

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Post

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/posts/${id}`);

    dispatch({
      type: REMOVE_RECOMMENDATION,
      payload: id 
    });

    dispatch(setAlert('You Removed a Post', 'danger'));
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Recommendation 

export const addPost = (formData) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`api/posts/`, formData, config);

    dispatch({
      type: ADD_RECOMMENDATION,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single recommendation 

export const getRecommendation = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    
    dispatch({
      type: GET_RECOMMENDATION,
      payload: res.data
    });

    
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

