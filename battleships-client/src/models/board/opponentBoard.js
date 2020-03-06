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

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = "opponent-board";
        userBoardElement.innerText = "";

        userBoardElement.innerHTML = `Opponent Board
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