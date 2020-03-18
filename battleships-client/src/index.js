'use strict';
import CONFIG from './config.js';
import MessageBox from './models/message-box.js';
import UserBoard from './models/board/user-board.js';
import OpponentBoard from './models/board/opponent-board.js';
import initializeBoardListeners from './events/initialize-board-events/initialize-board-listeners.js';
import gameMovesListeners from './events/game-moves-events/game-moves-listeners.js';
import disconnectionListeners from './events/disconnection-events/disconnection-listeners.js';
import { alertBeforeUnload } from './static-methods/session-methods.js'


const userBoardId = "user-board";
const opponentBoardId = "opponent-board";
const startButton = document.getElementById("start-button");

const messageBox = new MessageBox();
const userBoard = new UserBoard(userBoardId);
const opponentBoard = new OpponentBoard(opponentBoardId);

function addGameListeners(socket, buttonToRemove){
    initializeBoardListeners(socket, messageBox, userBoard, opponentBoard, buttonToRemove);
    gameMovesListeners(socket, messageBox, userBoard, opponentBoard);
    disconnectionListeners(socket);
}

/*function beforeunloadFunc(event){
    event.returnValue = ''; // When changing this value to value other then null or undefined, it prompt the message (in old browsers it prompt tje string set to the property)
}*/

/*function abortBeforeunoladFunc(beforeunloadFuncToAbort){
    window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
    window.location.reload();
}*/

messageBox.pushMessage("Please click on \"Find me an opponent\" button to start");

let isStartButtonClicked = false;
startButton.onclick = () => {
    if(isStartButtonClicked){
        return;
    }
    // window.addEventListener("beforeunload", beforeunloadFunc);
    window.addEventListener("beforeunload", alertBeforeUnload);
    isStartButtonClicked = true;
    startButton.disabled = true;
    messageBox.popMessage();
    messageBox.pushMessage("Looking for an opponent. Please wait.");
    const socket = io.connect(`${CONFIG.serverHost}:${CONFIG.serverPort}`);
    addGameListeners(socket, startButton);
};




