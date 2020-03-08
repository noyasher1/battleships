module.exports = class InitializeBoardsEmitters{
    static startGame(socket, isStart){//send for each user, one with isStart=true, the other false.
            socket.emit("StartGame", {
                isStart
            });
    }

    static opponentMove(socket, rowIndex, columnIndex, isContainBattleship){
        socket.emit("OpponentMove", {
            rowIndex,
            columnIndex,
            isContainBattleship
        })
    };

    /*static yourTurn(socket) {
        socket.emit("YourTurn");
    };*/

    static userMoveStatus(socket, isSucceed, rowIndex, columnIndex, isContainBattleship){
        socket.emit("UserMoveStatus", {
            isSucceed,
            rowIndex,
            columnIndex,
            isContainBattleship
        })
    }
};