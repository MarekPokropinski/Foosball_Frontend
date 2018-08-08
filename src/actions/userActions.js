import axios from 'axios';

export const CONNECT_WS = 'connect_ws';
export const SOCKET_EVENT = 'socket_event';
export const START_GAME = 'start_game';


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
    socket.onmessage = onMessage;
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