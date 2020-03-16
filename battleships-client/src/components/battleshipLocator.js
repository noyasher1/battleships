"use strict";
import InitializeBoardEmitters from "../events/initializeBoardEvents/initializeBoardEmitters.js"

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
        this.length = undefined;
        this.isHorizontal = true;
        this.startRowIndex = 0;
        this.startColumnIndex = 0;
        this.addButtons();
        this.moveRightButton = document.getElementById(moveRightButtonId);
        this.moveLeftButton = document.getElementById(moveLeftButtonId);
        this.moveUpButton = document.getElementById(moveUpButtonId);
        this.moveDownButton = document.getElementById(moveDownButtonId);
        this.rotateRightButton = document.getElementById(rotateRightButtonId);
        this.rotateLeftButton = document.getElementById(rotateLeftButtonId);
        this.resetBattleshipStateButton = document.getElementById(resetBattleshipStateButtonId);
        this.placeTheBattleshipButton = document.getElementById(placeTheBattleshipButtonId);
        this.addButtonsListeners();
        this.addKeysListeners();
        this.shouldDisableAllButtons(true);
        this.initMessageBox();
    }

    startLocating(length){
        this.isActive = true;
        this.length = length;
        this.isHorizontal = true;
        this.initLocation();
        this.renderBattleship();
        this.shouldDisableAllButtons(false);
        this.valuateButtons();
        this.messageBox.pushMessage(`Please place a battleship with a length of ${this.length} cells.`)
    }

    finishLocating(){
        this.isActive = false;
        this.length = undefined;
        this.initLocation();
        this.renderBattleship();
        this.shouldDisableAllButtons(true);
        this.messageBox.popMessage()
    }

    initMessageBox(){
        this.messageBox.pushMessage("Please start locate your battleships.\n"
            + "You can place your battleship only vertically or horizontally, Not diagonally.\n"
            + "You must have a space of at least one cell between one battleship to another.\n"
            + "You can use the buttons below the board or keyboard.\n"
            + "In keyboard use arrow keys to move, and space to determine the location.")
    }

    addButtons(){
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

    removeButtons(){
        let buttonsDiv = document.getElementById(buttonsDivId);
        this.boardToLocateOnElement.element.removeChild(buttonsDiv);
    }

    resetMessagesFromLocator(){
        this.messageBox.clear();
    }

    allBattleshipsAreLocated(){
        this.removeButtons();
        this.resetMessagesFromLocator();
    }

    initLocation(){
        this.startRowIndex = 0;
        this.startColumnIndex = 0;
    }

    initCellsConsideredToLocateBattleship(){
        document.querySelectorAll(".considered-to-contain-battleship").forEach(cell => cell.classList.remove("considered-to-contain-battleship"))
    }

    shouldDisableAllButtons(shouldDisable){
        this.moveRightButton.disabled = shouldDisable;
        this.moveLeftButton.disabled = shouldDisable;
        this.moveUpButton.disabled = shouldDisable;
        this.moveDownButton.disabled = shouldDisable;
        this.rotateRightButton.disabled = shouldDisable;
        this.rotateLeftButton.disabled = shouldDisable;
        this.resetBattleshipStateButton.disabled = shouldDisable;
        this.placeTheBattleshipButton.disabled = shouldDisable;
    }

    disableButtonIfNecessary(buttonElement, isPossibleFunction){
        buttonElement.disabled = !isPossibleFunction.call(this);
    }

    addButtonsListeners() {
        this.moveRightButton.onclick = () => {
            this.handleMoveRight();
        };
        this.moveLeftButton.onclick = () => {
            this.handleMoveLeft();
        };
        this.moveUpButton.onclick = () => {
            this.handleMoveUp();
        };
        this.moveDownButton.onclick = () => {
            this.handleMoveDown();
        };
        let rotateButtons = document.getElementsByClassName("rotateButton");
        Array.from(rotateButtons).forEach((rotateButton) => {
            rotateButton.onclick = () => {
                this.handleRotate();
            }
        });
        this.resetBattleshipStateButton.onclick = () => {
            this.handleResetBattleshipState();
        };
        this.placeTheBattleshipButton.onclick = () => {
            this.handlePlaceTheBattleship();
        };
    }

    addKeysListeners(){
        this.boardToLocateOnElement.element.addEventListener("keydown", (event) => {
            let pressedKey = event.key;
            if (pressedKey === "ArrowUp"
                || pressedKey === "ArrowDown"
                || pressedKey === "ArrowRight"
                || pressedKey === "ArrowLeft"
                || pressedKey === " ") {
                event.preventDefault();
                if(pressedKey === "ArrowUp"){
                    this.handleMoveUp();
                }
                else if(pressedKey === "ArrowDown"){
                    this.handleMoveDown();
                }
                else if(pressedKey === "ArrowRight"){
                    this.handleMoveRight();
                }
                else if(pressedKey === "ArrowLeft"){
                    this.handleMoveLeft();
                }
                else if(pressedKey === " "){
                    this.handlePlaceTheBattleship();
                }
            }
        })
    }

    validateMovingRightPossibility(){
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

    validateMovingLeftPossibility(){
        return this.startColumnIndex - 1 >= 0;
    }

    validateMovingUpPossibility(){
        return this.startRowIndex - 1 >= 0;
    }

    validateMovingDownPossibility(){
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

    valuateButtons(){
        if(!this.isActive){
            return;
        }
        this.disableButtonIfNecessary(this.moveRightButton, this.validateMovingRightPossibility);
        this.disableButtonIfNecessary(this.moveLeftButton, this.validateMovingLeftPossibility);
        this.disableButtonIfNecessary(this.moveUpButton, this.validateMovingUpPossibility);
        this.disableButtonIfNecessary(this.moveDownButton, this.validateMovingDownPossibility);
    }

    handleMoveRight(){
        if(!this.isActive){
            return;
        }
        if(this.validateMovingRightPossibility()){
            this.startColumnIndex += 1;
            this.renderBattleship();
            this.valuateButtons();
        }
        this.disableButtonIfNecessary(this.moveRightButton, this.validateMovingRightPossibility);
    }

    handleMoveLeft(){
        if(!this.isActive){
            return;
        }
        if(this.validateMovingLeftPossibility()) {
            this.startColumnIndex -= 1;
            this.renderBattleship();
            this.valuateButtons();
        }
        this.disableButtonIfNecessary(this.moveLeftButton, this.validateMovingLeftPossibility);
    }

    handleMoveUp(){
        if(!this.isActive){
            return;
        }
        if(this.validateMovingUpPossibility()){
            this.startRowIndex -= 1;
            this.renderBattleship();
            this.valuateButtons();
        }
        this.disableButtonIfNecessary(this.moveUpButton, this.validateMovingUpPossibility);
    }

    handleMoveDown(){
        if(!this.isActive){
            return;
        }
        if(this.validateMovingDownPossibility()){
            this.startRowIndex += 1;
            this.renderBattleship();
            this.valuateButtons();
        }
        this.disableButtonIfNecessary(this.moveDownButton, this.validateMovingDownPossibility);
    }

    handleRotate(){
        if(!this.isActive){
            return;
        }
        this.isHorizontal = !this.isHorizontal;
        this.initLocation();
        this.renderBattleship();
        this.valuateButtons();
    }

    handleResetBattleshipState(){
        if(!this.isActive){
            return;
        }
        this.isHorizontal = true;
        this.initLocation();
        this.renderBattleship();
        this.valuateButtons();
    }

    handlePlaceTheBattleship(){
        if(!this.isActive){
            return;
        }
        InitializeBoardEmitters.locateABattleship(this.server, this.startRowIndex, this.startColumnIndex, this.length, this.isHorizontal);
    }

    renderBattleship(){
        this.initCellsConsideredToLocateBattleship();
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