import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';


class Game1v1Mode extends Component {

    startGame(){
        this.props.history.replace("/begin");
    }

    render() {
        return (<div>
            <h1>Game 1v1</h1>

            <Button variant='contained' color='primary' onClick={() => { this.startGame() }}> Start </Button>

        </div>)
    }
}

export default Game1v1Mode;