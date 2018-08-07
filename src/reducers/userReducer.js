import * as userActions from '../actions/userActions.js';

const FULFILLED = '_FULFILLED';
/*
const REJECTED = '_REJECTED';
const PENDING = '_PENDING';
//*/


const initValue = {
    socket: null,
    gameState: {
        redScore: -1,
        blueScore: -1
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
        default:
            return state
    }
}