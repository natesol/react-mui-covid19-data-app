import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';

import './styles/reset.css';
import './styles/globals.css';
import './styles/themes.css';


ReactDOM.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
    <App />,
    document.getElementById('app')
);