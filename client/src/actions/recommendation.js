import axios from 'axios';
import { setAlert } from './alert';
import { GET_RECOMMENDATIONS, RECOMMENDATION_ERROR } from './types'

// Get Recommendations

export const getRecommendations = () => async dispatch => {
    try {
        const res = await axios.get('api/posts');

        dispatch({
            type: GET_RECOMMENDATIONS,
            payload: res.data
        });
        
    } catch(err) {
        dispatch({
            type: RECOMMENDATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}