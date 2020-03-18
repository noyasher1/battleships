"use strict";
import InitializeBoardEmitters from "../events/initialize-board-events/initialize-board-emitters.js"

const buttonsDivId = "controllingBattleshipLocation";
const moveRightButtonId = "move-right";
const moveLeftButtonId = "move-left";
const moveUpButtonId = "move-up";
const moveDownButtonId = "move-down";
const rotateRightButtonId = "rotate-right";
const rotateLeftButtonId = "rotate-left";
const resetBattleshipStateButtonId = "reset-battleship-state";
const placeTheBattleshipButtonId = "place-the-battleship";

export default class BattleshipLocator{
    constructor(server, boardToLocateOn, messageBox){
        this.server = server;
        this.isActive = false;
        this.boardToLocateOnElement = boardToLocateOn;
        this.boardHeightCellsNumber = this.boardToLocateOnElement.columnsNumber;
        this.boardWidthCellsNumber = this.boardToLocateOnElement.rowsNumber;
        this.messageBox = messageBox;
        this.length = null;
        this.isHorizontal = true;
        this.startRowIndex = 0;
        this.startColumnIndex = 0;
        this._addButtons();
        this.moveRightButton = document.getElementById(moveRightButtonId);
        this.moveLeftButton = document.getElementById(moveLeftButtonId);
        this.moveUpButton = document.getElementById(moveUpButtonId);
        this.moveDownButton = document.getElementById(moveDownButtonId);
        this.rotateRightButton = document.getElementById(rotateRightButtonId);
        this.rotateLeftButton = document.getElementById(rotateLeftButtonId);
        this.resetBattleshipStateButton = document.getElementById(resetBattleshipStateButtonId);
        this.placeTheBattleshipButton = document.getElementById(placeTheBattleshipButtonId);
        this._addButtonsListeners();
        this._addKeysListeners();
        this._shouldDisableAllButtons(true);
        this._initMessageBox();
    }

    static _initCellsConsideredToLocateBattleship(){
        document.querySelectorAll(".considered-to-contain-battleship").forEach(cell => cell.classList.remove("considered-to-contain-battleship"))
    }

    startLocating(length){
        this.isActive = true;
        this.length = length;
        this.isHorizontal = true;
        this._initLocation();
        this._renderBattleship();
        this._shouldDisableAllButtons(false);
        this._valuateButtons();
        this.messageBox.pushMessage(`Please place a battleship with a length of ${this.length} cells.`)
    }

    finishLocating(){
        this.isActive = false;
        this.length = null;
        this._initLocation();
        this._renderBattleship();
        this._shouldDisableAllButtons(true);
        this.messageBox.popMessage()
    }

    allBattleshipsAreLocated(){
        this._removeButtons();
        this._resetMessagesFromLocator();
    }

    _initMessageBox(){
        this.messageBox.pushMessage("Please start locate your battleships.\n"
            + "You can place your battleship only vertically or horizontally, Not diagonally.\n"
            + "You must have a space of at least one cell between one battleship to another.\n"
            + "You can use the buttons below the board or keyboard.\n"
            + "In keyboard use arrow keys to move, and space to determine the location.")
    }

    _addButtons(){
        let boardToLocateElementOn = this.boardToLocateOnElement.element;
        let buttonsDiv = document.createElement("div");
        buttonsDiv.id = buttonsDivId;
        buttonsDiv.innerHTML = `
            <button class="locatingButton moveButton" id=${moveUpButtonId}>Move Up</button>
            <button class="locatingButton moveButton" id=${moveDownButtonId}>Move Down</button>
            <button class="locatingButton moveButton" id=${moveRightButtonId}>Move Right</button>
            <button class="locatingButton moveButton" id=${moveLeftButtonId}>Move Left</button>
            <button class="locatingButton moveButton rotateButton" id=${rotateRightButtonId}>Rotate Right</button>
            <button class="locatingButton moveButton rotateButton" id=${rotateLeftButtonId}>Rotate Left</button>
            <button class="locatingButton" id=${placeTheBattleshipButtonId}>Place the battleship</button>
            <button class="locatingButton" id=${resetBattleshipStateButtonId}>Reset battleship state</button>`;
        buttonsDiv.style.border = "solid";
        buttonsDiv.style.width = `${boardToLocateElementOn.querySelector("tbody").offsetWidth}px`;
        boardToLocateElementOn.appendChild(buttonsDiv);
    }

    _removeButtons(){
        let buttonsDiv = document.getElementById(buttonsDivId);
        this.boardToLocateOnElement.element.removeChild(buttonsDiv);
    }

    _resetMessagesFromLocator(){
        this.messageBox.clear();
    }

    _initLocation(){
        this.startRowIndex = 0;
        this.startColumnIndex = 0;
    }

    _shouldDisableAllButtons(shouldDisable){
        this.moveRightButton.disabled = shouldDisable;
        this.moveLeftButton.disabled = shouldDisable;
        this.moveUpButton.disabled = shouldDisable;
        this.moveDownButton.disabled = shouldDisable;
        this.rotateRightButton.disabled = shouldDisable;
        this.rotateLeftButton.disabled = shouldDisable;
        this.resetBattleshipStateButton.disabled = shouldDisable;
        this.placeTheBattleshipButton.disabled = shouldDisable;
    }

    _disableButtonIfNecessary(buttonElement, isPossibleFunction){
        buttonElement.disabled = !isPossibleFunction.call(this);
    }

    _addButtonsListeners() {
        this.moveRightButton.onclick = () => {
            this._handleMoveRight();
        };
        this.moveLeftButton.onclick = () => {
            this._handleMoveLeft();
        };
        this.moveUpButton.onclick = () => {
            this._handleMoveUp();
        };
        this.moveDownButton.onclick = () => {
            this._handleMoveDown();
        };
        let rotateButtons = document.getElementsByClassName("rotateButton");
        Array.from(rotateButtons).forEach((rotateButton) => {
            rotateButton.onclick = () => {
                this._handleRotate();
            }
        });
        this.resetBattleshipStateButton.onclick = () => {
            this._handleResetBattleshipState();
        };
        this.placeTheBattleshipButton.onclick = () => {
            this._handlePlaceTheBattleship();
        };
    }

    _addKeysListeners(){
        this.boardToLocateOnElement.element.addEventListener("keydown", (event) => {
            let pressedKey = event.key;
            if (pressedKey === "ArrowUp"
                || pressedKey === "ArrowDown"
                || pressedKey === "ArrowRight"
                || pressedKey === "ArrowLeft"
                || pressedKey === " ") {
                event.preventDefault();
                if(pressedKey === "ArrowUp"){
                    this._handleMoveUp();
                }
                else if(pressedKey === "ArrowDown"){
                    this._handleMoveDown();
                }
                else if(pressedKey === "ArrowRight"){
                    this._handleMoveRight();
                }
                else if(pressedKey === "ArrowLeft"){
                    this._handleMoveLeft();
                }
                else if(pressedKey === " "){
                    this._handlePlaceTheBattleship();
                }
            }
        })
    }

    _validateMovingRightPossibility(){
        if(this.isHorizontal){
            if(this.startColumnIndex + this.length < this.boardWidthCellsNumber){
                return true;
            }
        }
        else{
            if(this.startColumnIndex + 1 < this.boardWidthCellsNumber){
                return true;
            }
        }
        return false;
    }

    _validateMovingLeftPossibility(){
        return this.startColumnIndex - 1 >= 0;
    }

    _validateMovingUpPossibility(){
        return this.startRowIndex - 1 >= 0;
    }

    _validateMovingDownPossibility(){
        if(this.isHorizontal){
            if(this.startRowIndex + 1 < this.boardHeightCellsNumber){
                return true;
            }
        }
        else {
            if(this.startRowIndex + this.length < this.boardHeightCellsNumber){
                return true;
            }
        }
        return false;
    }

    _valuateButtons(){
        if(!this.isActive){
            return;
        }
        this._disableButtonIfNecessary(this.moveRightButton, this._validateMovingRightPossibility);
        this._disableButtonIfNecessary(this.moveLeftButton, this._validateMovingLeftPossibility);
        this._disableButtonIfNecessary(this.moveUpButton, this._validateMovingUpPossibility);
        this._disableButtonIfNecessary(this.moveDownButton, this._validateMovingDownPossibility);
    }

    _handleMoveRight(){
        if(!this.isActive){
            return;
        }
        if(this._validateMovingRightPossibility()){
            this.startColumnIndex += 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this.moveRightButton, this._validateMovingRightPossibility);
    }

    _handleMoveLeft(){
        if(!this.isActive){
            return;
        }
        if(this._validateMovingLeftPossibility()) {
            this.startColumnIndex -= 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this.moveLeftButton, this._validateMovingLeftPossibility);
    }

    _handleMoveUp(){
        if(!this.isActive){
            return;
        }
        if(this._validateMovingUpPossibility()){
            this.startRowIndex -= 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this.moveUpButton, this._validateMovingUpPossibility);
    }

    _handleMoveDown(){
        if(!this.isActive){
            return;
        }
        if(this._validateMovingDownPossibility()){
            this.startRowIndex += 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this.moveDownButton, this._validateMovingDownPossibility);
    }

    _handleRotate(){
        if(!this.isActive){
            return;
        }
        this.isHorizontal = !this.isHorizontal;
        this._initLocation();
        this._renderBattleship();
        this._valuateButtons();
    }

    _handleResetBattleshipState(){
        if(!this.isActive){
            return;
        }
        this.isHorizontal = true;
        this._initLocation();
        this._renderBattleship();
        this._valuateButtons();
    }

    _handlePlaceTheBattleship(){
        if(!this.isActive){
            return;
        }
        InitializeBoardEmitters.locateABattleship(this.server, this.startRowIndex, this.startColumnIndex, this.length, this.isHorizontal);
    }

    _renderBattleship(){
        BattleshipLocator._initCellsConsideredToLocateBattleship();
        if(!this.isActive){
            return;
        }
        if(this.isHorizontal){
            for(let columnIndex = this.startColumnIndex; columnIndex < this.startColumnIndex + this.length; columnIndex++){
                this.boardToLocateOnElement.cells[this.startRowIndex][columnIndex].markAsConsideredOfPlacingBattleship();
            }
        }
        else{
            for(let rowIndex = this.startRowIndex; rowIndex < this.startRowIndex + this.length; rowIndex++){
                this.boardToLocateOnElement.cells[rowIndex][this.startColumnIndex].markAsConsideredOfPlacingBattleship();
            }
        }
    }
}