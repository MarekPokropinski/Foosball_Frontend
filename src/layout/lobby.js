import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const style = {
  Paper: {
    padding: 20,
    margin: "20px auto",
    width: "40%"
  },
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
    gameType: "Ranked",
    users: [
      { name: "@User1" },
      { name: "@User2" },
      { name: "@User3" },
      { name: "@User4" }
    ]
  };

  startGame() {
    this.props.history.replace("/begin");
  }

  deleteUser(userId) {
    let tempUsers = [...this.state.users];
    tempUsers[userId] = " ";
    this.setState({
      users: tempUsers
    });
  }

  render() {
    return (
      <div>
        <h1>Type : {this.state.gameType}</h1>
        <Grid container style={style.Container}>
          <Grid item sm>
            <Button
              color="secondary"
              variant="contained"
              style={style.Paper}
              onClick={() => this.deleteUser(0)}
            >
              {this.state.users[0].name}
            </Button>
          </Grid>
          <Grid item sm>
            <Button
              color="primary"
              variant="contained"
              style={style.Paper}
              onClick={() => this.deleteUser(1)}
            >
              {this.state.users[1].name}
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm>
            <Button
              color="secondary"
              variant="contained"
              style={style.Paper}
              onClick={() => this.deleteUser(2)}
            >
              {this.state.users[2].name}
            </Button>
          </Grid>
          <Grid item sm>
            <Button
              color="primary"
              variant="contained"
              style={style.Paper}
              onClick={() => this.deleteUser(3)}
            >
              {this.state.users[3].name}
            </Button>
          </Grid>
        </Grid>

        <Button
          style={style.StartButton}
          variant="contained"
          color="primary"
          onClick={() => this.startGame()}
        >
          Start game
        </Button>
      </div>
    );
  }
}

export default Lobby;
