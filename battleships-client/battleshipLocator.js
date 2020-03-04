"use strict";
import LocatingEmitters from "./src/events/locatingEmitters.js"
//let _battleshipToLocate = null;
//export class BattleshipLocator{
export default class BattleshipLocator{
    constructor(server, boardToLocateOn, boardLength = 10){
        this.server = server;
        this.isActive = false;
        this.boardToLocateOnElement = boardToLocateOn;
        this.boardLength = boardLength;
        this.length = undefined;
        this.isHorizontal = true;
        this.startRowIndex = 0;
        this.startColumnIndex = 0;
        this.addButtons();
        this.moveRightButton = document.getElementById("moveRight");
        this.moveLeftButton = document.getElementById("moveLeft");
        this.moveUpButton = document.getElementById("moveUp");
        this.moveDownButton = document.getElementById("moveDown");
        this.rotateRightButton = document.getElementById("rotateRight");
        this.rotateLeftButton = document.getElementById("rotateLeft");
        this.resetBattleshipStateButton = document.getElementById("resetBattleshipState");
        this.placeTheBattleshipButton = document.getElementById("placeTheBattleship");
        this.addButtonsListeners();
        this.addKeysListeners();
        this.shouldDisableAllButtons(true);
    }

    /*static get instance(){
        return _battleshipToLocate ? _battleshipToLocate : _battleshipToLocate = new BattleshipLocator(document.getElementById("user-board"), 10);
    }*/
    startLocating(length){
        this.isActive = true;
        this.length = length;
        this.isHorizontal = true;
        this.initLocation();
        this.renderBattleship();
        this.shouldDisableAllButtons(false);
        this.valuateButtons();
    }

    finishLocating(){
        this.isActive = false;
        this.length = undefined;
        this.initLocation();
        this.renderBattleship();
        this.shouldDisableAllButtons(true);
    }

    addButtons(){
        let buttonsDiv = document.createElement("div");
        buttonsDiv.className = 'rollingBattleshipLocation';
        buttonsDiv.innerHTML = `
            <button class="locatingButton moveButton" id="moveUp">Move Up</button>
            <button class="locatingButton moveButton" id="moveDown">Move Down</button>
            <button class="locatingButton moveButton" id="moveRight">Move Right</button>
            <button class="locatingButton moveButton" id="moveLeft">Move Left</button>
            <button class="locatingButton moveButton rotateButton" id="rotateRight">Rotate Right</button>
            <button class="locatingButton moveButton rotateButton" id="rotateLeft">Rotate Left</button>
            <button class="locatingButton" id="placeTheBattleship">Place the battleship</button>
            <button class="locatingButton" id="resetBattleshipState">Reset battleship state</button>`;

        this.boardToLocateOnElement.element.appendChild(buttonsDiv);
    }

    initLocation(){
        this.startRowIndex = 0;
        this.startColumnIndex = 0;
    }

    initConsideredCells(){
        //TODO: should I renderBattleship all the board again every time, or in each moveX() function remove the last (irrelevant) cells and update their classes.
        document.querySelectorAll(".consideredToContainBattleship").forEach(cell => cell.classList.remove("consideredToContainBattleship"))
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
        if(!isPossibleFunction.call(this)){
            buttonElement.disabled = true;
        }
        else{
            buttonElement.disabled = false;
        }
    }

    addButtonsListeners() {
        this.moveRightButton.onclick = () => {
            if(!this.isActive){
                return;
            }
            this.moveRight();
            this.disableButtonIfNecessary(this.moveRightButton, this.validateMovingRightPossibility);
        };
        this.moveLeftButton.onclick = () => {
            if(!this.isActive){
                return;
            }
            this.moveLeft();
            this.disableButtonIfNecessary(this.moveLeftButton, this.validateMovingLeftPossibility);
        };
        this.moveUpButton.onclick = () => {
            if(!this.isActive){
                return;
            }
            this.moveUp();
            this.disableButtonIfNecessary(this.moveUpButton, this.validateMovingUpPossibility);
        };
        this.moveDownButton.onclick = () => {
            if(!this.isActive){
                return;
            }
            this.moveDown();
            this.disableButtonIfNecessary(this.moveDownButton, this.validateMovingDownPossibility);
        };
        let rotateButtons = document.getElementsByClassName("rotateButton");
        Array.from(rotateButtons).forEach((rotateButton) => {
            rotateButton.onclick = () => {
                if(!this.isActive){
                    return;
                }
                this.isHorizontal = !this.isHorizontal;
                this.initLocation();
                this.renderBattleship();
                this.valuateButtons();
            }
        });
        this.resetBattleshipStateButton.onclick = () => {
            if(!this.isActive){
                return;
            }
            this.isHorizontal = true;
            this.initLocation();
            this.renderBattleship();
            this.valuateButtons();
        };
        this.placeTheBattleshipButton.onclick = () => {
            if(!this.isActive){
                return;
            }
            LocatingEmmiters.locateABattleship(this.server, this.startRowIndex, this.startColumnIndex, this.length, this.isHorizontal);
        };
    }

    addKeysListeners(){
        this.boardToLocateOnElement.element.addEventListener("focus", () => {
            this.boardToLocateOnElement.element.addEventListener("keydown", (event) => {
                let pressedKey = event.key;
                if (pressedKey === "ArrowUp"
                    || pressedKey === "ArrowDown"
                    || pressedKey === "ArrowRight"
                    || pressedKey === "ArrowLeft"
                    || pressedKey === " ") {
                    event.preventDefault();
                    if(pressedKey === "ArrowUp"){
                        this.moveUpButton.click();
                    }
                    else if(pressedKey === "ArrowDown"){
                        this.moveDownButton.click();
                    }
                    else if(pressedKey === "ArrowRight"){
                        this.moveRightButton.click();
                    }
                    else if(pressedKey === "ArrowLeft"){
                        this.moveLeftButton.click();
                    }
                    else if(pressedKey === " "){
                        this.placeTheBattleshipButton.click();
                    }
                }
            })
        })
    }

    validateMovingRightPossibility(){
        if(this.isHorizontal){
            if(this.startColumnIndex + this.length < this.boardLength){
                return true;
            }
        }
        else{
            if(this.startColumnIndex + 1 < this.boardLength){
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
            if(this.startRowIndex + 1 < this.boardLength){
                return true;
            }
        }
        else {
            if(this.startRowIndex + this.length < this.boardLength){
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

    moveRight(){
        if(this.validateMovingRightPossibility()){
            this.startColumnIndex += 1;
            this.renderBattleship();
            this.valuateButtons();
        }
    }

    moveLeft(){
        if(this.validateMovingLeftPossibility()){
            this.startColumnIndex -= 1;
            this.renderBattleship();
            this.valuateButtons();
        }
    }

    moveUp(){
        if(this.validateMovingUpPossibility()){
            this.startRowIndex -= 1;
            this.renderBattleship();
            this.valuateButtons();
        }
    }

    moveDown(){
        if(this.validateMovingDownPossibility()){
            this.startRowIndex += 1;
            this.renderBattleship();
            this.valuateButtons();
        }
    }

    renderBattleship(){
        this.initConsideredCells();
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