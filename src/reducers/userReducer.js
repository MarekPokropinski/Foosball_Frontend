import {LISTEN_SOCKET, CONNECT_WS, STOP_LISTEN_SOCKET, START_TIMER, STOP_TIMER} from '../actions/userActions.js';

const userInit = {
    socket: null,
    socketListeners: [],
    timer: null, 
}

export default (state = userInit, action) => {

    switch (action.type) {
        case CONNECT_WS:
            return {
                ...state,
                socket: action.payload
            }
        case LISTEN_SOCKET: {
            let ws = state.socket;
            ws.listeners.push(action.payload);
            return {
                ...state,
                socket: ws
            }
        }
        case STOP_LISTEN_SOCKET: {
            let id = state.socket.listeners.indexOf(action.payload);
            let ws = state.socket;

            if (id > -1) {
                ws.listeners.splice(id, 1);
            }
            return {
                ...state,
                socket: ws
            }
        }
        case START_TIMER:
            if (state.timer)
                clearInterval(state.timer)
            return {
                ...state,
                timer: action.payload
            }
        case STOP_TIMER:
            if (state.timer)
                clearInterval(state.timer)
            return {
                ...state
            }
        default:
            return state
    }
}