import {GET_STATS, FULFILLED} from '../actions/userActions.js';

const summaryInit = {
    redScore: 0,
    blueScore: 0,
    gameTime: 0,
    redLongestSeries: 0,
    blueLongestSeries: 0
}

export default (state = summaryInit, action) => {
    switch (action.type) {
        case `${GET_STATS}${FULFILLED}`: {
            return action.payload.data
        }
        default: return state
    }
}
