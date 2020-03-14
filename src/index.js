import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Root />, document.getElementById('root'));

ReactDOM.render(<BrowserRouter><Root /></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
