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

    static allBattleshipsAreLocatedHandler(battleshipLocator, messageBox){
        battleshipLocator.allBattleshipsAreLocated();
        messageBox.pushMessage("Nice! you have located all the battleships.\n"
            + "Please wait for your opponent to finish locating his.");
    }
}