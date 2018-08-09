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
        redScore: -1,
        blueScore: -1,
        gameTime: 0,
        finished: true
    },
    summary: {
        redScore: -1,
        blueScore: -1,
        gameTime: 0,
        redLongestSeries: 0,
        blueLongestSeries: 0
    },
    gameType: {
        type: 'normal'
    }
}

export default (state = initValue, action) => {
    
    switch(action.type) {
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
        case `${userActions.TIME_STAMP}`:
            return {
                ...state,
                gameState: {...state.gameState, gameTime: state.gameState.gameTime + action.payload}
            }
        case `${userActions.GET_STATS}${FULFILLED}`:
            return {
                ...state,
                summary: action.payload.data
            }
        case userActions.LISTEN_SOCKET:
            let newListeners = state.socket.listeners.slice();
            newListeners.push(action.payload);
            state.socket.listeners = newListeners;
            return {
                ...state
            }
        case userActions.STOP_LISTEN_SOCKET:
            let id = state.socket.listeners.indexOf(action.payload);
            let newArr = state.socket.listeners.slice();
            if (id > -1) {
                newArr.splice(id, 1);
              }
              state.socket.listeners = newArr;
            return {
                ...state
            }
        case userActions.START_TIMER:
            if(state.timer)
                clearInterval(state.timer)
            return {
                ...state,
                timer: action.payload
            }
        case userActions.STOP_TIMER:
            if(state.timer)
                clearInterval(state.timer)
            return {
                ...state
            }
        default:
            return state
    }
}