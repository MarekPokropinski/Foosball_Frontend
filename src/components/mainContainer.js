import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from '../reducers';
import App from '../containers/app';
import GameComponent from '../containers/gameComponent'
import ButtonAppBar from '../components/navBar';
import GameBegin from '../containers/gameBegin';
import Lobby from '../containers/lobby';
import SummaryComponent from '../containers/summaryComponent';
import theme from '../styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import Error from '../containers/error'
import '../styles/index.css';

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, logger, promiseMiddleware())
);

export default () => {
    return (
        <div className="main-container">
            <MuiThemeProvider theme={theme} >
                <Provider store={store}>
                    <div className="content">
                    <ButtonAppBar />
                    
                        <HashRouter basename="/foosball">
                            <Switch>
                                <Route path="/summary" component={SummaryComponent} />
                                <Route path="/game/:mode" component={GameComponent} />
                                <Route path="/game" component={GameComponent} />
                                <Route path="/begin/:mode" component={GameBegin} />
                                <Route path="/begin" component={GameBegin} />
                                <Route path="/mode/:mode/:reset" component={Lobby} />
                                <Route path="/mode/:mode" component={Lobby} />
                                <Route path="/mode" component={Lobby} />
                                <Route path="/error" component={Error} />
                                <Route path="/" component={App} />
                            </Switch>
                        </HashRouter>

                    </div>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}