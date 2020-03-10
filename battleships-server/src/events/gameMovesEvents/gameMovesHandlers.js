const GameMovesEmitters = require("./gameMovesEmitters.js");

module.exports = class GameMovesHandlers{
    static userMove(sessions, session, user, rowIndex, columnIndex){
        let opponent = session.getOpponent(user);
        if(opponent.board.isCellExposed(rowIndex, columnIndex)){
            GameMovesEmitters.userMoveStatus(user.socket, false, rowIndex, columnIndex, false)
        }
        else{
            let isCellContainBattleship = opponent.board.isCellContainBattleship(rowIndex, columnIndex);
            opponent.board.markCellAsExposed(rowIndex, columnIndex);
            let isUserWon = opponent.board.areBattleshipsTotallyExposed();
            GameMovesEmitters.userMoveStatus(user.socket, true, rowIndex, columnIndex, isCellContainBattleship, isUserWon);
            GameMovesEmitters.opponentMove(opponent.socket, rowIndex, columnIndex, isCellContainBattleship, isUserWon);
            if(isUserWon){
                sessions.splice(sessions.indexOf(session), 1);
            }
        }
    }
};