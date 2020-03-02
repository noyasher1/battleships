'use strict';

import Board from './src/models/board.js';
//import { BattleshipLocator }  from './battleshipLocator.js';
import BattleshipLocator from './battleshipLocator.js';
const socket = io.connect("localhost:3000");

const ROWS_COUNT = 10;
const COLUMNS_COUNT = 10;
const userBoardId = "user-board";
const opponentBoardId = "opponent-board";

const userBoard = new Board(userBoardId, ROWS_COUNT, COLUMNS_COUNT);
const opponentBoard = new Board(opponentBoardId, ROWS_COUNT, COLUMNS_COUNT);

//let battleshipLocator = BattleshipLocator.instance;
let battleshipLocator;

console.log("i am here");

/*socket.on("AskForABattleship", (data) => {
    console.log(data.length);
    battleshipLocator.length = data.length;
    battleshipLocator.initLocation();
});*/
socket.on("AskForStartLocating", () => {
    battleshipLocator = new BattleshipLocator(socket, userBoard);
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