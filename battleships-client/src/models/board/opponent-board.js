'use strict';
import BoardBase from './board-base.js';
import GameMovesEmitters from '../../events/game-moves-events/game-moves-emitters.js';

export default class OpponentBoard extends BoardBase{
    constructor(nodeId){
        super(nodeId);
        this._isUserTurn = false;
    }

    addCellsClickListener(userSocket){
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                this.cells[rowIndex][columnIndex].element.addEventListener("click", () => {
                    if(!this._isUserTurn){
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
        this._isUserTurn = true;
    }

    prepareForOpponentTurn(messageBox, popFirstMessage = true){
        /*Why pass messageBox
         why have "opponentBoard" do this when this is called in gameMoveHandlers.
         */
        if(popFirstMessage){
            messageBox.popMessage();
        }
        messageBox.pushMessage("This is the opponent\'s turn.");
        this._isUserTurn = false;
    }

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = this._id;

        userBoardElement.innerHTML = `Opponent Board\r${this._createHTMLTable("not-exposed")}`;

        let parentDiv = document.getElementById("game-boards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this._mapBoard();
    }
}