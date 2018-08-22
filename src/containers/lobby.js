import React, { Component } from "react";
import { connect } from 'react-redux';
import CustomButton from '../components/button';
import Button from '@material-ui/core/Button';
import '../styles/lobby.css';

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

  startGame() {
    this.props.history.replace(`/begin/${this.props.match.params.mode}`);
  }

  goBack() {
    this.props.history.replace("/");
  }

  deleteUser(userId, team) {
    //TODO: Add delete user functionality
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

  renderUsersGrid() {
    return (
      <div className='flex'>
        <div>
          {this.props.game.blueTeamIds.map((val, index) => {
            return (
              <div key={index}>
                {this.renderUserButton('secondary', val, index, 'blue')}
              </div>
            );
          })}
        </div>
        <div>
          {this.props.game.redTeamIds.map((val, index) => {
            return (
              <div key={index}>
                {this.renderUserButton('primary', val, index, 'red')}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    game: state.game
  }
}

export default connect(mapStateToProps)(Lobby);