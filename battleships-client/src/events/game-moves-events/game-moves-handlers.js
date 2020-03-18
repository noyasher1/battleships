'use strict';
import AlertModal from '../../components/alert-modal.js'
import { resetGame } from "../../static-methods/session-methods.js";
import UserBoard from "../../models/board/user-board.js";

export default class GameMovesHandlers{
    static startGameHandler(userSocket, isStart, messageBox, userBoard, opponentBoard){
        messageBox.clear();
        opponentBoard.render();
        opponentBoard.addCellsClickListener(userSocket);
        userBoard.prepareForGameStart();
        messageBox.pushMessage("In your turn, click on a cell you want to expose.\n"
            + "The winner is the first user that will expose all the opponent\'s battleships.");
        if(isStart){
            opponentBoard.prepareForUserTurn();
            UserBoard.prepareForUserTurn(messageBox, false);
        }
        else{
            userBoard.prepareForOpponentTurn();
            opponentBoard.prepareForOpponentTurn(messageBox, false);
        }

    }

    static userMoveStatusHandler(data, messageBox, opponentBoard, userBoard){
        if(data.isSucceed){
            let rowIndex = data.rowIndex;
            let columnIndex = data.columnIndex;
            opponentBoard.markCellAsExposed(rowIndex, columnIndex);
            if(data.isContainBattleship){
                opponentBoard.markCellAsContainBattleship(rowIndex, columnIndex);
                if(data.amIWinner){
                    new AlertModal("You are the winner", () => resetGame());
                }
            }
            else{
                userBoard.prepareForOpponentTurn();
                opponentBoard.prepareForOpponentTurn(messageBox);
            }
        }
    }

    static opponentMoveHandler(data, messageBox, userBoard, opponentBoard){
        let rowIndex = data.rowIndex;
        let columnIndex = data.columnIndex;
        userBoard.unmarkLastCellAsExposed();
        userBoard.markCellAsExposed(rowIndex, columnIndex);
        if(data.isContainBattleship){
            userBoard.markCellAsContainBattleship(rowIndex, columnIndex);
            if(data.isOpponentWon){
                new AlertModal("You are a looser", () => resetGame());
            }
        }
        else{
            opponentBoard.prepareForUserTurn();
            UserBoard.prepareForUserTurn(messageBox)
        }
    }
}