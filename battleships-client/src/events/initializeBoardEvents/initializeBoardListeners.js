'use strict';
import BattleshipLocator from "../../components/battleshipLocator.js";
import InitializeBoardHandlers from './initializeBoardHandlers.js';

let battleshipLocator;
export default (socket, messageBox, userBoard, opponentBoard, buttonToRemove) => {
    socket.on("AskForStartLocating", (data) => {
        userBoard.rowsNumber = data.rowsNumber;
        opponentBoard.rowsNumber = data.rowsNumber;
        userBoard.columnsNumber = data.columnsNumber;
        opponentBoard.columnsNumber = data.columnsNumber;
        messageBox.popMessage();
        document.body.removeChild(buttonToRemove);
        userBoard.render();
        battleshipLocator = new BattleshipLocator(socket, userBoard, messageBox);
    });

    socket.on("AskForABattleship", (data) => {
        InitializeBoardHandlers.askForABattleshipHandler(data, battleshipLocator);
    });

    socket.on("LocateABattleshipStatus", (data) => {
        InitializeBoardHandlers.locateABattleshipStatusHandler(data, battleshipLocator, userBoard);
    });

    socket.on("AllBattleshipsAreLocated", () => {
        InitializeBoardHandlers.allBattleshipsAreLocatedHandler(battleshipLocator, messageBox, opponentBoard);
    });

    socket.on("OpponentIsReadyToPlay", () => {
        InitializeBoardHandlers.opponentIsReadyToPlayHandler( )
    })
}