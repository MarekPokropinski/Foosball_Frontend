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
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focus = this.focus.bind(this);
    }
    state = {
        valid: true,
        willUnmount: false,
        text: "",
        focus: false
    }

    focus() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div className='user-container'>
                <div className={(this.props.color === 'blue') ? 'color-bar-blue' : 'color-bar-red'} />
                    <span style={{height: '150px'}} onClick={this.focus}>
                    <TextField
                        onBlur={() => this.handleBlur()}
                        onFocus={() => this.handleFocus()}
                        inputRef={this.textInput}
                        InputProps={{ style: { fontSize: '0.8em' } }}
                        error={!this.state.valid}
                        id="nick"
                        label="Nick"
                        value={this.props.players[this.props.id].nick}
                        onChange={(e) => this.props.playersActions.setUser(this.props.id, this.props.players[this.props.id].id, e.target.value, this.props.color)}
                        margin="normal" />
                    </span>
                <IconButton
                    color='secondary'
                    style={{ margin: '10px' }}
                    variant='contained'
                    disabled={this.props.user.pending || this.state.focus}
                    onClick={() => this.props.playersActions.deleteUser(this.props.id)}>
                    <DeleteIcon />
                </IconButton>

            </div>
        );
    }

    componentWillUnmount() {
        this.setState({ willUnmount: true })
    }

    checkRepeatingNick(text) {
        for (let i = 0; i < this.props.players.length; i++) {
            if (i !== this.props.id && this.props.players[i].nick === text) {
                return true
            }
        }
        return false
    }

    handleUserChange() {
        if (this.props.players[this.props.id].nick === '')
            return
        if (this.checkRepeatingNick(this.props.players[this.props.id].nick)) {
            this.setState({ valid: false })
            this.props.playersActions.setUser(this.props.id, this.props.players[this.props.id].id, '', this.props.color)
            console.error('same nick')
            return
        }

        this.props.userActions.setPending(true)
        this.props.gameActions.getUser(this.props.players[this.props.id].nick)
            .then((response) => {
                if (!this.state.willUnmount) {
                    if (this.checkRepeatingNick(response.value.data.nick))
                        return
                    this.props.playersActions.setUser(this.props.id, response.value.data.id, response.value.data.nick, this.props.color)
                    this.setState({ valid: true })
                    this.props.playersActions.setUser(this.props.id, this.props.players[this.props.id].id, response.value.data.nick, this.props.color)
                    this.props.userActions.setPending(false)
                }
            })
            .catch((error) => {
                if (!this.state.willUnmount) {
                    console.error(error)
                    this.setState({ valid: false })
                    this.props.playersActions.setUser(this.props.id, this.props.players[this.props.id].id, '', this.props.color)
                    this.props.userActions.setPending(false)
                }
            })
    }

    handleFocus() {
        this.props.userActions.setFocus(true)
    }

    handleBlur() {
        this.props.userActions.setFocus(false)
        this.setState({ focus: false })
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