function initGame(flags, messageBox, opponentBoard){
    flags.isGameActive = true;
    messageBox.clear();
    opponentBoard.render();
}

export default class InitializeBoardHandlers{
    static askForABattleshipHandler(data, battleshipLocator){
        battleshipLocator.startLocating(data.length);
    }

    static locateABattleshipStatusHandler(data, battleshipLocator, userBoard){
        if(data.status === "succeed"){
            userBoard.locateABattleship(data.startRowIndex, data.startColumnIndex, data.length, data.isHorizontal);
            battleshipLocator.finishLocating();
        }
        console.log(data.status);
    }

    static allBattleshipsAreLocatedHandler(battleshipLocator, messageBox, flags, opponentBoard){
        battleshipLocator.allBattleshipsAreLocated();
        flags.isUserFinishedLocating = true;
        if(!flags.isOpponentFinishedLocating) {
            messageBox.pushMessage("Nice! you have located all the battleships.\n"
                + "Please wait for your opponent to finish locating his.");
        }
        if(flags.isUserFinishedLocating && flags.isOpponentFinishedLocating && !flags.isGameActive){
            initGame(flags, messageBox, opponentBoard)
        }
    }

    static opponentIsReadyToPlayHandler(flags, messageBox, opponentBoard){
        flags.isOpponentFinishedLocating = true;
        if(flags.isUserFinishedLocating && flags.isOpponentFinishedLocating && !flags.isGameActive){
            initGame(flags, messageBox, opponentBoard)
        }
    }
}