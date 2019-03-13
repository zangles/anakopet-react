import React, { Component } from 'react';
import { render } from 'react-dom';
import Layout from './layout'
import { Provider } from 'react-redux';
import Storage from '../util/Storage'
import { reduxStore } from '../reduxStore'

export const reactApp = () => {
    let s = new Storage('app');

    const initialState = window.__PRELOADED_STATE__ || {
        login: {
            ...s.get('data')
        }
    };

    const store = reduxStore(initialState);

    return (
        <Provider store={store}>
            <Layout />
        </Provider>
    );
};

render(reactApp(), document.getElementById('app'));
