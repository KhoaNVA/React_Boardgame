import React, { Component } from 'react';
import Tile from './Tile';

class Board extends Component {
    constructor(props) {
        super(props);

        this.AllowedStates = Object.freeze({
            INACTIVE: 'inactive',
            HIDDEN: 'hidden',
            REVEALED: 'revealed'
        });

        this.state = {
            tiles: []
        };

        this.revealed = [];
        let intSeed = 40;
        for (let i = 0; i < intSeed; i++) {
            this.state.tiles.push({
                id: i,
                value: i,//Math.floor(Math.random() * intSeed),
                state: this.AllowedStates.HIDDEN
            });
        }

        this.renderTile = this.renderTile.bind(this);
        this.update = this.update.bind(this);
        this.updateRevealed = this.updateRevealed.bind(this);
        this.isEqual = this.isEqual.bind(this);
    }
    update(incrementor, i) {
        this.setState(currentState => ({
            tiles: currentState.tiles.map(
                tile => tile.id !== i ? tile : { ...tile, value: tile.value + incrementor }
            )
        }));
    }
    isEqual(a, b) {
        return this.state.tiles[a].value === this.state.tiles[b].value;
    }
    updateRevealed(index) {
        if (this.revealed.indexOf(index) === -1) {
            this.revealed.push(index);
        }
        this.setState(curState => ({
            tiles: curState.tiles.map(
                tile => tile.id !== index ? tile : { ...tile, state: this.AllowedStates.REVEALED }
            )
        }));
        let arr = this.revealed;

        if (this.revealed.length === 2) {
            if (this.isEqual(this.revealed[0], this.revealed[1])) {
                this.setState(curState => ({
                    tiles: curState.tiles.map(
                        tile => arr.indexOf(tile.id) > -1 ? { ...tile, state: this.AllowedStates.INACTIVE } : tile
                    )
                }));
            }
            else {
                setTimeout(() => {
                    this.setState(curState => ({
                        tiles: curState.tiles.map(
                            tile => arr.indexOf(tile.id) > -1 ? { ...tile, state: this.AllowedStates.HIDDEN } : tile
                        )
                    }))
                }, 2000);
            }
            this.revealed = [];
        }
    }
    renderTile(tile, i) {
        return (
            <Tile key={tile.id} index={i}
                onChange={this.update}
                onReveal={this.updateRevealed}>
                {tile.value}{tile.state}
            </Tile>
        )
    }
    render() {
        return (
            <div className="Board">
                {this.state.tiles.map(this.renderTile)}
            </div>
        )
    }
}

export default Board