import BattleshipLocator from "../../components/battleshipLocator.js";
import InitializeBoardHandlers from './initializeBoardHandlers.js';

let battleshipLocator;
export default (socket, flags, messageBox, userBoard, opponentBoard, buttonToRemove) => {
    socket.on("AskForStartLocating", () => {
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
        InitializeBoardHandlers.allBattleshipsAreLocatedHandler(battleshipLocator, messageBox, flags, opponentBoard);
    });

    socket.on("OpponentIsReadyToPlay", () => {
        InitializeBoardHandlers.opponentIsReadyToPlayHandler(flags, messageBox, opponentBoard)
    })
}