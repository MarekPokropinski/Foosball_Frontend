import axios from 'axios';
export const FULFILLED = '_FULFILLED';

export const UPDATE_GAME = 'update_game'

export const updateGame = (newPlainState) => {
    return {
        type: UPDATE_GAME,
        payload: JSON.parse(newPlainState)
    }
}

export const START_GAME = 'start_game'

export const startGame = (gameType = 'free', redIds, blueIds) => {
    return {
        type: START_GAME,
        payload: axios.get(`${process.env.REACT_APP_HOST}/${gameType}Game/start` + ((gameType === 'free')?"":`redTeamIds=${redIds}&blueTeamIds=${blueIds}`)) 
    }
}

export const START_RANKED = 'start_ranked'

export const startRankedGame = (redIds, blueIds) => {
    return {
        type: START_RANKED,
        payload: axios.get(`${process.env.REACT_APP_HOST}/rankedGame/start?redTeamIds=${redIds}&blueTeamIds=${blueIds}`)
    }
}

export const TIME_STAMP = 'time_stamp'

export const timeStamp = (time) => {
    return {
        type: TIME_STAMP,
        payload: time
    }
}

export const GAME_TYPE = 'game_type'

export const setGameType = (type) => {
    return {
        type: GAME_TYPE,
        payload: type
    }
}

export const INC_SCORE = 'inc_score';

export const incrementScore = (color, id, gameType) => {
    return {
        type: INC_SCORE,
        payload: axios.get(`${process.env.REACT_APP_HOST}/${gameType}Game/goal?team=${color}&gameId=${id}`)
    }
}

export const DEC_SCORE = 'dec_score';

export const decrementScore = (color) => {
    return {
        type: DEC_SCORE,
        payload: axios.post(`${process.env.REACT_APP_HOST}/revertGoal?team=${color}`)
    }
}


export const SET_NICK = 'set_nick';


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
export const ADD_USER = 'add_user';

export const addUser = (color) => {
    return {
        type: ADD_USER,
        payload: color
    }
}

export const DEL_USER = 'del_user';

export const deleteUser = (index, color) => {
    return {
        type: DEL_USER,
        payload: {index: index, color: color}
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

export const RESET_GAME = 'reset_game';

export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}