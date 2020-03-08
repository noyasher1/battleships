'use strict';

import Cell from '../cell.js';

export default class boardBase{
    constructor(nodeId, rowsNumber, columnsNumber){
        this.id = nodeId;
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
        this.cells = [];
        this.element;
    }

    mapBoard(){
        this.element = document.querySelector(`#${this.id}`);
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            this.cells.push([]);
            let rowCellsElements = this.element.querySelectorAll(`tr`)[rowIndex].querySelectorAll("td");
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                this.cells[rowIndex][columnIndex] = new Cell(rowCellsElements[columnIndex]);
            }
        }
    }

    locateABattleship(startRowIndex, startColumnIndex, length, isHorizontal){
        if(isHorizontal){
            for(let columnIndex = startColumnIndex; columnIndex < startColumnIndex + length; columnIndex++){
                this.cells[startRowIndex][columnIndex].markAsContainBattleship();
            }
        }
        else{
            for(let rowIndex = startRowIndex; rowIndex < startRowIndex + length; rowIndex++){
                this.cells[rowIndex][startColumnIndex].markAsContainBattleship();
            }
        }
    }

    markCellAsExposed(rowIndex, columnIndex){
        this.cells[rowIndex][columnIndex].markAsExposed();
    }

    markCellAsContainBattleship(rowIndex, columnIndex){
        this.cells[rowIndex][columnIndex].markAsContainBattleship()
    }
}