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

export const startGame = (gameType = 'free', blueIds, redIds, goalLimit=false, timeLimit=false) => {
    console.log('STATAS', goalLimit, timeLimit);
    return {
        type: START_GAME,
        payload: axios.get(
            `${process.env.REACT_APP_HOST}/${gameType}Game/start` + 
            ((gameType === 'free')?"":`?redTeamUsersID=${redIds}&blueTeamUsersID=${blueIds}`)
            +
            ((gameType === 'normal') ? (
                `&maxGoal=${goalLimit}
                 &maxTimeInSec=${timeLimit*60}` 
            ) : "")
        )
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

export const GET_ID = 'get_id';

export const getUser = (value) => {
    return {
        type: GET_ID,
        // payload: axios.get(`${process.env.REACT_APP_HOST}/getByNick?nick=${nick}`)
        payload: axios.get(`${process.env.REACT_APP_HOST}/getByNickOrId?value=${value}`)
    }
}

export const RESET_GAME = 'reset_game';

export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}