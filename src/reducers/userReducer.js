import * as userActions from '../actions/userActions.js';

const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';
const PENDING = '_PENDING';


const initValue = {
    
}

export default (state = initValue, action) => {
    
    switch(action.type) {
        default:
            return {
                ...state,
            }
    }
}