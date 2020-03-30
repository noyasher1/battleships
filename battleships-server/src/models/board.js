'use strict';
const Cell = require("./cell");

const boardLength = 10;
const boardLastIndex= boardLength - 1;

function isCellExist(rowIndex, columnIndex){
    return rowIndex >= 0 && rowIndex <= boardLastIndex && columnIndex >= 0 && columnIndex <= boardLastIndex;
}

module.exports = class Board{
    constructor(){
        this.cells = [];
        this._initBoard();
        this._cellsContainBattleship = [];
    }

    markCellsAsContainBattleship(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                let currentCell = this.cells[startRowIndex][columnIndex];
                currentCell.isContainBattleship = true;
                this._cellsContainBattleship.push(currentCell);
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                let currentCell = this.cells[rowIndex][startColumnIndex];
                currentCell.isContainBattleship = true;
                this._cellsContainBattleship.push(currentCell);
            }
        }
    }

    areCellsAvailableForLocating(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                if(!isCellExist(startRowIndex, columnIndex) || this._isCellHaveOsculatedBattleship(startRowIndex, columnIndex) || this.cells[startRowIndex][columnIndex].isContainBattleship){
                    return false;
                }
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                if(!isCellExist(rowIndex, startColumnIndex) || this._isCellHaveOsculatedBattleship(rowIndex, startColumnIndex) || this.cells[rowIndex][startColumnIndex].isContainBattleship){
                    return false;
                }
            }
        }
        return true;
    }

    areBattleshipsTotallyExposed(){
        for(let containedBattleshipCell of this._cellsContainBattleship){
            if(!containedBattleshipCell.isExposed){
                return false;
            }
        }
        return true;
    }

    _initBoard(){
        for (let i = 0; i < boardLength; i++) {
            this.cells.push([]);
            for (let j = 0; j < boardLength; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }

    _isCellHaveOsculatedBattleship(rowIndex, columnIndex){
        for (let x = rowIndex - 1; x <= rowIndex + 1; x++) {
            for (let y = columnIndex -1; y <= columnIndex + 1; y++) {
                if (isCellExist(x, y) && !(x === rowIndex && y === columnIndex)) {
                    if (this.cells[x][y].isContainBattleship) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
};