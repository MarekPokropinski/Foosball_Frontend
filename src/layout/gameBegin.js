import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Config from '../config';

const ip = Config.ip;

class GameBegin extends Component {
    startGameAction() {
        switch (this.props.user.gameType) {
            case 'normal':
                return this.props.actions.startGame(ip);
            case 'ranked':
                return this.props.actions.startRankedGame(ip);
            default:
                return this.props.actions.startGame(ip);
        }
    }

    waitAndStart() {
        setTimeout(() => {
            this.props.history.replace("/game")
        }, 1000);
    }

    startGame() {
        this.startGameAction().then(() =>
            this.waitAndStart()
        );
    }

    connect() {
        this.props.actions.connect('ws://' + ip + ':8080/matchInfo', (e) => {
            this.startGame();
        }, (e) => {
            this.props.actions.socketEvent(e.data);
        })
    }

    componentDidMount() {
        if (!this.props.user.socket)
            this.connect();
        else {
            this.startGame();
        }

    }

    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <h1>Let The game begin!</h1>
                <CircularProgress size={50} color="secondary" />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBegin);