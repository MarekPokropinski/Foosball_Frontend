import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import * as gameActions from '../actions/gameActions'

import CustomButton from '../components/button';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  render() {
    return (
      <div>

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
            onClick={() => this.startGame()}>
            Start game
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.gameActions.resetGame();
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress(event) {
    console.log(event.keyCode)
  }

  startGame() {
    this.props.gameActions.validateLobby()
    if (this.props.game.validated)
      this.props.history.replace(`/begin/${this.props.match.params.mode}`);
    else
      console.error('Validation failed')
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
      <Button style={{margin: '50px'}} variant="fab" color="secondary" aria-label="Add" onClick={() => this.addUser(color)}>
        <AddIcon />
      </Button>
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
