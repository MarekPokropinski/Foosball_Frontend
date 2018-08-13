import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import App from './app';
import GameComponent from './layout/gameComponent'
import ButtonAppBar from './layout/navBar';
import GameBegin from './layout/gameBegin';
import Lobby from './layout/lobby';
import SummaryComponent from './layout/summaryComponent';
import theme from './styles/theme';
import { MuiThemeProvider} from 'material-ui/styles';
//import Image from 'material-ui-image'
import './styles/index.css';
import './images/ncdc2.jpg';

//        <img className="backgroundImage" src={require('./images/bg2.pngs')} />

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, logger, promiseMiddleware())
);
ReactDOM.render(
    <div className="mainContainer">
        
        <MuiThemeProvider theme={theme} >        

            <ButtonAppBar />
            <div className="content">
                <Provider store={store}>
                    <HashRouter basename="/foosball">
                        <Switch>
                            <Route path="/summary" component={SummaryComponent}/>
                            <Route path="/game" component={GameComponent} />
                            <Route path="/begin" component={GameBegin} />
                            <Route path="/mode" component={Lobby}/>
                            <Route path="/" component={App} />
                        </Switch>
                    </HashRouter>
                </Provider>
            </div>
            
        </MuiThemeProvider>

    </div>
    , document.getElementById('root'));
