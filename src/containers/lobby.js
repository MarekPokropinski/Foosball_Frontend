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

  state = {
    input: []
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
    if (!this.props.user.isFocused) {
      if (event.keyCode === 13) {
        if (this.state.input.length >= 10) {
          let cardId = this.state.input.slice(this.state.input.length - 10, this.state.input.length).map((v) => String.fromCharCode(v)).join('')
          this.setState({ input: [] })
          this.props.userActions.addUserByCode(cardId)
        }
      }
      else
        this.setState({ input: [...this.state.input, event.keyCode] })
    }
  }

  startGame() {
    if (this.validateLobby())
      this.props.history.replace(`/begin/${this.props.match.params.mode}`);
    else
      console.error('Validation failed')


  }

  validateLobby() {
    for (let i = 0; i < this.props.game.blueTeamNicks.length; i++) {
      if (!this.props.game.blueTeamIds[i]) {
        return false
      }
    }
    for (let i = 0; i < this.props.game.redTeamNicks.length; i++) {
      if (!this.props.game.redTeamIds[i]) {
        return false
      }
    }
    return true
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
      <Button style={{ margin: '50px' }} variant="fab" color="secondary" aria-label="Add" onClick={() => this.addUser(color)}>
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
    userActions: bindActionCreators(userActions, dispatch),
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
