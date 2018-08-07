import * as userActions from '../actions/userActions.js';

/*For axios
const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';
const PENDING = '_PENDING';
//*/


const initValue = {
    socket: null,
    gameState: {
        redScore: 0,
        blueScore: 0
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
        default:
            return {
                ...state,
            }
    }
}