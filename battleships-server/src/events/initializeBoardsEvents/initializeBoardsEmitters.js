module.exports = class InitializeBoardsEmitters{
    static askForStartLocating(server) {
        console.log("asking for start locating")
        server.emit("AskForStartLocating")
    }

    static askForABattleship(socket, length){
        console.log("Sending request for locating battleship in a length of: " + length.toString());
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

    static prepareForStartGame(user1, user2){
        user1.socket.emit("PrepareForStartGame");
        user2.socket.emit("PrepareForStartGame");
    }
};