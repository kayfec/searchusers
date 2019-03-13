import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './error'


ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
    , document.getElementById('root')
);

