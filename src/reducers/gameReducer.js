import {UPDATE_GAME, START_GAME, TIME_STAMP, GAME_TYPE, RESET_GAME, FULFILLED} from '../actions/gameActions';

const gameInit = {
    id: 0,
    redScore: 0,
    blueScore: 0,
    time: 0,
    timeLimitMilis: 0,
    finished: true,
    gameType: 'invalid',
    validated: false
}

export default (state = gameInit, action) => {
    switch (action.type) {
        case UPDATE_GAME: {
            return {
                ...state,
                ...action.payload
            }
        }
        case `${START_GAME}${FULFILLED}`: {
            return {
                ...state,
                id: action.payload.data
            }
        }
        case TIME_STAMP: {
            return {
                ...state,
                time: state.time + action.payload
            }
        }
        case GAME_TYPE: {
            return {
                ...state,
                gameType: action.payload
            }
        }
        case RESET_GAME: {
            return gameInit;
        }
        default: return state
    }
}

