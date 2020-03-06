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

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = "user-board";
        userBoardElement.tabIndex = 0;

        userBoardElement.innerHTML = `Your Board
        <table>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
                <tr>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                    <td class="notExposed"></td>
                </tr>
            </table>`;

        document.getElementById("gameBoards").appendChild(userBoardElement);

        this.mapBoard();
    }
}