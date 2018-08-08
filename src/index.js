import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import App from './app';
import GameComponent from './layout/gameComponent'
import ButtonAppBar from './layout/navBar';
import GameBegin from './layout/gameBegin';
import GameMode from './layout/gameMode';
import Game1v1 from './layout/game1v1Mode'
import Game2v2 from './layout/game2v2Mode'
import theme from './styles/theme'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import styled from 'styled-components';
import './styles/index.css';

const divStyle = {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
}

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, logger, promiseMiddleware())
);
ReactDOM.render(
    <div >
        <MuiThemeProvider theme={theme} >
            <ButtonAppBar />
            <div className="mainContainer">
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/game" component={GameComponent} />
                            <Route path="/begin" component={GameBegin} />
                            <Route path="/1v1" component={Game1v1} />
                            <Route path="/2v2" component={Game2v2} />
                            <Route path="/mode" component={GameMode} />
                            <Route path="/" component={App} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        </MuiThemeProvider>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
