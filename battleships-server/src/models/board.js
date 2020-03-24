'use strict';
const Cell = require("./cell");

const boardLength = 10; // CR: use config
const boardLastIndex= boardLength - 1;

// CR: Generally, I like to leave model class "pure" from any logic so that they contain only data,
// and move this logic to specific handlers that perform actions on the data.
// I find it easier to separate the logic to smaller, easier-to-understand parts and allows me to replace the implementation with more ease in the future if needed

module.exports = class Board{
    constructor(){
        this.cells = [];
        this._initBoard();
        this._cellsContainBattleship = [];
    }

    // CR: I'd move this outside the class instead of a static function
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
                // CR: it would be easier to find and perform actions on the cell If you'd push the Cell instance instead of an object that describes the cell.
                // Just add the rowIndex and colIndex params to the Cell class.
                // Take markCellAsExposed for example. You need to perform a state update twice even though it is the same update.
                // Regardless, sometimes we need to find a compromise between performance and convenience. In this case I think I'll go with convenience and just scan through
                // the array every time, so that I don't need _cellsContainBattleship anymore
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

    // CR: I find these kind of functions redundant
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
        // CR: you can use a for loop instead of all the ifs
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