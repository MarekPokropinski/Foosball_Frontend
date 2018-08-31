import React from 'react'
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { InputAdornment } from 'material-ui';
import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions.js';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';

class StatisticsForm extends React.Component {
    state = {
        value: "",
        listener: undefined
    }

    componentDidMount() {
        this.setState({
            listener:
                document.addEventListener("keyup", (e) => {
                    if (e.keyCode === 13)
                        this.handleSubmit()
                })
        })
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.state.listener)
    }

    render() {
        return (
            <div>
                <Input
                    autoFocus
                    id="nick"
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    onBlur={() => this.handleSubmit()} />

                <Button onClick={() => this.handleCloseDialog()} color="primary">
                    Submit
                </Button>
            </div>
        );
    }

    handleSubmit() {
        this.props.gameActions.getUser(this.state.value)
            .then((response) => {
                this.props.history.replace(`/stats/${response.value.data.nick}`)
            })
            .catch((e) => {
                console.error(e)
            })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gameActions: bindActionCreators(gameActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(StatisticsForm);