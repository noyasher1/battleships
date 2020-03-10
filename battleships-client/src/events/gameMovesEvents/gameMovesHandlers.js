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
            opponentBoard.prepareForUserTurn();
            userBoard.prepareForUserTurn(messageBox, false);
        }
        else{
            userBoard.prepareForOpponentTurn();
            opponentBoard.prepareForOpponentTurn(messageBox, false);
        }

    }

    static userMoveStatusHandler(data, messageBox, opponentBoard, userBoard, beforeunloadFuncToAbort){
        console.log("return status");
        if(data.isSucceed){
            console.log("return succeed status");
            let rowIndex = data.rowIndex;
            let columnIndex = data.columnIndex;
            //data.rowIndex, data.columnIndex
            opponentBoard.markCellAsExposed(rowIndex, columnIndex);
            if(data.isContainBattleship){
                opponentBoard.markCellAsContainBattleship(rowIndex, columnIndex);
                console.log("is winner = " + data.amIWinner.toString());
                if(data.amIWinner){
                    console.log("you are the winner");
                    //alert("you are the winner");
                    if(!alert("you are the winner")){
                        window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
                        window.location.reload();
                    }
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
            console.log("is looser = " + data.isOpponentWon.toString());
            if(data.isOpponentWon){
                console.log("You are a looser");
                //alert("You are a looser");
                if(!alert("You are a looser")){
                    window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
                    window.location.reload();
                }
            }
        }
        else{
            opponentBoard.prepareForUserTurn();
            userBoard.prepareForUserTurn(messageBox)
        }
    }
}