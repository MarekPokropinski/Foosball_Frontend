import * as userActions from '../actions/userActions.js';
const FULFILLED = '_FULFILLED';
/*
const REJECTED = '_REJECTED';
const PENDING = '_PENDING';
//*/

const initValue = {
    socket: null,
    socketListeners: [],
    timer: null,
    gameState: {
        redScore: 0,
        blueScore: 0,
        gameTime: 0,
        finished: true,
        blueTeamIds: [],
        redTeamIds: [],
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
                gameState: action.payload
            }
        case `${userActions.START_GAME}${FULFILLED}`:
            return {
                ...state,
                gameState: action.payload.data
            }
        case `${userActions.START_RANKED}${FULFILLED}`:
            return {
                ...state,
                gameState: action.payload.data
            }
        case `${userActions.TIME_STAMP}`:
            return {
                ...state,
                gameState: { ...state.gameState, gameTime: state.gameState.gameTime + action.payload }
            }
        case `${userActions.GET_STATS}${FULFILLED}`:
            return {
                ...state,
                summary: action.payload.data
            }
        case userActions.LISTEN_SOCKET:
            var ws = state.socket;
            ws.listeners.push(action.payload);
            return {
                ...state,
                socket: ws
            }
        case userActions.STOP_LISTEN_SOCKET:
            let id = state.socket.listeners.indexOf(action.payload);
            var ws = state.socket;

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
        default:
            return state
    }
}