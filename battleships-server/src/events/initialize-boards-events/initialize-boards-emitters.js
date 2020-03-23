'use strict';

module.exports = class InitializeBoardsEmitters{
    /*
    This idea of an interface is very clean. +1
    maybe use named parameters
    askForStartLocating({server, rowsNumber})
    good if arguments are optional
    good when there are too many arguments like locateABattleshipStatus
     */
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