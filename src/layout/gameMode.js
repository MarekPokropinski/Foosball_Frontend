import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';


class GameMode extends Component {

    singleGameMode(){
        this.props.history.replace("/1v1")
    }

    multiGameMode(){
        this.props.history.replace("/2v2")
    }

    restartHanlder(){
        this.props.history.replace("/")
    }
    render() {
        let style={ padding:'10px',
                    margin:'20px'}
        return (
            <div>
                <h1> Game choose mode screen! </h1>

                <Button style={style} variant='contained' color='primary' onClick={() => {this.singleGameMode() }}> 1 vs 1</Button>
                <Button style={style} variant='contained' color='primary' onClick={() => {this.multiGameMode() }} > 2 vs 2</Button>
                <Button style={style} variant='contained' color='primary' onClick={() => {this.restartHanlder() }} > Restart </Button>

            </div>

        )
    }
}

export default GameMode;