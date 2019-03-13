import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import loginReducer from './reducers/login.jsx';
import thunk from 'redux-thunk';

export const reduxStore = (initialState) => {
    const defaultSiteConfig = {...initialState.siteConfig };
    const siteConfigReducer = (state = defaultSiteConfig, action) => {
        switch (action.type) {
            default: return state;
        }
    };

    let store = createStore(combineReducers({
        siteConfig: siteConfigReducer,
        login: loginReducer,
    }), initialState,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    return store;
};
