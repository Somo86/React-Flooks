import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, store } from './store';
import './index.css';
import App from './App';


ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('root'));
