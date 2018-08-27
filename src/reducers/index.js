import { combineReducers } from 'redux';

import userReducer from './userReducer';
import gameReducer from './gameReducer';
import summaryReducer from './summaryReducer';
import playersReducer from './playersReducer';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    summary: summaryReducer,
    players: playersReducer
})

export default rootReducer;