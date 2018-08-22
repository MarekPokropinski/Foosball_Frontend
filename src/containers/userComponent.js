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
            .then((response) => {this.setState({valid: true}); this.props.gameActions.setId(this.props.color, this.props.id, response.value.data)})
            .catch((error) =>  this.setState({valid: false}) )
    }

    render() {
        let ids = (this.props.color === 'blue')
            ? this.props.game.blueTeamNicks
            : this.props.game.redTeamNicks
        return (
            <div>
                <form onSubmit={() => this.handleUserChange()} onBlur={() => this.handleUserChange()}>
                    <input className={this.state.valid ? 'valid' : 'invalid'} value={ids[this.props.id]} onChange={(e) => { this.props.gameActions.setNick(this.props.color, this.props.id, e.target.value) }}></input>
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