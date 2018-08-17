import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';


class GameBegin extends Component {

    state = {
        timer: null
    }

    startGameAction() {
        switch (this.props.match.params.mode) {
            case 'free':
                return this.props.actions.startGame(this.props.match.params.mode);
            default:
                return this.props.actions.startGame(this.props.match.params.mode, this.props.user.gameState.blueTeamIds, this.props.user.gameState.redTeamIds);
        }
    }


    waitAndStart() {
        this.setState({timer:
        setTimeout(() => {
            this.props.history.replace(`/game/${this.props.match.params.mode}`)
        }, 1000)})
    }

    startGame() {
        this.startGameAction().then(() =>
            this.waitAndStart()
        );
    }

    connect() {
        this.props.actions.connect(`${process.env.REACT_APP_HOST_SOCKET}/matchInfo`, (e) => {
            this.startGame();
        }, (e) => {
            this.props.actions.socketEvent(e.data);
        }, (e) => {
            console.log("Websocket error!");
            this.props.history.replace('/');
        })
    }

    componentDidMount() {
        if (!this.props.user.socket)
            this.connect();
        else {
            this.startGame();
        }

    }

    handleCancelButton() {
        this.setState({timer: clearTimeout(this.state.timer)});
        this.props.history.replace('/');
    }

    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <h1>Let the game begin !!</h1>
                <CircularProgress size={50} color="secondary" />
                <br /><br />
                <Button variant='contained' color='secondary' onClick={() => this.handleCancelButton()}> Cancel </Button>
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