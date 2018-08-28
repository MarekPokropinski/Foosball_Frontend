import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions'
import * as playersActions from '../actions/playersActions'

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../styles/lobby.css';
import UserComponent from "../containers/userComponent.js";
import { getPlayers } from "../actions/playersActions.js";


const style = {
  Container: {
    itemAlign: "center"
  },
  StartButton: {
    margin: 30,
    padding: 20,
    fontWeight: "bold",
    width: "30%"
  }
};

class Lobby extends Component {
  state = {
    input: []
  }

  render() {
    let loading = (this.props.user.pending) ? <LinearProgress color="secondary" style={{position: 'absolute', width: '100%'}}/> : ''
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

          <Button
            style={style.StartButton}
            variant="contained"
            color="primary"
            disabled={this.props.user.pending}
            onClick={() => this.startGame()}>
            Start game
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.playersActions.clear();
  }

  startGame() {
    if (this.validateLobby())
      this.props.history.replace(`/begin/${this.props.match.params.mode}`);
    else
      console.error('Validation failed')
  }

  validateLobby() {
    for(let i = 0; i < this.props.players.length; i++) {
      if (isNaN(parseInt(this.props.players[i].id, 10))) {
        return false
      }
      return true
    }
  }

  goBack() {
    this.props.history.replace("/");
  }

  addUser(color) {
    this.props.playersActions.addUser(color)
  }

  drawAddButton(color) {
    return (
      <Button style={{ margin: '50px' }} variant="fab" color="secondary" aria-label="Add" onClick={() => this.addUser(color)}>
        <AddIcon />
      </Button>
    );
  }

  renderUsersGrid() {
    return (
      <div className='flex'>
        <div>
          {this.props.players.map((val, index) => {
            if(val.color === 'blue')
              return (
                <div key={index}>
                  <UserComponent color='blue' id={index} />
                </div>
              );
            else
              return <div key={index} />
          })}
          {(getPlayers(this.props.players, 'blue').length < 2)
            ? this.drawAddButton('blue')
            : ""
          }
        </div>
        <div>
          {this.props.players.map((val, index) => {
            if(val.color === 'red')
              return (
                <div key={index}>
                  <UserComponent color='red' id={index} />
                </div>
              );
            else
              return <div key={index} />
          })}
          {(getPlayers(this.props.players, 'red').length < 2)
            ? this.drawAddButton('red')
            : ""
          }
        </div>
      </div>
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
