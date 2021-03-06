'use strict';
const Cell = require("./cell");

const boardLength = 10;
const boardLastIndex= boardLength - 1;

module.exports = class Board{
    constructor(){
        this.cells = [];
        this._initBoard();
        this._cellsContainBattleship = [];
    }

    static _isCellExist(rowIndex, columnIndex){
        return rowIndex >= 0 && rowIndex <= boardLastIndex && columnIndex >= 0 && columnIndex <= boardLastIndex;
    }

    markCellAsExposed(rowIndex, columnIndex){
        this.cells[rowIndex][columnIndex].isExposed = true;
        if(this.isCellContainBattleship(rowIndex, columnIndex)){
            this._cellsContainBattleship.find(cell => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex).isExposed = true;
        }
    }

    markCellsAsContainBattleship(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                this.cells[startRowIndex][columnIndex].isContainBattleship = true;
                this._cellsContainBattleship.push({rowIndex: startRowIndex, columnIndex, isExposed: false});
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                this.cells[rowIndex][startColumnIndex].isContainBattleship = true;
                this._cellsContainBattleship.push({rowIndex, columnIndex: startColumnIndex, isExposed: false});
            }
        }
    }

    isCellExposed(rowIndex, columnIndex){
        return this.cells[rowIndex][columnIndex].isExposed;
    }

    isCellContainBattleship(rowIndex, columnIndex){
        return this.cells[rowIndex][columnIndex].isContainBattleship;
    }

    areCellsAvailableForLocating(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                if(!Board._isCellExist(startRowIndex, columnIndex) || this._isCellHaveOsculatedBattleship(startRowIndex, columnIndex) || this.isCellContainBattleship(startRowIndex, columnIndex)){
                    return false;
                }
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                if(!Board._isCellExist(rowIndex, startColumnIndex) || this._isCellHaveOsculatedBattleship(rowIndex, startColumnIndex) || this.isCellContainBattleship(rowIndex, startColumnIndex)){
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
                this.cells[i][j] = new Cell();
            }
        }
    }

    _isCellHaveOsculatedBattleship(rowIndex, columnIndex){
        if(rowIndex !== 0){
            if(this.cells[rowIndex-1][columnIndex].isContainBattleship){
                return true;
            }
            if(columnIndex !== 0){
                if(this.cells[rowIndex-1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
            if(columnIndex !== boardLastIndex){
                if(this.cells[rowIndex-1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
        }
        if(rowIndex !== boardLastIndex){
            if(this.cells[rowIndex+1][columnIndex].isContainBattleship){
                return true;
            }
            if(columnIndex !== 0){
                if(this.cells[rowIndex+1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
            if(columnIndex !== boardLastIndex){
                if(this.cells[rowIndex+1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
        }
        if(columnIndex !== 0){
            if(this.cells[rowIndex][columnIndex-1].isContainBattleship){
                return true;
            }
            if(rowIndex !== 0){
                if(this.cells[rowIndex-1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
            if(rowIndex !== boardLastIndex){
                if(this.cells[rowIndex+1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
        }
        if(columnIndex !== boardLastIndex){
            if(this.cells[rowIndex][columnIndex+1].isContainBattleship){
                return true;
            }
            if(rowIndex !== 0){
                if(this.cells[rowIndex-1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
            if(rowIndex !== boardLastIndex){
                if(this.cells[rowIndex+1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
        }
        return false;
    }
};