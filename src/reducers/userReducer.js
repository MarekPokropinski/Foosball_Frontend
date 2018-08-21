import * as userActions from '../actions/userActions.js';
import {SET_NICK} from '../actions/userActions.js';

const initValue = {
    socket: null,
    socketListeners: [],
    timer: null,
    gameState: {
        id: 0,
        redScore: 0,
        blueScore: 0,
        time: 0,
        finished: true,
        blueTeamIds: [1],
        redTeamIds: [3],
        blueTeamNicks: ['jarek'],
        redTeamNicks: ['relik']
    },
    summary: {
        redScore: 0,
        blueScore: 0,
        gameTime: 0,
        redLongestSeries: 0,
        blueLongestSeries: 0
    },
    gameType: 'normal'
}

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

export default (state = initValue, action) => {

    switch (action.type) {
        case userActions.CONNECT_WS:
            return {
                ...state,
                socket: action.payload
            }
        case userActions.SOCKET_EVENT:
            return {
                ...state,
                gameState: {...state.gameState, ...action.payload}
            }
        case `${userActions.START_GAME}${userActions.FULFILLED}`:
            return {
                ...state,
                gameState: {...state.gameState, id: action.payload.data}
            }
        case `${userActions.START_RANKED}${userActions.FULFILLED}`:
            return {
                ...state,
                gameState: {...state.gameState, id: action.payload.data}
            }
        case `${userActions.TIME_STAMP}`:
            return {
                ...state,
                gameState: { ...state.gameState, time: state.gameState.time + action.payload }
            }
        case `${userActions.GET_STATS}${userActions.FULFILLED}`:
            return {
                ...state,
                summary: action.payload.data
            }
        case userActions.LISTEN_SOCKET: {
            let ws = state.socket;
            ws.listeners.push(action.payload);
            return {
                ...state,
                socket: ws
            }
        }
        case userActions.STOP_LISTEN_SOCKET:
            let id = state.socket.listeners.indexOf(action.payload);
            let ws = state.socket;

            if (id > -1) {
                ws.listeners.splice(id, 1);
            }
            return {
                ...state,
                socket: ws
            }
        case userActions.START_TIMER:
            if (state.timer)
                clearInterval(state.timer)
            return {
                ...state,
                timer: action.payload
            }
        case userActions.STOP_TIMER:
            if (state.timer)
                clearInterval(state.timer)
            return {
                ...state
            }
        case userActions.GAME_TYPE:
            return {
                ...state,
                gameType: action.payload
            }
        case SET_NICK: {
            let reds = state.gameState.redTeamNicks.slice()
            let blues = state.gameState.blueTeamNicks.slice()

            if(action.payload.color === 'blue')
                blues[action.payload.index] = action.payload.value
            else
                reds[action.payload.index] = action.payload.value
            return {
                ...state,
                gameState: {...state.gameState, blueTeamNicks: blues, redTeamNicks: reds}
            }
        }
        case userActions.SET_ID: {
            let newState = {...state};
            setId(newState.gameState, action.payload.color, action.payload.index, action.payload.value)
            return newState
        }
        case `${userActions.GET_IDS}${userActions.FULFILLED}`:
            return {
                ...state,
                gameState: {...state.gameState, blueTeamIds: action.payload.data.blueTeamIds, redTeamIds: action.payload.data.redTeamIds}
            }
        case userActions.ADD_USER: {
            let reds = state.gameState.redTeamNicks.slice()
            let blues = state.gameState.blueTeamNicks.slice();
            (action.payload === 'blue')
            ? blues.push("")
            : reds.push("")
            return {
                ...state,
                gameState: {...state.gameState, blueTeamNicks: blues, redTeamNicks: reds}
            }
        }
        default:
            return state
    }
}