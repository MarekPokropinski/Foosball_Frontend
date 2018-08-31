import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions.js';
import EnhancedTable from './statsTable';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { InputAdornment } from 'material-ui';
import UserStatistics from './userStatistics.js';


const style = {
    TypeButton: {
        color: "#007dc3",
        fontWeight: 'bold',
        backgroundColor: '#000c21',
        boxShadow: '7px 6px 19px -2px rgba(0,0,0,0.8)',
        height: 110,
    },
    ButtonMenu: {
        marginLeft: '30%',
        width: 800,
    },
    bigText: {
        fontSize: 40,
        paddingBottom: '20px',
    },
    leftDiv: {
        height: '100%',
        width: '100%',
    }
}
class StatisticsMenu extends Component {
    state = {
        open: false,
        typeOfContent: 'normal',
        anchorEl: null,
        dialogOpen: false,
        value: '',
        nick: ''
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
            case 'personal':
                return `${this.state.nick} Statistics`
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
                        <div style={style.leftDiv}>
                            <div style={style.bigText}>{this.printTitle()}</div>
                            <div><h4>click here to change</h4></div>
                        </div>
                    </Button>
                    <ClickAwayListener onClickAway={() => { this.openCloseMe(true); this.handleCloseDialog(); console.error('click away') }}>
                        <Menu
                            style={style.ButtonMenu}
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={() => this.openCloseMe(false)}>

                            <MenuItem onClick={() => { this.handleChangeContent('normal') }}>Normal</MenuItem>
                            <MenuItem onClick={() => { this.handleChangeContent('rankedSolo') }}>Ranked 1v1</MenuItem>
                            <MenuItem onClick={() => { this.handleChangeContent('rankedDuo') }}>Ranked 2v2</MenuItem>
                            <MenuItem onClick={() => { this.handleChangeContent('gameHistory') }}>Game History</MenuItem>
                            <MenuItem onClick={() => { this.handlePersonal() }}>Personal</MenuItem>

                        </Menu>
                    </ClickAwayListener>
                    {
                        (this.state.typeOfContent === 'personal')
                            ? <UserStatistics nick={this.state.nick}/>
                            : <EnhancedTable users={this.props.user.leaderboard} history={this.props.user.history} typeOfContent={this.state.typeOfContent} />
                    }   
                </SwipeableDrawer>

                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => this.openCloseMe(!this.state.open)}>

                    <MenuIcon />
                </IconButton>
                {this.renderDialog()}
            </div >
        )
    }

    handlePersonal() {
        this.setState({ dialogOpen: true })
    }

    handleCloseDialog() {
        this.setState({ anchorEl: null, dialogOpen: false });
    }

    handleSubmit() {
        this.props.gameActions.getUser(this.state.value)
            .then((response) => {
                //this.props.history.replace(`/stats/${response.value.data.nick}`)
                //show user stats
                console.log('submit')
                this.setState({ anchorEl: null, dialogOpen: false, typeOfContent: 'personal', nick: response.value.data.nick, value: '' });
            })
            .catch((e) => {
                console.error(e)
                this.setState({ anchorEl: null, dialogOpen: false, value: '' });
            })
    }

    renderDialog() {
        return (
            <Dialog
                open={this.state.dialogOpen}
                onClose={() => this.handleCloseDialog()}
                aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">
                    Swipe badge or type your nick
                </DialogTitle>

                <DialogContent>
                    <Input
                        onKeyDown={(e)=>{
                            if (e.keyCode === 13) {
                                this.handleSubmit()
                            }
                        }}
                        autoComplete='off'
                        autoFocus
                        id="nick"
                        value={this.state.value}
                        onChange={(e) => this.setState({ value: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        } />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => this.handleSubmit()} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    openCloseMe(action) {
        this.props.userActions.getLeaderboard();
        this.props.userActions.getHistory();
        this.setState({ open: action, anchorEl: null });
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsMenu);