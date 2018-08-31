import React from 'react'
import { getPlayers } from "../actions/playersActions"
import Button from '@material-ui/core/Button'
import UserComponent from "../containers/userComponent"
import AddIcon from '@material-ui/icons/Add'
import SwapIcon from '@material-ui/icons/SwapVert'

export default (props) => {
    return (
        <div className='flex'>
            <div>
                {drawTeam('blue', props)}
            </div>
            <div>
                {drawTeam('red', props)}
            </div>
        </div>
    );
}

const drawTeam = (color, props) => {
    let toDraw = []
    let i = 0
    let key = 0
    let index = 0
    for (let player of props.players) {
        if (player.color === color) {
            toDraw.push(
                <span key={key}>
                    <UserComponent color={color} id={index} />
                </span>
            );
            key++;
            if(getPlayers(props.players, color).length > i + 1) {
                toDraw.push(
                <span key={key}>
                    {drawSwapButton(color, props.changePositions)}
                </span>
                );
                key++;
            }     
            i++
        }
        index++
    }

    if(getPlayers(props.players, color).length < 2) {
        toDraw.push(
            <span key={key}>
                {drawAddButton(color, props.addUser)}
            </span>
        );
    }
    return toDraw
}

const drawAddButton = (color, addUser) => {
    return (
        <Button style={{ margin: '0' }} variant="fab" color="secondary" aria-label="Add" onClick={() => addUser(color)}>
            <AddIcon />
        </Button>
    );
}

const drawSwapButton = (color, changePositions) => {
    return (
        <Button
            variant="fab"
            style={{ margin: '0px' }}
            color="secondary"
            onClick={() => changePositions(color)} >
            <SwapIcon />
      </Button>
    );
}