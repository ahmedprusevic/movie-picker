import {
    GET_RECOMMENDATIONS,
    RECOMMENDATION_ERROR,
    UPDATE_LIKES,
    REMOVE_RECOMMENDATION,
    ADD_RECOMMENDATION,
    GET_RECOMMENDATION
} from '../actions/types';

const initialState = {
    recommendations: [],
    recommendation: null,
    loading: true,
    error: {}
}

export default function(state=initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: payload,
                loading: false
            };
        case GET_RECOMMENDATION:
            return {
                ...state,
                recommendation: payload,
                loading: false
            }
        case ADD_RECOMMENDATION:
            return {
                ...state,
                recommendations: [payload, ...state.recommendations],
                loading: false
            }
        case REMOVE_RECOMMENDATION:
            return {
                ...state,
                recommendations: state.recommendations.filter(rec => rec._id !== payload),
                loading: false
            }
        case RECOMMENDATION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                recommendations: state.recommendations.map(rec => rec._id === payload.id ? {...rec, likes: payload.likes} : rec),
                loading: false
            }
        default:
            return state;
    }
}