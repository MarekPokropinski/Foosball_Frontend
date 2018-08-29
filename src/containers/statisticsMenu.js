import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import EnhancedTable from './statsTable';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const style = {
    TypeButton: {
        color: "#007dc3",
        fontSize: 40,
        fontWeight: 'bold',
        backgroundColor: '#000c21',
        boxShadow: '7px 6px 19px -2px rgba(0,0,0,0.8)',
        height: 110,
    },
    ButtonMenu: {
        marginLeft: '30%',
        width: 800,
    }
}
class StatisticsMenu extends Component {
    state = {
        open: false,
        typeOfContent: 'normal',
        anchorEl: null,
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleChangeContent(type) {
        this.setState({ anchorEl: null, typeOfContent: type });
    }
    printTitle() {
        switch (this.state.typeOfContent) {
            case 'normal':
                return 'Normal Statistics'
            case 'rankedSolo':
                return 'Ranked Solo Statistics'
            case 'rankedDuo':
                return 'Ranked Duo Statistics'
            case 'gameHistory':
                return 'Game History'
            default:
                return ''
        }
    }
    render() {
        return (
            <div>
                <SwipeableDrawer
                    open={this.state.open}
                    onClose={() => this.openCloseMe(false)}
                    onOpen={() => this.openCloseMe(true)}>

                    <Button
                        style={style.TypeButton}
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>

                        {this.printTitle()}
                    </Button>
                    <ClickAwayListener onClickAway={() => this.openCloseMe(true)}>
                        <Menu
                            style={style.ButtonMenu}
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={() => this.openCloseMe(true)}>

                            <MenuItem onClick={() => { this.handleChangeContent('normal') }}>Normal</MenuItem>
                            <MenuItem onClick={() => { this.handleChangeContent('rankedSolo') }}>Ranked 1v1</MenuItem>
                            <MenuItem onClick={() => { this.handleChangeContent('rankedDuo') }}>Ranked 2v2</MenuItem>
                            <MenuItem onClick={() => { this.handleChangeContent('gameHistory') }}>Game History</MenuItem>

                        </Menu>
                    </ClickAwayListener>
                    <EnhancedTable users={this.props.user.leaderboard} history={this.props.user.history} typeOfContent={this.state.typeOfContent} />
                </SwipeableDrawer>

                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => this.openCloseMe(!this.state.open)}>

                    <MenuIcon />
                </IconButton>
            </div >
        )
    }
    openCloseMe(action) {
        this.props.userActions.getLeaderboard();
        this.props.userActions.getHistory();
        this.setState({ open: action });
    }

    componentDidMount() {
        this.openCloseMe(this.props.open);
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
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsMenu);