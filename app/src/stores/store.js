import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    account: null,
    nickname: null,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
        case 'CLEAR_ACCOUNT':
            return { ...state, account: null };
        case 'SET_NICKNAME':
            return { ...state, nickname: action.payload };
        default:
            return state;
    }
}

const store = createStore(rootReducer, composeWithDevTools());

export default store;
