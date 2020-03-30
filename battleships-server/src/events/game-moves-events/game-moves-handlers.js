'use strict';
const GameMovesEmitters = require("./game-moves-emitters.js");

module.exports = class GameMovesHandlers{
    static userMove(sessions, session, user, rowIndex, columnIndex){
        let opponent = session.getOpponent(user);
        if(opponent.board.cells[rowIndex][columnIndex].isExposed){
            GameMovesEmitters.userMoveStatus(user.socket, false, rowIndex, columnIndex, false)
        }
        else{
            let isCellContainBattleship = opponent.board.cells[rowIndex][columnIndex].isContainBattleship;
            opponent.board.cells[rowIndex][columnIndex].isExposed = true;
            let isUserWon = opponent.board.areBattleshipsTotallyExposed();
            GameMovesEmitters.userMoveStatus(user.socket, true, rowIndex, columnIndex, isCellContainBattleship, isUserWon);
            GameMovesEmitters.opponentMove(opponent.socket, rowIndex, columnIndex, isCellContainBattleship, isUserWon);
            if(isUserWon){
                sessions.removeSession(session)
            }
        }
    }
};