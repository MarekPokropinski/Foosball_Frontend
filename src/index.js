import React from 'react';
import ReactDOM from 'react-dom';
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
import Lobby from './layout/lobby';
import GameMode from './layout/gameMode';
import Game1v1 from './layout/game1v1Mode'
import Game2v2 from './layout/game2v2Mode'
import SummaryComponent from './layout/summaryComponent';
import theme from './styles/theme'
import { MuiThemeProvider} from 'material-ui/styles';
import './styles/index.css';
import './images/ncdc2.jpg'


const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, logger, promiseMiddleware())
);
ReactDOM.render(
    <div>
        <MuiThemeProvider theme={theme} >
            <ButtonAppBar />
            <div className="mainContainer">
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/summary" component={SummaryComponent}/>
                            <Route path="/game" component={GameComponent} />
                            <Route path="/begin" component={GameBegin} />
                            <Route path="/mode" component={Lobby}/>
                            <Route path="/" component={App} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        </MuiThemeProvider>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
