'use strict';

module.exports = class InitializeBoardsEmitters{
    static askForStartLocating(server, rowsNumber, columnsNumber) {
        server.emit("AskForStartLocating", {
            rowsNumber,
            columnsNumber
        })
    }

    static askForABattleship(socket, length){
        socket.emit("AskForABattleship", {
            length
        })
    }

    static locateABattleshipStatus(socket, startRowIndex, startColumnIndex, length, isHorizontal, status){
        socket.emit("LocateABattleshipStatus", {
            startRowIndex,
            startColumnIndex,
            length,
            isHorizontal,
            status
        })
    }

    static allBattleshipsAreLocated(socket){
        socket.emit("AllBattleshipsAreLocated");
    }

    static opponentIsReadyToPlay(socket){
        socket.emit("OpponentIsReadyToPlay");
    }
};