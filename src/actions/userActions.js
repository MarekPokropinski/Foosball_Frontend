
export const CONNECT_WS = 'connect_ws';
export const SOCKET_EVENT = 'socket_event';

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
    socket.onOpen = onOpen;
    socket.onMessage = onMessage;
    return {
        type: CONNECT_WS,
        payload: socket
    }
}

export const socketEvent = (data) => {
    return {
        type: SOCKET_EVENT,
        payload: data
    }
}