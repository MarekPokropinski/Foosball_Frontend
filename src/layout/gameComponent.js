import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';

const ip = '127.0.0.1';



class GameComponent extends React.Component {

    connect() {
        this.props.actions.connect('ws://' + ip + ':8080/matchInfo', (e) => {

        }, (e) => {
            this.actions.socketEvent(e.data);
        })
    }

    handleExitButton() {
        this.props.history.replace('/')
    }

    render() {
        return (
            <div style={{textAlign: 'center'}} >
                10:00<br />
                {this.props.user.gameState.redScore} : {this.props.user.gameState.blueScore}<br />
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


export default connect(mapDispatchToProps, mapStateToProps)(GameComponent);