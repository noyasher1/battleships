'use strict';
import MessageBox from './src/models/messageBox.js';
import UserBoard from './src/models/board/userBoard.js';
import OpponentBoard from './src/models/board/opponentBoard.js';
//import { BattleshipLocator }  from './battleshipLocator.js';
import BattleshipLocator from './battleshipLocator.js';
const socket = io.connect("localhost:3000");

const BOARD_LENGTH = 10;
const userBoardId = "user-board";
const opponentBoardId = "opponent-board";

const messageBox = new MessageBox();
const userBoard = new UserBoard(userBoardId, BOARD_LENGTH, BOARD_LENGTH);
const opponentBoard = new OpponentBoard(opponentBoardId, BOARD_LENGTH, BOARD_LENGTH);

//let battleshipLocator = BattleshipLocator.instance;
let battleshipLocator;

console.log("i am here");

window.addEventListener("beforeunload", (event) => {
    event.returnValue = ''; // When changing this value to value other then null or undefined, it prompt the message (in old browsers it prompt tje string set to the property)
});

/*socket.on("AskForABattleship", (data) => {
    console.log(data.length);
    battleshipLocator.length = data.length;
    battleshipLocator.initLocation();
});*/
socket.on("AskForStartLocating", () => {
    battleshipLocator = new BattleshipLocator(socket, userBoard, BOARD_LENGTH, messageBox);
    console.log("askForStartLocating")

});

socket.on("AskForABattleship", (data) => {
    console.log(data.length);
    battleshipLocator.startLocating(data.length);
});

socket.emit("myEvent", {
    id: "VerySpecialId"
});

socket.on("LocateABattleshipStatus", (data) => {
    console.log(data);
    console.log("is cells undefined = " + (userBoard.cells === undefined).toString());
    if(data.status === "succeed"){
        userBoard.locateABattleship(data.startRowIndex, data.startColumnIndex, data.length, data.isHorizontal);
        battleshipLocator.finishLocating();
    }
    console.log(data.status);
});

socket.on("AllBattleshipsAreLocated", () => {
    battleshipLocator.allBattleshipsAreLocated();
    messageBox.pushMessage("Nice! you have located all the battleships.\n"
        + "Please wait for your opponent to finish locating his.");
});