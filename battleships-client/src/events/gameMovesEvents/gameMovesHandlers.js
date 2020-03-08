export default class GameMovesHandlers{
    static startGameHandler(userSocket, isStart, messageBox, userBoard, opponentBoard){
        console.log("startGame event. isStart = " + isStart.toString());
        messageBox.clear();
        opponentBoard.render();
        opponentBoard.addCellsClickListener(userSocket, messageBox);
        userBoard.prepareForGameStart();
        messageBox.pushMessage("In your turn, click on a cell you want to expose.\n"
            + "The winner is the first user that will expose all the opponent\'s battleships.");
        if(isStart){
            opponentBoard.prepareForUserTurn(messageBox, false);
        }
        else{
            opponentBoard.prepareForOpponentTurn(messageBox, false);
        }

    }

    static userMoveStatusHandler(data, messageBox, opponentBoard){
        console.log("return status");
        if(data.isSucceed){
            console.log("return succeed status");
            let rowIndex = data.rowIndex;
            let columnIndex = data.columnIndex;
            //data.rowIndex, data.columnIndex
            opponentBoard.markCellAsExposed(rowIndex, columnIndex);
            if(data.isContainBattleship){
                opponentBoard.markCellAsContainBattleship(rowIndex, columnIndex)
            }
            else{
                opponentBoard.prepareForOpponentTurn(messageBox);
            }
        }
    }

    static opponentMoveHandler(data, messageBox, userBoard, opponentBoard){
        let rowIndex = data.rowIndex;
        let columnIndex = data.columnIndex;
        userBoard.markCellAsExposed(rowIndex, columnIndex);
        if(data.isContainBattleship){
            userBoard.markCellAsContainBattleship(rowIndex, columnIndex)
        }
        else{
            opponentBoard.prepareForUserTurn(messageBox)
        }
    }
}