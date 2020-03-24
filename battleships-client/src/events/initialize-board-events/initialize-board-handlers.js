'use strict';

let isOpponentFinishedLocating = false;
// CR: no need for static class here. just export the functions
export default class InitializeBoardHandlers{
    static askForABattleshipHandler(data, battleshipLocator){
        battleshipLocator.startLocating(data.length);
    }

    static locateABattleshipStatusHandler(data, battleshipLocator, userBoard){
        if(data.status === "succeed"){
            userBoard.locateABattleship(data.startRowIndex, data.startColumnIndex, data.length, data.isHorizontal);
            battleshipLocator.finishLocating();
        }
    }

    static allBattleshipsAreLocatedHandler(battleshipLocator, messageBox, opponentBoard){
        battleshipLocator.allBattleshipsAreLocated();
        if(!isOpponentFinishedLocating) {
            messageBox.pushMessage("Nice! you have located all the battleships.\n"
                + "Please wait for your opponent to finish locating his.");
        }
    }

    static opponentIsReadyToPlayHandler(){
        isOpponentFinishedLocating = true;
    }
}