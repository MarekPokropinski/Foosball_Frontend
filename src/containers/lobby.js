import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions'

import CustomButton from '../components/button';
import Button from '@material-ui/core/Button';
import '../styles/lobby.css';
import UserComponent from "../containers/userComponent.js";


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
  render() {
    return (
      <div>
        <h1>Type : {this.props.match.params.mode}</h1>

        {this.renderUsersGrid()}

        <Button
          style={style.StartButton}
          variant="contained"
          color="primary"
          onClick={() => this.startGame()}>
          Start game
        </Button>

        <Button
          style={style.StartButton}
          variant="contained"
          color="secondary"
          onClick={() => this.goBack()}>
          Go back
        </Button>
      </div>
    );
  }

  componentDidMount() {
    this.props.gameActions.resetGame();
  }

  startGame() {
    this.props.history.replace(`/begin/${this.props.match.params.mode}`);
  }

  goBack() {
    this.props.history.replace("/");
  }

  deleteUser(userId, team) {
    //TODO: Add delete user functionality
  }

  addUser(color) {
    this.props.gameActions.addUser(color)
  }

  renderUserButton(color, val, index, team) {
    return (
      <CustomButton
        value={val}
        color={color}
        variant="contained"
        onClick={() => this.deleteUser(index, team)} />
    );
  }

  drawAddButton(color) {
    return (
      <button onClick={() => this.addUser(color)}>
        +
      </button>
    );
  }

  renderUsersGrid() {
    return (
      <div className='flex'>
        <div>
          {this.props.game.blueTeamNicks.map((val, index) => {
            return (
              <div key={index}>
                <UserComponent color='blue' id={index} />
              </div>
            );
          })}
          {(this.props.game.blueTeamNicks.length < 2)
          ? this.drawAddButton('blue')
          : ""
          }
        </div>
        <div>
          {this.props.game.redTeamNicks.map((val, index) => {
            return (
              <div key={index}>
                <UserComponent color='red' id={index} />
              </div>
            );
          })}
          {(this.props.game.redTeamNicks.length < 2)
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
    actions: bindActionCreators(userActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    game: state.game
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
