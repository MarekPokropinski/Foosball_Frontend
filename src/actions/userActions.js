import axios from 'axios';

export const CONNECT_WS = 'connect_ws';
export const SOCKET_EVENT = 'socket_event';
export const START_GAME = 'start_game';
export const TIME_STAMP = 'time_stamp';
export const GET_STATS = 'get_stats';
export const INC_SCORE = 'inc_score';
export const DEC_SCORE = 'dec_score';

export const LISTEN_SOCKET = 'listen_socket';
export const STOP_LISTEN_SOCKET = 'stop_listen_socket';
export const START_TIMER = 'start_timer';
export const STOP_TIMER = 'stop_timer';
export const GAME_TYPE = 'game_type';
export const START_RANKED = 'start_ranked'
export const ADD_USER = 'add_user';
export const SET_NICK = 'set_nick';
export const GET_IDS = 'get_ids';

export const FULFILLED = '_FULFILLED';
export const REJECTED = '_REJECTED';
export const PENDING = '_PENDING';

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

export const socketEvent = (data) => {
    return {
        type: SOCKET_EVENT,
        payload: JSON.parse(data)
    }
}

export const startGame = (gameType = 'free', redIds, blueIds) => {
    return {
        type: START_GAME,
        payload: axios.get(`${process.env.REACT_APP_HOST}/${gameType}Game/start` + ((gameType === 'free')?"":`?redTeamIds=${redIds}&blueTeamIds=${blueIds}`)) 
    }
}

export const startRankedGame = (redIds, blueIds) => {
    return {
        type: START_RANKED,
        payload: axios.get(`${process.env.REACT_APP_HOST}/rankedGame/start?redTeamIds=${redIds}&blueTeamIds=${blueIds}`)
    }
}

export const timeStamp = (time) => {
    return {
        type: TIME_STAMP,
        payload: time
    }
}

export const getStats = (id, gameType) => {
    return {
        type: GET_STATS,
        payload: axios.get(`${process.env.REACT_APP_HOST}/${gameType}Game/finish?gameId=${id}`)
    }
}

export const incrementScore = (color, id, gameType) => {
    return {
        type: INC_SCORE,
        payload: axios.get(`${process.env.REACT_APP_HOST}/${gameType}Game/goal?team=${color}&gameId=${id}`)
    }
}
export const decrementScore = (color) => {
    return {
        type: INC_SCORE,
        payload: axios.post(`${process.env.REACT_APP_HOST}/revertGoal?team=${color}`)
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

export const setGameType = (type) => {
    return {
        type: GAME_TYPE,
        payload: type
    }
}

export const setNick = (color, index, value) => {
    return {
        type: SET_NICK,
        payload: {color: color, index: index, value: value}
    }
}

export const SET_ID = 'set_id';
export const setId = (color, index, value) => {
    return {
        type: SET_ID,
        payload: {color: color, index: index, value: value}
    }
}

export const getUsersIds = (blues, reds) => {
    return {
        type: GET_IDS,
        payload: axios.get(`${process.env.REACT_APP_HOST}/getUsetsIds?redTeamIds=${reds}&blueTeamIds=${blues}`)
    }
}

export const addUser = (color) => {
    return {
        type: ADD_USER,
        payload: color
    }
}

export const GET_ID = 'get_id';
export const getUser = (nick) => {
    //let nick = (color === 'blue' ? state.gameState.blueTeamNicks : state.gameState.redTeamNicks)[index];
    return {
        type: GET_ID,
        payload: axios.get(`${process.env.REACT_APP_HOST}/getByNick?nick=${nick}`)
    }
}