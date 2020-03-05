module.exports = class InitializeBoardsEmitters{
    static askForStartLocating(server) {
        server.emit("AskForStartLocating")
    }

    static askForABattleship(socket, length){
        console.log("Sending requist for locating battleship in a length of: " + length.toString());
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
};