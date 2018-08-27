export const ADD_USER = 'add_user'

export const addUser = (color, nick='') => {
    return {
        type: ADD_USER,
        payload: {color, nick}
    }
}

export const DEL_USER = 'del_user'

export const deleteUser = (index) => {
    return {
        type: DEL_USER,
        payload: index
    }
}

export const SET_USER = 'set_user'

export const setUser = (index, id, nick, color) => {
    return {
        type: SET_USER,
        payload: {index, id, nick, color}
    }
}

export const CLEAR_USER = 'clear_user'

export const clear = () => {
    return {
        type: CLEAR_USER
    }
}

export const getPlayers = (players, color) => {
    let newPlayers = []
    for(let i = 0; i < players.length; i++) {
        if(players[i].color === color) {
            newPlayers.push(players[i])
        }
    }
    return newPlayers
}