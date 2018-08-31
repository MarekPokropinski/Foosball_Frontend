import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions';
import * as playersActions from '../actions/playersActions';
import '../styles/lobby.css';
import GameRules from "../gameRules.js";
import UsersGrid from "../components/usersGrid.js";

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import SettingsIcon from '@material-ui/icons/SettingsApplicationsRounded';
import Slider from '@material-ui/lab/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const style = {
  Container: {
    itemAlign: "center"
  },
  StartButton: {
    margin: 30,
    padding: 20,
    fontWeight: "bold",
    width: "30%"
  },

};

class Lobby extends Component {
  state = {
    input: [],
    open: false,
    goalLimit: 10,
    timeLimit:10,
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  renderSettings() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}  color="secondary" size="medium" variant="fab">
          <SettingsIcon  />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title">
            Rules of Game
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Goal limit: {this.state.goalLimit}
            </DialogContentText>
            <Slider value={this.state.goalLimit} min={1} max={20} step={1} onChange={(e, value)=>{this.setState({goalLimit: value})}} />
            
            <DialogContentText>
              Time limit: {this.state.timeLimit} (min)
            </DialogContentText>
            <Slider value={this.state.timeLimit} min={1} max={20} step={1} onChange={(e, value)=>{this.setState({timeLimit: value})}} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              EXIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {
    let loading = (this.props.user.pending) ? <LinearProgress color="secondary" style={{ position: 'absolute', width: '100%' }} /> : ''
    return (
      <div>
        {loading}
        {this.renderUsersGrid()}

        <div className='bottom-buttons'>
          <Button
            style={style.StartButton}
            variant="contained"
            color="secondary"
            onClick={() => this.goBack()}>
            Go back
          </Button>
          {this.props.game.gameType === 'normal' ? this.renderSettings() : <span />}
          <Button
            style={style.StartButton}
            variant="contained"
            color="primary"
            disabled={this.props.user.pending || !GameRules.checkRules(this.props.players, this.props.game.gameType) || !this.validateLobby()}
            onClick={() => this.startGame()}>
            Start game
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.game.gameType === 'invalid') {
      this.props.history.replace('/');
    } else {
      //If someone tries to enter free lobby game will automaticaly begin
      if (this.props.game.gameType === 'free') {
        this.props.history.replace(`/begin/free`)
        return
      }
      if (!this.props.match.params.reset || this.props.match.params.reset === true)
        this.props.playersActions.clear();
    }
  }

  startGame() {
    if (this.validateLobby()){
        this.props.userActions.putRulesToStore(this.state);
        this.props.history.replace(`/begin/${this.props.match.params.mode}`);
    }
    else
      console.error('Validation failed')
  }

  validateLobby() {
    for (let i = 0; i < this.props.players.length; i++) {
      if (isNaN(parseInt(this.props.players[i].id, 10))) {
        return false
      }
    }
    return true
  }

  goBack() {
    this.props.history.replace("/");
  }

  addUser(color) {
    this.props.playersActions.addUser(color)
  }

  changePositions(color) {
    let newPlayers = []
    let toSwap = []
    for (let i = 0; i < this.props.players.length; i++) {
      let player = this.props.players[i]
      if (player.color !== color) {
        newPlayers.push(player)
      } else {
        toSwap.push(player)
      }
    }
    for (let i = toSwap.length - 1; i >= 0; i--) {
      newPlayers.push(toSwap[i])
    }
    this.props.playersActions.setAllUsers(newPlayers)
  }

  renderUsersGrid() {
    return (
      <UsersGrid players={this.props.players} addUser={(c) => this.addUser(c)} changePositions={(c) => this.changePositions(c)} />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
