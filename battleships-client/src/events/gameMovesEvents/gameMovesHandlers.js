'use strict';
import AlertModal from '../../components/alertModal.js'

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
            userBoard.prepareForUserTurn(messageBox, false);
        }
        else{
            userBoard.prepareForOpponentTurn();
            opponentBoard.prepareForOpponentTurn(messageBox, false);
        }

    }

    static userMoveStatusHandler(data, messageBox, opponentBoard, userBoard, beforeunloadFuncToAbort){
        if(data.isSucceed){
            let rowIndex = data.rowIndex;
            let columnIndex = data.columnIndex;
            opponentBoard.markCellAsExposed(rowIndex, columnIndex);
            if(data.isContainBattleship){
                opponentBoard.markCellAsContainBattleship(rowIndex, columnIndex);
                if(data.amIWinner){
                    new AlertModal("You are the winner", () => {
                        window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
                        window.location.reload();
                    });
                    /*if(!alert("You are the winner")){
                        window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
                        window.location.reload();
                    }*/
                }
            }
            else{
                userBoard.prepareForOpponentTurn();
                opponentBoard.prepareForOpponentTurn(messageBox);
            }
        }
    }

    static opponentMoveHandler(data, messageBox, userBoard, opponentBoard, beforeunloadFuncToAbort){
        let rowIndex = data.rowIndex;
        let columnIndex = data.columnIndex;
        userBoard.unmarkLastCellAsExposed();
        userBoard.markCellAsExposed(rowIndex, columnIndex);
        if(data.isContainBattleship){
            userBoard.markCellAsContainBattleship(rowIndex, columnIndex);
            if(data.isOpponentWon){
                new AlertModal("You are a looser", () => {
                    window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
                    window.location.reload();
                });
                /*if(!alert("You are a looser")){
                    window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
                    window.location.reload();
                }*/
            }
        }
        else{
            opponentBoard.prepareForUserTurn();
            userBoard.prepareForUserTurn(messageBox)
        }
    }
}