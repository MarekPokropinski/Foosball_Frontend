import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js'

class Error extends Component {
    state = {
        timer: null
    }

    render() {
        return (
            <div style={{  }}>
                <h1>Trying to reconnect...</h1>
            </div>
        )
    }

    componentDidMount() {
        //TODO: try to reconnect
    }         
}
const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);