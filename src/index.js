import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import App from './app';
import GameComponent from './layout/gameComponent'

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, logger , promiseMiddleware())
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/game" component={GameComponent}/>
                <Route path="/" component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
