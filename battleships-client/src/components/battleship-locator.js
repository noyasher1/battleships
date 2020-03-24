"use strict";
import InitializeBoardEmitters from "../events/initialize-board-events/initialize-board-emitters.js"

// CR: this file is a monstrosity, very long and very hard to follow. try to split to smaller parts
// CR: separate business logic from UI logic

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
    constructor(server, boardToLocateOn, _messageBox){
        this.server = server;
        this._isActive = false;
        this._boardToLocateOnElement = boardToLocateOn;
        this._boardHeightCellsNumber = this._boardToLocateOnElement.columnsNumber;
        this._boardWidthCellsNumber = this._boardToLocateOnElement.rowsNumber;
        this._messageBox = _messageBox;
        this._length = null;
        this._isHorizontal = true;
        this._startRowIndex = 0;
        this._startColumnIndex = 0;
        this._addButtons();
        this._moveRightButton = document.getElementById(moveRightButtonId);
        this._moveLeftButton = document.getElementById(moveLeftButtonId);
        this._moveUpButton = document.getElementById(moveUpButtonId);
        this._moveDownButton = document.getElementById(moveDownButtonId);
        this._rotateRightButton = document.getElementById(rotateRightButtonId);
        this._rotateLeftButton = document.getElementById(rotateLeftButtonId);
        this._resetBattleshipStateButton = document.getElementById(resetBattleshipStateButtonId);
        this._placeTheBattleshipButton = document.getElementById(placeTheBattleshipButtonId);
        this._addButtonsListeners();
        this._addKeysListeners();
        this._shouldDisableAllButtons(true);
        this._initMessageBox();
    }

    static _initCellsConsideredToLocateBattleship(){
        document.querySelectorAll(".considered-to-contain-battleship").forEach(cell => cell.classList.remove("considered-to-contain-battleship"))
    }

    startLocating(length){
        this._isActive = true;
        this._length = length;
        this._isHorizontal = true;
        this._initLocation();
        this._renderBattleship();
        this._shouldDisableAllButtons(false);
        this._valuateButtons();
        this._messageBox.pushMessage(`Please place a battleship with a length of ${this._length} cells.`)
    }

    finishLocating(){
        this._isActive = false;
        this._length = null;
        this._initLocation();
        this._renderBattleship();
        this._shouldDisableAllButtons(true);
        this._messageBox.popMessage()
    }

    allBattleshipsAreLocated(){
        this._removeButtons();
        this._resetMessagesFromLocator();
    }

    _initMessageBox(){
        this._messageBox.pushMessage("Please start locate your battleships.\n"
            + "You can place your battleship only vertically or horizontally, Not diagonally.\n"
            + "You must have a space of at least one cell between one battleship to another.\n"
            + "You can use the buttons below the board or keyboard.\n"
            + "In keyboard use arrow keys to move, and space to determine the location.")
    }

    _addButtons(){
        let boardToLocateElementOn = this._boardToLocateOnElement.element;
        let buttonsDiv = document.createElement("div");
        buttonsDiv.id = buttonsDivId;
        // CR: it's funny that the move right button is on the left ;)
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
        this._boardToLocateOnElement.element.removeChild(buttonsDiv);
    }

    _resetMessagesFromLocator(){
        this._messageBox.clear();
    }

    _initLocation(){
        this._startRowIndex = 0;
        this._startColumnIndex = 0;
    }

    _shouldDisableAllButtons(shouldDisable){
        this._moveRightButton.disabled = shouldDisable;
        this._moveLeftButton.disabled = shouldDisable;
        this._moveUpButton.disabled = shouldDisable;
        this._moveDownButton.disabled = shouldDisable;
        this._rotateRightButton.disabled = shouldDisable;
        this._rotateLeftButton.disabled = shouldDisable;
        this._resetBattleshipStateButton.disabled = shouldDisable;
        this._placeTheBattleshipButton.disabled = shouldDisable;
    }

    _disableButtonIfNecessary(buttonElement, isPossibleFunction){
        buttonElement.disabled = !isPossibleFunction.call(this);
    }

    _addButtonsListeners() {
        this._moveRightButton.onclick = () => {
            this._handleMoveRight();
        };
        this._moveLeftButton.onclick = () => {
            this._handleMoveLeft();
        };
        this._moveUpButton.onclick = () => {
            this._handleMoveUp();
        };
        this._moveDownButton.onclick = () => {
            this._handleMoveDown();
        };
        let rotateButtons = document.getElementsByClassName("rotateButton");
        Array.from(rotateButtons).forEach((rotateButton) => {
            rotateButton.onclick = () => {
                this._handleRotate();
            }
        });
        this._resetBattleshipStateButton.onclick = () => {
            this._handleResetBattleshipState();
        };
        this._placeTheBattleshipButton.onclick = () => {
            this._handlePlaceTheBattleship();
        };
    }

    _addKeysListeners(){
        this._boardToLocateOnElement.element.addEventListener("keydown", (event) => {
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
        if(this._isHorizontal){
            if(this._startColumnIndex + this._length < this._boardWidthCellsNumber){
                return true;
            }
        }
        else{
            if(this._startColumnIndex + 1 < this._boardWidthCellsNumber){
                return true;
            }
        }
        return false;
    }

    _validateMovingLeftPossibility(){
        return this._startColumnIndex - 1 >= 0;
    }

    _validateMovingUpPossibility(){
        return this._startRowIndex - 1 >= 0;
    }

    _validateMovingDownPossibility(){
        if(this._isHorizontal){
            if(this._startRowIndex + 1 < this._boardHeightCellsNumber){
                return true;
            }
        }
        else {
            if(this._startRowIndex + this._length < this._boardHeightCellsNumber){
                return true;
            }
        }
        return false;
    }

    _valuateButtons(){
        if(!this._isActive){
            return;
        }
        this._disableButtonIfNecessary(this._moveRightButton, this._validateMovingRightPossibility);
        this._disableButtonIfNecessary(this._moveLeftButton, this._validateMovingLeftPossibility);
        this._disableButtonIfNecessary(this._moveUpButton, this._validateMovingUpPossibility);
        this._disableButtonIfNecessary(this._moveDownButton, this._validateMovingDownPossibility);
    }

    _handleMoveRight(){
        if(!this._isActive){
            return;
        }
        if(this._validateMovingRightPossibility()){
            this._startColumnIndex += 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this._moveRightButton, this._validateMovingRightPossibility);
    }

    _handleMoveLeft(){
        if(!this._isActive){
            return;
        }
        if(this._validateMovingLeftPossibility()) {
            this._startColumnIndex -= 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this._moveLeftButton, this._validateMovingLeftPossibility);
    }

    _handleMoveUp(){
        if(!this._isActive){
            return;
        }
        if(this._validateMovingUpPossibility()){
            this._startRowIndex -= 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this._moveUpButton, this._validateMovingUpPossibility);
    }

    _handleMoveDown(){
        if(!this._isActive){
            return;
        }
        if(this._validateMovingDownPossibility()){
            this._startRowIndex += 1;
            this._renderBattleship();
            this._valuateButtons();
        }
        this._disableButtonIfNecessary(this._moveDownButton, this._validateMovingDownPossibility);
    }

    _handleRotate(){
        if(!this._isActive){
            return;
        }
        this._isHorizontal = !this._isHorizontal;
        this._initLocation();
        this._renderBattleship();
        this._valuateButtons();
    }

    _handleResetBattleshipState(){
        if(!this._isActive){
            return;
        }
        this._isHorizontal = true;
        this._initLocation();
        this._renderBattleship();
        this._valuateButtons();
    }

    _handlePlaceTheBattleship(){
        if(!this._isActive){
            return;
        }
        InitializeBoardEmitters.locateABattleship(this.server, this._startRowIndex, this._startColumnIndex, this._length, this._isHorizontal);
    }

    _renderBattleship(){
        BattleshipLocator._initCellsConsideredToLocateBattleship();
        if(!this._isActive){
            return;
        }
        if(this._isHorizontal){
            for(let columnIndex = this._startColumnIndex; columnIndex < this._startColumnIndex + this._length; columnIndex++){
                this._boardToLocateOnElement.cells[this._startRowIndex][columnIndex].markAsConsideredOfPlacingBattleship();
            }
        }
        else{
            for(let rowIndex = this._startRowIndex; rowIndex < this._startRowIndex + this._length; rowIndex++){
                this._boardToLocateOnElement.cells[rowIndex][this._startColumnIndex].markAsConsideredOfPlacingBattleship();
            }
        }
    }
}