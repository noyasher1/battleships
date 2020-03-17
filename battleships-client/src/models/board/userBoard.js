'use strict';
import BoardBase from './boardBase.js';
import Cell from '../cell.js';

export default class UserBoard extends BoardBase{
    constructor(nodeId, rowsNumber, columnsNumber) {
        super(nodeId, rowsNumber, columnsNumber);
        this.lastExposedCell = undefined;
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
                this.cells[rowIndex][columnIndex].element.classList.remove("not-set");
                this.cells[rowIndex][columnIndex].element.classList.add("not-exposed")
            }
        }
    }

    createHTMLRow(){
        let htmlRow = `<tr>`;
        for(let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++){
            htmlRow += '\n\t<td class="not-set"></td>';
        }
        htmlRow += '\n</tr>';

        return htmlRow;
    }

    createHTMLTable(){
        let htmlTable = `<table>`;
        for(let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++){
            htmlTable += `\n\t${this.createHTMLRow()}`;
        }
        htmlTable += '\n</table>';

        return htmlTable;
    }

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = "user-board";
        userBoardElement.tabIndex = 0;

        userBoardElement.innerHTML = `Your Board\r${this.createHTMLTable()}`;

        let parentDiv = document.getElementById("game-boards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this.mapBoard();
    }
}