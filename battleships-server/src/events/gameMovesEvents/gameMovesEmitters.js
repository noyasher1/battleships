'use strict';

module.exports = class InitializeBoardsEmitters{
    static startGame(socket, isStart){//send for each user, one with isStart=true, the other false.
            socket.emit("StartGame", {
                isStart
            });
    }

    static opponentMove(socket, rowIndex, columnIndex, isContainBattleship, isOpponentWon){
        socket.emit("OpponentMove", {
            rowIndex,
            columnIndex,
            isContainBattleship,
            isOpponentWon
        })
    };

    /*static yourTurn(socket) {
        socket.emit("YourTurn");
    };*/

    static userMoveStatus(socket, isSucceed, rowIndex, columnIndex, isContainBattleship, amIWinner){
        socket.emit("UserMoveStatus", {
            isSucceed,
            rowIndex,
            columnIndex,
            isContainBattleship,
            amIWinner
        })
    }
};