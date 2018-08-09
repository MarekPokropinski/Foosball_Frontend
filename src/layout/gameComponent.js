import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';

import './gameStyle.css'

//const ip = '192.168.253.159';
const ip = 'localhost'



class GameComponent extends React.Component {

    state = {
        timer: null
    }

    componentDidMount() {
        this.connect();
    }


    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    handleGameFinish() {
        this.props.actions.getStats(ip); //gets stats from server and finishes game
        this.props.history.replace('/summary');
    }
    connect() {
        this.props.actions.connect('ws://' + ip + ':8080/matchInfo', (e) => {
            this.props.actions.startGame(ip);
            this.setState({timer: setInterval(() => this.props.actions.timeStamp(1000), 1000)}) 
        }, (e) => {
            this.props.actions.socketEvent(e.data);
            clearInterval(this.state.timer)
            this.setState({timer: setInterval(() => this.props.actions.timeStamp(1000), 1000)})

            if(this.props.user.gameState.finished) {
                this.handleGameFinish();
            }
        })
    }

    handleExitButton() {
        this.handleGameFinish();
    }

    getConvertedTime() {
        let r = '';
        let time = Math.floor(this.props.user.gameState.gameTime / 1000);
        let seconds = time % 60;
        r = (seconds < 10)? '0' + seconds : seconds;
        time = Math.floor(time / 60);
        
        if( time > 0 ) {
            r = time % 60 + ':' + r; 
            time = Math.floor(time / 60);
        }

        if( time > 0 ) {
            r = time + ':' + r; 
        }

        return r;
    }

    handleRedIncrement() {
        this.props.actions.incrementScore('RED', ip)
    }

    handleBlueIncrement() {
        this.props.actions.incrementScore('BLUE', ip)
    }

    showNicks() {
        return this.props.user.gameState.nicks.map((val, index) => {
            return (
                <p key={index}>{val}</p>
            );
        });
    }

    render() {
        let nicks = "";
        if(this.props.user.gameType.type !== 'normal')
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
                    <p onClick={() => {this.handleRedIncrement()}}>{this.props.user.gameState.redScore}</p>
                    <p>&nbsp;:&nbsp;</p>
                    <p onClick={() => {this.handleBlueIncrement()}}>{this.props.user.gameState.blueScore}</p>   
                </div>
                <Button className='finishButton' variant="outlined" onClick={() => this.handleExitButton()}> Exit game </Button>

            </div>
        );
    }
}
//<p>{this.props.user.gameState.redScore} : {this.props.user.gameState.blueScore}</p>
//this.props.actions.incrementScore('&quot;RED&quot;', ip)

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