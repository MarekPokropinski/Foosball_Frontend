import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js';
import Button from '@material-ui/core/Button';
import Time from '../time.js';
import Score from '../components/score.js';
import '../styles/gameStyle.css'

class GameComponent extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='timer'>
                    {this.getConvertedTime()}
                </div>
                <div >
                    {(this.props.match.params.mode === 'free') ? "" : this.showNicks()}
                </div>
                <div className='score'>
                    <Score
                        value={this.props.game.redScore}
                        className='red-score unselectable '
                        onClick={() => { this.handleScoreIncrement('RED') }}
                        onHold={() => this.handleScoreDecrement('RED')}
                        delay={1000} />
                    <p>:</p>
                    <Score
                        value={this.props.game.blueScore}
                        className='blue-score unselectable'
                        onClick={() => { this.handleScoreIncrement('BLUE') }}
                        onHold={() => this.handleScoreDecrement('BLUE')}
                        delay={1000} />
                </div>
                <Button className='finishButton' variant="contained" onClick={() => this.handleExitButton()}> Exit game </Button>
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.user.socket) {
            this.props.history.replace(`/begin/${this.props.match.params.mode}`)
        } else {
            this.props.userActions.startTimer(1000, () => this.props.gameActions.timeStamp(1000))
            this.props.userActions.listenToSocket(this)
        }
    }

    onMessage(e) {
        if (this.props.game.finished) {
            this.handleGameFinish()
        }
    }

    waitAndShowSummary() {
        setTimeout(() => this.props.history.replace("/summary"), 300);
    }

    handleGameFinish() {
        this.props.userActions.stopTimer()
        this.props.userActions.stopListeningToSocket(this)
        //gets statistics from server and tells server that game is finished
        this.props.userActions.getStats(this.props.game.id, this.props.match.params.mode).then(() => this.waitAndShowSummary());
    }

    handleExitButton() {
        this.handleGameFinish();
    }

    getConvertedTime() {
        var time = new Time(this.props.game.time);
        return time.getConverted();
    }

    handleScoreIncrement(team) {
        this.props.gameActions.incrementScore(team, this.props.game.id, this.props.match.params.mode);
    }
    handleScoreDecrement(team) {
        this.props.gameActions.decrementScore(team);
    }

    showNicks() {
        return (
            <div className='nicks'>
                <div className='flex'>
                    {this.props.user.gameState.blueTeamIds.map((val, index) => {
                        return (
                            <p style={{ marginRight: '10px' }} key={index}>{val}</p>
                        );
                    })}
                </div>
                <div className='flex'>
                    {this.props.user.gameState.redTeamIds.map((val, index) => {
                        return (
                            <p style={{ marginRight: '10px' }} key={index}>{val}</p>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);