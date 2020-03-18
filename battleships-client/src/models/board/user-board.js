'use strict';
import BoardBase from './board-base.js';

export default class UserBoard extends BoardBase{
    constructor(nodeId) {
        super(nodeId);
        this._lastExposedCell = null;
    }

    static prepareForUserTurn(messageBox, popFirstMessage = true){
        if(popFirstMessage){
            messageBox.popMessage();
        }
        messageBox.pushMessage("This is your turn.");
    }

    prepareForOpponentTurn(){
        if(this._lastExposedCell !== null){
            this._lastExposedCell.unmarkAsLastExposed();
        }
    }

    markCellAsExposed(rowIndex, columnIndex) {
        super.markCellAsExposed(rowIndex, columnIndex);
        this._lastExposedCell = this.cells[rowIndex][columnIndex];
        this._lastExposedCell.markAsLastExposed();
    }

    unmarkLastCellAsExposed(){
        if(this._lastExposedCell !== null){
            this._lastExposedCell.unmarkAsLastExposed();
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

    render(){
        let userBoardElement = document.createElement("div");
        userBoardElement.id = this._id;
        userBoardElement.tabIndex = 0;

        userBoardElement.innerHTML = `Your Board\r${this._createHTMLTable("not-set")}`;

        let parentDiv = document.getElementById("game-boards");
        parentDiv.insertBefore(userBoardElement, parentDiv.childNodes[0] || null);

        this._mapBoard();
    }
}