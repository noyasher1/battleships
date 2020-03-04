'use strict';

import BoardBase from './boardBase.js';
import Cell from '../cell.js';

export default class UserBoard extends BoardBase{
    constructor(nodeId, rowsNumber, columnsNumber) {
        super(nodeId, rowsNumber, columnsNumber);
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
}