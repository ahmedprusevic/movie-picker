import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import recommendation from './redommendation';

export default combineReducers({
    alert,
    auth,
    profile,
    recommendation
});