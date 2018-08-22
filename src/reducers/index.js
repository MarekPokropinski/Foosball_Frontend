import { combineReducers } from 'redux';

import userReducer from './userReducer';
import gameReducer from './gameReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    summary: summaryReducer
})

export default rootReducer;