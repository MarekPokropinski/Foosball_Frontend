import axios from 'axios';

export const CONNECT_WS = 'connect_ws';
export const SOCKET_EVENT = 'socket_event';
export const START_GAME = 'start_game';
export const TIME_STAMP = 'time_stamp';
export const GET_STATS = 'get_stats';
export const INC_SCORE = 'inc_score';
export const LISTEN_SOCKET = 'listen_socket';
export const STOP_LISTEN_SOCKET = 'stop_listen_socket';
export const START_TIMER = 'start_timer';
export const STOP_TIMER = 'stop_timer';

/*
export const testAction = () => {
    return {
        type: 'test_action',
        payload: "Hello world!"
    }
}
//*/

export const connect = (endpoint, onOpen, onMessage) => {
    let socket = new WebSocket(endpoint);
    socket.onopen = onOpen;
    socket.listeners = [];
    socket.onmessage = (e) => {onMessage(e);  socket.listeners.map((v) => v.onMessage(e))};
    return {
        type: CONNECT_WS,
        payload: socket
    }
}

export const socketEvent = (data) => {
    return {
        type: SOCKET_EVENT,
        payload: JSON.parse(data)
    }
}

export const startGame = (ip) => {
    return {
        type: START_GAME,
        payload: axios.get(`http://${ip}:8080/normalGame/start`)
    }
}

export const timeStamp = (time) => {
    return {
        type: TIME_STAMP,
        payload: time
    }
}

export const getStats = (ip) => {
    return {
        type: GET_STATS,
        payload: axios.get(`http://${ip}:8080/normalGame/finish`)
    }
}

export const incrementScore = (color, ip) => {
    return {
        type: INC_SCORE,
        payload: axios.post(`http://${ip}:8080/normalGame/goal`, `"${color}"`,  {headers: {'Content-Type': 'application/json'}})
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