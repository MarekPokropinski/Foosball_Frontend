import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

class GameBegin extends Component {
    
    componentDidMount() {
        setTimeout(() => {
            this.props.history.replace("/game")
        }, 5000);
    }


    render() {
        return (
            <div style={{marginTop:'20%',textAlign:'center'}}>
                <h1>Let The game begin!</h1>
                <CircularProgress  size={50} color="secondary"/>
            </div>
        )
    }
}

export default GameBegin;