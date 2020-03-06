'use strict';
import MessageBox from './src/models/messageBox.js';
import UserBoard from './src/models/board/userBoard.js';
import OpponentBoard from './src/models/board/opponentBoard.js';
import initializeBoardListeners from './src/events/initializeBoardEvents/initializeBoardListeners.js';
import BattleshipLocator from "./src/components/battleshipLocator.js";


const BOARD_LENGTH = 10;
const userBoardId = "user-board";
const opponentBoardId = "opponent-board";

const messageBox = new MessageBox();
const userBoard = new UserBoard(userBoardId, BOARD_LENGTH, BOARD_LENGTH);
const opponentBoard = new OpponentBoard(opponentBoardId, BOARD_LENGTH, BOARD_LENGTH);

console.log("i am here");

window.addEventListener("beforeunload", (event) => {
    event.returnValue = ''; // When changing this value to value other then null or undefined, it prompt the message (in old browsers it prompt tje string set to the property)
});

const socket = io.connect("localhost:3000");
initializeBoardListeners(socket, messageBox, BOARD_LENGTH, userBoard);
