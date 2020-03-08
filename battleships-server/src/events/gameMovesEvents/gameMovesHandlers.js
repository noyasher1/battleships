const GameMovesEmitters = require("./gameMovesEmitters.js");

module.exports = class GameMovesHandlers{
    static userMove(session, user, rowIndex, columnIndex){
        console.log("got userMove event");
        let opponent = session.getOpponent(user);
        if(opponent.board.isCellExposed(rowIndex, columnIndex)){
            GameMovesEmitters.userMoveStatus(user.socket, false, rowIndex, columnIndex, false)
        }
        else{
            let isCellContainBattleship = opponent.board.isCellContainBattleship(rowIndex, columnIndex);
            opponent.board.markCellAsExposed(rowIndex, columnIndex);
            GameMovesEmitters.userMoveStatus(user.socket, true, rowIndex, columnIndex, isCellContainBattleship);
            GameMovesEmitters.opponentMove(opponent.socket, rowIndex, columnIndex, isCellContainBattleship)
        }
    }
};