import * as userActions from '../actions/userActions.js';

/*For axios
const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';
const PENDING = '_PENDING';
//*/


const initValue = {
    socket: null,
    eventQueue: []
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
                eventQueue: [...state.eventQueue, action]
            }
        default:
            return {
                ...state,
            }
    }
}