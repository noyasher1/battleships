'use strict';

// CR: Notice how you pass server/socket param for each function. You could prevent that be initializing an instance of this class for every socket,
// and storing the socket under the instance scope (see initialize-boards-emitters_CR.js)
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