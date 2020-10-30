import {
    GET_RECOMMENDATIONS,
    RECOMMENDATION_ERROR,
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
        case RECOMMENDATION_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}