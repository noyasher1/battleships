'use strict';
import MessageBox from './src/models/messageBox.js';
import UserBoard from './src/models/board/userBoard.js';
import OpponentBoard from './src/models/board/opponentBoard.js';
import initializeBoardListeners from './src/events/initializeBoardEvents/initializeBoardListeners.js';
import gameMovesListeners from './src/events/gameMovesEvents/gameMovesListeners.js';
import BattleshipLocator from "./src/components/battleshipLocator.js";


const BOARD_LENGTH = 10;
const userBoardId = "user-board";
const opponentBoardId = "opponent-board";
const startButton = document.getElementById("startButton");

const messageBox = new MessageBox();
const userBoard = new UserBoard(userBoardId, BOARD_LENGTH, BOARD_LENGTH);
const opponentBoard = new OpponentBoard(opponentBoardId, BOARD_LENGTH, BOARD_LENGTH);

function addGameListeners(socket, buttonToRemove){
    initializeBoardListeners(socket, messageBox, userBoard, opponentBoard, buttonToRemove);
    gameMovesListeners(socket, messageBox, userBoard, opponentBoard, beforeunloadFunc)
}

console.log("i am here");

function beforeunloadFunc(event){
    event.returnValue = ''; // When changing this value to value other then null or undefined, it prompt the message (in old browsers it prompt tje string set to the property)
}

messageBox.pushMessage("Please click on \"Find me an opponent\" button to start");

let isStartButtonClicked = false;
startButton.onclick = () => {
    if(isStartButtonClicked){
        return;
    }
    window.addEventListener("beforeunload", beforeunloadFunc);
    isStartButtonClicked = true;
    startButton.disabled = true;
    messageBox.popMessage();
    messageBox.pushMessage("Looking for an opponent. Please wait.");
    const socket = io.connect("localhost:3000");
    addGameListeners(socket, startButton)
};




