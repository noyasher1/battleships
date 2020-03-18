'use strict';
import BoardBase from './board-base.js';
import Cell from '../cell.js';
import GameMovesEmitters from '../../events/game-moves-events/game-moves-emitters.js';

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

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = "opponent-board";

        userBoardElement.innerHTML = `Opponent Board\r${this.createHTMLTable("not-exposed")}`;

        let parentDiv = document.getElementById("game-boards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this.mapBoard();
    }
}