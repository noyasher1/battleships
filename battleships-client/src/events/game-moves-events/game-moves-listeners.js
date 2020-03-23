'use strict';
import GameMovesHandlers from './game-moves-handlers.js'

export default (socket, messageBox, userBoard, opponentBoard) => {
    // Why is the handle of startGame in game-moves-listeners.
    socket.on("StartGame", (data) => {
        GameMovesHandlers.startGameHandler(socket, data.isStart, messageBox, userBoard, opponentBoard);
    });

    socket.on("UserMoveStatus", (data) =>{
        GameMovesHandlers.userMoveStatusHandler(data, messageBox, opponentBoard, userBoard)
    });

    socket.on("OpponentMove", (data) => {
        GameMovesHandlers.opponentMoveHandler(data, messageBox, userBoard, opponentBoard);
    });
}