import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';
import Time from '../time';

import '../styles/gameStyle.css'

class GameComponent extends React.Component {
   componentDidMount() {
        if(!this.props.user.socket) {
            this.props.history.replace(`/begin/${this.props.match.params.mode}`)
        } else {
            this.props.actions.startTimer(1000, () => this.props.actions.timeStamp(1000))
            this.props.actions.listenToSocket(this)
        }
    }

    onMessage(e) {
        if (this.props.user.gameState.finished) {
            this.handleGameFinish()
        }
    }

    waitAndShowSummary() {
        setTimeout(() => {
            this.props.history.replace("/summary")
        }, 500);
    }

    handleGameFinish() {
        this.props.actions.stopTimer()
        this.props.actions.stopListeningToSocket(this)
        console.log(this.props.user.gameState.id)
        this.props.actions.getStats(this.props.user.gameState.id).then(() => this.waitAndShowSummary()); //gets stats from server and finishes game
    }

    handleExitButton() {
        this.handleGameFinish();
    }

    getConvertedTime() {
        var time = new Time(this.props.user.gameState.time);
        return time.getConverted();
    }

    handleRedIncrement() {
        this.props.actions.incrementScore('RED', this.props.user.gameState.id)
    }

    handleBlueIncrement() {
        this.props.actions.incrementScore('BLUE', this.props.user.gameState.id)
    }

    showNicks() {
        return (
            <div className='nicks'>
                <div className='flex'>
                {this.props.user.gameState.blueTeamIds.map((val, index) => {
                    return (
                        <p key={index}>{val}&nbsp;&nbsp;&nbsp;</p>
                    );
                })}
                </div>
                <div className='flex'>
                {this.props.user.gameState.redTeamIds.map((val, index) => {
                    return (
                        <p key={index}>{val}&nbsp;&nbsp;&nbsp;</p>
                    );
                })}
                </div>
            </div>
        );
    }

    render() {
        let nicks = "";
        if (this.props.user.gameType !== 'free')
            nicks = this.showNicks();

        return (
            <div className='container'>
                <div className='timer'>
                    {this.getConvertedTime()}
                </div>

                <div >
                    {nicks}
                </div>

                <div className='score'>
                    <p className='redScore' onClick={() => { this.handleRedIncrement() }}>{this.props.user.gameState.redScore}</p>
                    <p>:</p>
                    <p className='blueScore' onClick={() => { this.handleBlueIncrement() }}>{this.props.user.gameState.blueScore}</p>
                </div>
                <Button className='finishButton' variant="outlined" onClick={() => this.handleExitButton()}> Exit game </Button>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);