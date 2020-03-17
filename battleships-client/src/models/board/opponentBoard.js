'use strict';
import BoardBase from './boardBase.js';
import Cell from '../cell.js';
import GameMovesEmitters from '../../events/gameMovesEvents/gameMovesEmitters.js';

export default class OpponentBoard extends BoardBase{
    constructor(nodeId){
        super(nodeId);
        this.isUserTurn = false;
    }

    addCellsClickListener(userSocket){
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                this.cells[rowIndex][columnIndex].element.addEventListener("click", () => {
                    if(!this.isUserTurn){
                        return;
                    }
                    if(!this.cells[rowIndex][columnIndex].isExposed){
                        GameMovesEmitters.userMove(userSocket, rowIndex, columnIndex);
                    }
                })
            }
        }
    }

    prepareForUserTurn(){
        this.isUserTurn = true;
    }

    prepareForOpponentTurn(messageBox, popFirstMessage = true){
        if(popFirstMessage){
            messageBox.popMessage();
        }
        messageBox.pushMessage("This is the opponent\'s turn.");
        this.isUserTurn = false;
    }

    createHTMLRow(){
        let htmlRow = `<tr>`;
        for(let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++){
            htmlRow += '\n\t<td class="not-exposed"></td>';
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
        userBoardElement.id = "opponent-board";

        userBoardElement.innerHTML = `Opponent Board\r${this.createHTMLTable()}`;

        let parentDiv = document.getElementById("game-boards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this.mapBoard();
    }
}