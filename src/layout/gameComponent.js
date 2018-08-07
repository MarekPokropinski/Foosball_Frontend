import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';


//const ip = '192.168.253.159';
const ip = 'localhost'



class GameComponent extends React.Component {

    componentDidMount() {
        this.connect();
    }
    connect() {
        this.props.actions.connect('ws://' + ip + ':8080/matchInfo', (e) => {
            console.log('Connected');
            this.props.actions.startGame(ip)
        }, (e) => {
            this.props.actions.socketEvent(e.data);
        })
    }

    handleExitButton() {
        this.props.history.replace('/')
    }

    render() {
        return (
            <div style={{textAlign: 'center'}} >
                <br />
                {this.props.user.gameState.redScore} : {this.props.user.gameState.blueScore}<br /><br />
                <Button  variant='contained' color='secondary' onClick={() => this.handleExitButton()}> Exit game </Button>

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