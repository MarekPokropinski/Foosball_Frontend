import {
    LISTEN_SOCKET, CONNECT_WS, STOP_LISTEN_SOCKET, START_TIMER,
    STOP_TIMER, GET_STATUS, SET_FOCUS, SET_PENDING, REJECTED,
    GET_LEADERBOARD, GET_HISTORY, PUT_RULES_TO_STORE} 
from '../actions/userActions.js';
import { FULFILLED } from '../../node_modules/redux-promise-middleware';

const userInit = {
    socket: null,
    socketListeners: [],
    timer: null, 
    isFocused: false,
    id: undefined,
    validated: false,
    leaderboard: null,
    pending: false,
    rules:{    
        goalLimit: 10,
        timeLimit: 10, 
    },
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
        case PUT_RULES_TO_STORE: {
            return {
                ...state,
                rules: action.payload
            }
        }
        case GET_LEADERBOARD + '_FULFILLED': {
            return {
                ...state,
                leaderboard: action.payload.data
            }
        }
        case GET_HISTORY + '_FULFILLED': {
            return {
                ...state,
                history: action.payload.data
            }
        }
        case GET_STATUS+FULFILLED: {
            return {
                ...state,
                status: '0'
            }
        }
        case GET_STATUS+REJECTED: {
            return {
                ...state,
                status: '-1'
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
        case SET_FOCUS: {
            return {
                ...state,
                isFocused: action.payload
            }
        }
        case SET_PENDING: {
            return {
                ...state,
                pending: action.payload
            }
        }
        default:
            return state
    }
}