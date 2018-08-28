import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js'
import * as playersActions from '../actions/playersActions.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class GameBegin extends Component {
    state = {
        timer: null
    }

    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <h1>Let the game begin!</h1>
                <CircularProgress size={50} color="secondary" />
                <br /><br />
                <Button variant='contained' color='secondary' onClick={() => this.handleCancelButton()}> Cancel </Button>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.game.gameType === 'invalid') {
            this.props.history.replace('/');
        } else {
            if (!this.props.user.socket)
                this.connect();
            else {
                this.startGame();
            }
        }
    }

    startGameAction() {
        console.log(playersActions.getPlayers(this.props.players, 'blue'))
        if (this.props.match.params.mode === 'free') {
            return this.props.gameActions.startGame(this.props.match.params.mode);
        }
        return this.props.gameActions.startGame(this.props.match.params.mode, playersActions.getPlayers(this.props.players, 'blue').map((val) => val.id),
            playersActions.getPlayers(this.props.players, 'red').map((val) => val.id));
    }

    waitAndStart() {
        this.setState({
            timer:
                setTimeout(() => {
                    this.props.history.replace(`/game/${this.props.match.params.mode}`)
                }, 1000)
        })
    }

    startGame() {
        this.startGameAction().then(() =>
            this.waitAndStart()
        );
    }

    connect() {
        this.props.userActions.connect(`${process.env.REACT_APP_HOST_SOCKET}/matchInfo`, (e) => {
            this.startGame();
        }, (e) => {
            this.props.gameActions.updateGame(e.data);
        }, (e) => {
            console.log("Websocket error!");
            this.props.history.replace('/');
        })
    }

    handleCancelButton() {
        this.setState({ timer: clearTimeout(this.state.timer) });
        this.props.history.replace('/');
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
        playersActions: bindActionCreators(playersActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
        players: state.players
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameBegin);