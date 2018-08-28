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

    render() {
        return (
            <div>
                <SwipeableDrawer
                    open={this.state.open}
                    onClose={() => this.openCloseMe(false)}
                    onOpen={() => this.openCloseMe(true)}>
                    
                    <Button
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        CHOOSE TYPE OF GAME
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}>
                        
                        <MenuItem onClick={()=>{this.handleChangeContent('normal')}}>Normal</MenuItem>
                        <MenuItem onClick={()=>{this.handleChangeContent('rankedSolo')}}>Ranked 1v1</MenuItem>
                        <MenuItem onClick={()=>{this.handleChangeContent('rankedDuo')}}>Ranked 2v2</MenuItem>
                    </Menu>
                    <EnhancedTable users={this.props.user.leaderboard} typeOfContent={this.state.typeOfContent} />
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
        this.setState({ open: action });
    }

    componentDidMount() {
        this.openCloseMe(this.props.open);
        this.props.userActions.getLeaderboard();
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