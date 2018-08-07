import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class GameBegin extends Component {
    
    componentDidMount() {
        setTimeout(() => {
            this.props.history.replace("/game")
        }, 5000);
    }


    render() {
        return (<div>
            <h1>Let The game begin!</h1>
            <p>game start after 5 sec</p>
        </div>)
    }
}

export default GameBegin;