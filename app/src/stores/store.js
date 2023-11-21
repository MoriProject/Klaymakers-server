import { createStore } from 'redux';

const initialState = {
    account: null,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
        case 'CLEAR_ACCOUNT':
            return { ...state, account: null };
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;
