'use strict';

import BoardBase from './boardBase.js';
import Cell from '../cell.js';

export default class OpponentBoard extends BoardBase{
    constructor(nodeId, rowsNumber, columnsNumber){
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

    isCellExposed(rowIndex, columnIndex){
        return this.cells[rowIndex][columnIndex].isExposed;
    }

    isCellContainBattleship(rowIndex, columnIndex){
        return this.cells[rowIndex][columnIndex].isContainBattleship;
    }
}