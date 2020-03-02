const Cell = require("./cell");

module.exports = class Board{
    constructor(){
        this.cells = [];
        this.initBoard();
    }

    initBoard(){
        for (let i = 0; i < 10; i++) {
            this.cells.push([]);
            for (let j = 0; j < 10; j++) {
                this.cells[i][j] = new Cell();
            }
        }
    }

    markCellAsExposed(rowIndex, columnIndex){
        this.cells[rowIndex][columnIndex].isExposed = true;
    }

    markCellsAsContainBattleship(startRowIndex, startColumnIndex, length, isHorizontal){
        console.log("trying to mark cells as contain battleship");
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                if(this.isCellExist(startRowIndex, columnIndex) && !this.isCellHaveOsculatedBattleship(startRowIndex, columnIndex) && !this.isCellContainBattleship(startRowIndex, columnIndex)){
                    this.cells[startRowIndex][columnIndex].isContainBattleship = true;
                    console.log(`marked cell as contain battleship: ${startRowIndex.toString()}, ${columnIndex}`)
                }
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                if(this.isCellExist(rowIndex, startColumnIndex) && !this.isCellHaveOsculatedBattleship(rowIndex, startColumnIndex) && !this.isCellContainBattleship(rowIndex, startColumnIndex)){
                    this.cells[rowIndex][startColumnIndex].isContainBattleship = true;
                    console.log(`marked cell as contain battleship: ${rowIndex.toString()}, ${startColumnIndex}`)
                }
            }
        }
    }

    isCellExposed(rowIndex, columnIndex){
        return this.cells[rowIndex][columnIndex].isExposed;
    }

    isCellContainBattleship(rowIndex, columnIndex){
        return this.cells[rowIndex][columnIndex].isContainBattleship;
    }

    isCellHaveOsculatedBattleship(rowIndex, columnIndex){
        /*if(this.cells[rowIndex-1][columnIndex].isContainBattleship){
            return true;
        }*/
        if(rowIndex !== 0){
            if(this.cells[rowIndex-1][columnIndex].isContainBattleship){
                return true;
            }
            if(columnIndex !== 0){
                if(this.cells[rowIndex-1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
            if(columnIndex !== 10){
                if(this.cells[rowIndex-1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
        }
        if(rowIndex !== 10){
            if(this.cells[rowIndex+1][columnIndex].isContainBattleship){
                return true;
            }
            if(columnIndex !== 0){
                if(this.cells[rowIndex+1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
            if(columnIndex !== 10){
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
            if(rowIndex !== 10){
                if(this.cells[rowIndex+1][columnIndex-1].isContainBattleship){
                    return true;
                }
            }
        }
        if(columnIndex !== 10){
            if(this.cells[rowIndex][columnIndex+1].isContainBattleship){
                return true;
            }
            if(rowIndex !== 0){
                if(this.cells[rowIndex-1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
            if(rowIndex !== 10){
                if(this.cells[rowIndex+1][columnIndex+1].isContainBattleship){
                    return true;
                }
            }
        }
        return false;
    }
    
    isCellExist(rowIndex, columnIndex){
        return rowIndex >= 0 && rowIndex <= 10 && columnIndex >= 0 && columnIndex <= 10;
    }

    areCellsAvailableForLocating(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                if(!this.isCellExist(startRowIndex, columnIndex) || this.isCellHaveOsculatedBattleship(startRowIndex, columnIndex) || this.isCellContainBattleship(startRowIndex, columnIndex)){
                    return false;
                }
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                if(!this.isCellExist(rowIndex, startColumnIndex) || this.isCellHaveOsculatedBattleship(rowIndex, startColumnIndex) || this.isCellContainBattleship(rowIndex, startColumnIndex)){
                    return false;
                }
            }
        }
        return true;
    }
};