import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
class StatisticsMenu extends Component {
    state = {
        open: false,
    }

    render() {
        return (
            <div>
                <SwipeableDrawer
                    open={this.state.open}
                    onClose={() => this.openCloseMe(false)}
                    onOpen={() => this.openCloseMe(true)}
                >
                    STATS
                </SwipeableDrawer>

                <IconButton
                     color="inherit"
                     aria-label="Menu"
                     onClick={() => this.openCloseMe(!this.state.open)}
                 >
                    <MenuIcon />
                </IconButton>
            </div>
        )
    }
    openCloseMe(action) {
        this.setState(...this.state, { open: action });
    }

    componentDidMount() {
        this.openCloseMe(this.props.open);
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
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsMenu);