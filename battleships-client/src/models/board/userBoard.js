'use strict';

import BoardBase from './boardBase.js';
import Cell from '../cell.js';

export default class UserBoard extends BoardBase{
    constructor(nodeId, rowsNumber, columnsNumber) {
        super(nodeId, rowsNumber, columnsNumber);
        this.lastExposedCell = undefined;
    }

    initBoard(){
        for (let i = 0; i < this.rowsNumber; i++) {
            this.cells.push([]);
            for (let j = 0; j < this.columnsNumber; j++) {
                this.cells[i][j] = new Cell();
            }
        }
    }

    prepareForUserTurn(messageBox, popFirstMessage = true){
        if(popFirstMessage){
            messageBox.popMessage();
        }
        messageBox.pushMessage("This is your turn.");
    }

    prepareForOpponentTurn(){
        if(this.lastExposedCell !== undefined){
            this.lastExposedCell.unmarkAsLastExposed();
        }
        //freeze hover and click event
    }

    markCellAsExposed(rowIndex, columnIndex) {
        super.markCellAsExposed(rowIndex, columnIndex);
        this.lastExposedCell = this.cells[rowIndex][columnIndex];
        this.lastExposedCell.markAsLastExposed();
    }

    unmarkLastCellAsExposed(){
        if(this.lastExposedCell !== undefined){
            this.lastExposedCell.unmarkAsLastExposed();
        }
    }

    prepareForGameStart(){
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                this.cells[rowIndex][columnIndex].element.classList.remove("notSet")
                this.cells[rowIndex][columnIndex].element.classList.add("notExposed")
            }
        }
    }

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = "user-board";
        userBoardElement.tabIndex = 0;

        userBoardElement.innerHTML = `Your Board
        <table>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
                <tr>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                     <td class="notSet"></td>
                </tr>
            </table>`;

        let parentDiv = document.getElementById("gameBoards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this.mapBoard();
    }
}