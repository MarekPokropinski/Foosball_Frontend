import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';
import Config from '../config';
import Time from '../time';

import '../styles/gameStyle.css'

const ip = Config.ip;

class GameComponent extends React.Component {
    componentDidMount() {
        this.props.actions.startTimer(1000, () => this.props.actions.timeStamp(1000))
        this.props.actions.listenToSocket(this)
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
        this.props.actions.getStats(ip).then(() => this.waitAndShowSummary()); //gets stats from server and finishes game
    }

    handleExitButton() {
        this.handleGameFinish();
    }

    getConvertedTime() {
        var time = new Time(this.props.user.gameState.time);
        return time.getConverted();
    }

    handleRedIncrement() {
        console.log( this.props.user.gameState)
        this.props.actions.incrementScore('RED', this.props.user.gameState.id, ip)
    }

    handleBlueIncrement() {
        this.props.actions.incrementScore('BLUE', this.props.user.gameState.id, ip)
    }

    showNicks() {
        return (
            <div>
                {console.log(this.props.user)}
                {this.props.user.gameState.blueTeamIds.map((val, index) => {
                    return (
                        <p key={index}>{val}</p>
                    );
                })}
                {this.props.user.gameState.redTeamIds.map((val, index) => {
                    return (
                        <p key={index}>{val}</p>
                    );
                })}
            </div>
        );
    }

    render() {
        let nicks = "";
        if (this.props.user.gameType !== 'normal')
            nicks = this.showNicks();

        return (
            <div className='container'>
                <div className='timer'>
                    {this.getConvertedTime()}
                </div>

                <div className='nicks'>
                    {nicks}
                </div>

                <div className='score'>
                    <p onClick={() => { this.handleRedIncrement() }}>{this.props.user.gameState.redScore}</p>
                    <p>&nbsp;:&nbsp;</p>
                    <p onClick={() => { this.handleBlueIncrement() }}>{this.props.user.gameState.blueScore}</p>
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