import {
    GET_RECOMMENDATIONS,
    RECOMMENDATION_ERROR,
    UPDATE_LIKES,
    REMOVE_RECOMMENDATION,
    ADD_RECOMMENDATION,
    GET_RECOMMENDATION,
    ADD_COMMENT,
    REMOVE_COMMENT
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
        case ADD_COMMENT: 
        return {
            ...state,
            recommendation: { ...state.post, comments: payload},
            loading: false
        }
        case REMOVE_COMMENT:
            return {
                ...state,
                recommendation: {
                    ...state.recommendation,
                    comments: state.recommendation.comments.filter(comment => comment._id !== payload),
                    loading: false
                }
            }
        default:
            return state;
    }
}