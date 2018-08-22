import {UPDATE_GAME, START_GAME, TIME_STAMP, GAME_TYPE, SET_NICK, SET_ID, ADD_USER, RESET_GAME, FULFILLED} from '../actions/gameActions';

export const getNick = (gameState, color, index) => {
    let arr = (color === 'blue') ? gameState.blueTeamNicks : gameState.redTeamNicks;
    return arr[index];    
}
export const setNick = (gameState, color, index, value) => {
    let arr = (color === 'blue') ? gameState.blueTeamNicks : gameState.redTeamNicks;
    arr[index] = value;    
}

export const getId = (gameState, color, index) => {
    let arr = (color === 'blue') ? gameState.blueTeamIds : gameState.redTeamIds;
    return arr[index];    
}
export const setId = (gameState, color, index, value) => {
    let arr = (color === 'blue') ? gameState.blueTeamIds : gameState.redTeamIds;
    arr[index] = value;    
}

const gameInit = {
    id: 0,
    redScore: 0,
    blueScore: 0,
    time: 0,
    finished: true,
    blueTeamNicks: ['jarek'],
    redTeamNicks: ['relik'],
    blueTeamIds: [0],
    redTeamIds: [0],
    gameType: 'normal'
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
        case SET_NICK: {
            let reds = state.redTeamNicks.slice()
            let blues = state.blueTeamNicks.slice()

            if(action.payload.color === 'blue')
                blues[action.payload.index] = action.payload.value
            else
                reds[action.payload.index] = action.payload.value
            return {
                ...state,
                blueTeamNicks: blues,
                redTeamNicks: reds
            }
        }
        case SET_ID: {
            let newState = {...state};
            setId(newState, action.payload.color, action.payload.index, action.payload.value)
            return newState
        }
        case ADD_USER: {
            let reds = state.redTeamNicks.slice()
            let blues = state.blueTeamNicks.slice();
            (action.payload === 'blue')
            ? blues.push("")
            : reds.push("")
            return {
                ...state,
                blueTeamNicks: blues,
                redTeamNicks: reds
            }
        }
        case RESET_GAME: {
            return gameInit;
        }
        default: return state
    }
}

