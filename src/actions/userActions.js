import axios from 'axios';
export const FULFILLED = '_FULFILLED';
export const REJECTED = '_REJECTED';
export const PENDING = '_PENDING';

export const CONNECT_WS = 'connect_ws';
export const GET_STATS = 'get_stats';
export const GET_STATUS = 'get_status';
export const LISTEN_SOCKET = 'listen_socket';
export const STOP_LISTEN_SOCKET = 'stop_listen_socket';
export const START_TIMER = 'start_timer';
export const STOP_TIMER = 'stop_timer';
export const GAME_TYPE = 'game_type';
export const START_RANKED = 'start_ranked'
export const ADD_USER = 'add_user';
export const SET_NICK = 'set_nick';
export const GET_IDS = 'get_ids';

export const connect = (endpoint, onOpen, onMessage, onError) => {
    let socket = new WebSocket(endpoint);
    socket.onopen = onOpen;
    socket.listeners = [];
    socket.onmessage = (e) => { onMessage(e); socket.listeners.map((v) => v.onMessage(e)) };
    socket.onerror = onError;
    return {
        type: CONNECT_WS,
        payload: socket
    }
}

export const getStats = (id, gameType) => {
    return {
        type: GET_STATS,
        payload: axios.get(`${process.env.REACT_APP_HOST}/${gameType}Game/finish?gameId=${id}`)
    }
}

export const getStatus = () => {
    return {
        type: GET_STATUS,
        payload: axios.post(`${process.env.REACT_APP_HOST}/status/serverStatus`)
    }
}

export const listenToSocket = (listener) => {
    return {
        type: LISTEN_SOCKET,
        payload: listener
    }
}

export const stopListeningToSocket = (listener) => {
    return {
        type: STOP_LISTEN_SOCKET,
        payload: listener
    }
}

export const startTimer = (interval, method) => {
    return {
        type: START_TIMER,
        payload: setInterval(() => method(), interval)
    }
}

export const stopTimer = () => {
    return {
        type: STOP_TIMER,
        payload: null
    }
}

export const SET_ID = 'set_id'

export const setId = () => {
    return {
        type: STOP_TIMER,
        payload: null
    }
}

export const SET_FOCUS = 'set_focus'

export const setFocus = (flag) => {
    return {
        type: SET_FOCUS,
        payload: flag
    }
}

export const SET_PENDING = 'set_pending'

export const setPending = (flag) => {
    return {
        type: SET_PENDING,
        payload: flag
    }
}