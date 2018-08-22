import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js';
import { getNick } from "../reducers/gameReducer.js";

import '../styles/form.css'


class UserComponent extends React.Component {

    state = {
        valid: true
    }

    handleUserChange = () => {
        this.props.gameActions.getUser(getNick(this.props.game, this.props.color, this.props.id))
            .then((response) => { this.setState({ valid: true }); this.props.gameActions.setId(this.props.color, this.props.id, response.value.data) })
            .catch((error) => this.setState({ valid: false }))
    }

    render() {
        return (
            <div style={{height: '100px', backgroundColor: (this.props.color === 'blue') ? 'rgba(0, 0, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)'}}>
                <form onSubmit={() => this.handleUserChange()} onBlur={() => this.handleUserChange()}>
                    <input
                        className={this.state.valid ? 'valid' : 'invalid'}
                        value={getNick(this.props.game, this.props.color, this.props.id)}
                        onChange={(e) => { this.props.gameActions.setNick(this.props.color, this.props.id, e.target.value) }}></input>
                </form>
            </div>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);