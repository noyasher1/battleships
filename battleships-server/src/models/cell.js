'use strict';

module.exports = class Cell{
    constructor(rowIndex, columnIndex){
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.isContainBattleship = false;
        this.isExposed = false;
    }
};