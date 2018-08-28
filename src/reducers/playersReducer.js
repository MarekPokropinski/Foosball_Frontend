import {ADD_USER, DEL_USER, SET_USER, CLEAR_USER, SET_ALL_USERS} from '../actions/playersActions'

const playersInit = [
    {id: undefined, nick: "", color: 'blue'},
    {id: undefined, nick: "", color: 'blue'},
    {id: undefined, nick: "", color: 'red'},
    {id: undefined, nick: "", color: 'red'},
]

export default (state = playersInit, action) => {
    switch(action.type) {
        case ADD_USER: return addUser(state, action.payload)
        case DEL_USER: return delUser(state, action.payload)
        case SET_USER: return setUser(state, action.payload)
        case SET_ALL_USERS: return(action.payload)
        case CLEAR_USER: return playersInit;
        default: return state
    }
}

const addUser = (state, payload) => {
    if(!userMax(state, payload.color)) {
        return [...state, {id: undefined, nick: payload.nick, color: payload.color}]
    }
    return state
}

const delUser = (state, index) => {
    let blueCount = 0
    let redCount = 0 
    let newState = [];
    for(let s = 0; s < state.length; s++) { 
        if(s !== index) {
            newState.push(state[s])
        }
    }
    for(let s = 0; s < newState.length; s++) {
        if(newState[s].color === 'blue')
            blueCount++
        else
            redCount++
    }

    if(blueCount <= 0) {
        newState.push({id: undefined, nick: "", color: 'blue'})
    }
    if(redCount <= 0) {
        newState.push({id: undefined, nick: "", color: 'red'})
    }
    return newState

}
const setUser = (state, {index, id, nick, color}) => {
    let newState = state.slice();
    newState[index] = {id, nick, color};
    return newState;
}
const userMax = (players, color) => {
    let count = 0;
    for(let i in players) {
        if(i.color === color) {
            count++
        }
    }
    return (count >= 2)
}