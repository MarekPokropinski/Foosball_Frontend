import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import InfoIcon from './infoIcon'
class Status extends Component{

    state = {
        status: '0',
        timer: null,
    }
    componentDidMount() {
        this.checkStatus();
    }
    checkStatus() {
        this.props.userActions.getStatus()
        .then(() => this.setState({...this.state, status:"0"}))
        .catch((e)=> {
            if (e.response  ) {
                this.setState({...this.state, status:"1"})
            } else {
                this.setState({...this.state, status:"-1"})
            }
        })
        this.setState({ timer: setTimeout(() => this.checkStatus(), 5000) });
    }
    render() {
        return (
            <span>
                <InfoIcon iconType={this.state.status} />
            </span>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);