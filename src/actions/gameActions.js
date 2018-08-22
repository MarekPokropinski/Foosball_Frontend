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