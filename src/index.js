import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import './bootstrap-3.3.7-dist/css/bootstrap.min.css'



import Page from './components/home';

ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>,
    document.getElementById('root')
);