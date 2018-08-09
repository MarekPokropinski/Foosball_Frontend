import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';

import './gameStyle.css'

//const ip = '192.168.253.159';
const ip = 'localhost'



class GameComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    

    componentDidMount() {

        if(!this.props.user.socket)
            this.connect();
        else
            this.props.actions.startGame(ip); 
        

        this.props.actions.startTimer(1000, () => this.props.actions.timeStamp(1000))
        //this.setState({timer: setInterval(, 1000)}) 
        this.props.actions.listenToSocket(this)
        
    }

    onMessage(e) {
        console.log('on message')
        console.log(this.props.user.gameState.finished)
        if(this.props.user.gameState.finished) {
            this.handleGameFinish()
        }
    }



    handleGameFinish() {
        this.props.actions.stopTimer()
        this.props.actions.stopListeningToSocket(this)
        this.props.actions.getStats(ip).then(() => this.props.history.replace('/summary')); //gets stats from server and finishes game
    }
    connect() {
        this.props.actions.connect('ws://' + ip + ':8080/matchInfo', (e) => {
            this.props.actions.startGame(ip); 
        }, (e) => {
            console.log(this.props.user.socket);
            this.props.actions.socketEvent(e.data);            
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