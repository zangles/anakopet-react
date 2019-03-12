import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout'

export default class App extends Component {
    render() {
        return (
            <Layout />
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
