import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js';
import * as playersActions from '../actions/playersActions'

import '../styles/user.css'
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

class UserComponent extends React.Component {

    state = {
        valid: true,
        willUnmount: false,
        text: ""
    }

    render() {
        return (
            <div className='user-container'>
                <div className={(this.props.color === 'blue') ? 'color-bar-blue' : 'color-bar-red'} />
                <form onFocus={() => this.handleFocus()} onSubmit={() => this.handleUserChange()} onBlur={() => this.handleBlur()}>
                    <TextField
                        InputProps={{ style: { fontSize: '0.8em' } }}
                        error={!this.state.valid}
                        id="nick"
                        label="Nick"
                        value={this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                        margin="normal" />
                    <IconButton color='secondary' style={{ margin: '10px' }} variant='contained' onClick={() => this.props.playersActions.deleteUser(this.props.id)}>
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
        for (let i = 0; i < this.props.players.length; i++) {
            if (i !== this.props.id && this.props.players[i].nick === this.state.text) {
                this.setState({ valid: false })
                console.error('same nick')
                return
            }
        }
        this.setState({ pending: true })
        this.props.gameActions.getUser(this.state.text)
            .then((response) => {
                if (!this.state.willUnmount) {
                    this.setState({ valid: true })
                    this.props.playersActions.setUser(this.props.id, response.value.data.id, response.value.data.nick, this.props.color)
                }
            })
            .catch((error) => {
                if (!this.state.willUnmount) {
                    this.setState({ valid: false })
                    console.error(error)
                }
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
        playersActions: bindActionCreators(playersActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
        players: state.players
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);