import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import { getNick } from "../reducers/userReducer.js";

import '../styles/form.css'


class UserComponent extends React.Component {

    state = {
        valid: true
    }

    handleUserChange = () => {
        this.props.actions.getUser(getNick(this.props.user.gameState, this.props.color, this.props.id))
            .then((response) => {this.setState({valid: true}); this.props.actions.setId(this.props.color, this.props.id, response.value.data)})
            .catch((error) =>  this.setState({valid: false}) )
    }

    render() {
        let ids = (this.props.color === 'blue')
            ? this.props.user.gameState.blueTeamNicks
            : this.props.user.gameState.redTeamNicks
        return (
            <div>
                <form onSubmit={() => this.handleUserChange()} onBlur={() => this.handleUserChange()}>
                    <input className={this.state.valid ? 'valid' : 'invalid'} value={ids[this.props.id]} onChange={(e) => { this.props.actions.setNick(this.props.color, this.props.id, e.target.value) }}></input>
                </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);