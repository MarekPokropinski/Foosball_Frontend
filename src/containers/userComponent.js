import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js';
import { getNick } from "../reducers/gameReducer.js";

import '../styles/user.css'
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

class UserComponent extends React.Component {

    state = {
        valid: true,
        willUnmount: false
    }

    render() {
        return (
            <div className='user-container'>
                <div className={(this.props.color === 'blue') ? 'color-bar-blue' : 'color-bar-red'}/>
                <form onFocus={() => this.handleFocus()} onSubmit={() => this.handleUserChange()} onBlur={() => this.handleBlur()}>
                    <TextField
                        InputProps={{style: {fontSize: '0.8em'}}}
                        error={!this.state.valid}
                        id="nick"
                        label="Nick"
                        value={getNick(this.props.game, this.props.color, this.props.id)}
                        onChange={(e) => { this.props.gameActions.setNick(this.props.color, this.props.id, e.target.value) }}
                        margin="normal" />
                    <IconButton color='secondary' style={{ margin: '10px' }} variant='contained' onClick={() => this.props.gameActions.deleteUser(this.props.id, this.props.color)}>
                        <DeleteIcon />
                    </IconButton>
                </form>

            </div>
        );
    }

    componentWillUnmount() {
        this.setState({ willUnmount: true })
    }

    handleUserChange() {
        this.setState({ pending: true })
        this.props.gameActions.getUser(getNick(this.props.game, this.props.color, this.props.id))
            .then((response) => {
                if(!this.state.willUnmount) {
                    this.setState({ valid: true })
                    this.props.gameActions.setNick(this.props.color, this.props.id, response.value.data.nick)
                    this.props.gameActions.setId(this.props.color, this.props.id, response.value.data.id)
                }
            })
            .catch((error) => {
                if(!this.state.willUnmount)
                    this.setState({ valid: false })
            })
    }

    handleFocus() {
        this.props.userActions.setFocus(true)
    }

    handleBlur() {
        this.props.userActions.setFocus(false)
        this.handleUserChange()
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