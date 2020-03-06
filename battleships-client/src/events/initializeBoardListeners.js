import BattleshipLocator from "../components/battleshipLocator.js";
import InitializeBoardHandlers from './initializeBoardHandlers.js';

let battleshipLocator;
export default (socket, messageBox, boardLength, userBoard) => {
    socket.on("AskForStartLocating", () => {
        battleshipLocator = new BattleshipLocator(socket, userBoard, boardLength, messageBox);
    });

    socket.on("AskForABattleship", (data) => {
        InitializeBoardHandlers.askForABattleshipHandler(data, battleshipLocator);
    });

    socket.on("LocateABattleshipStatus", (data) => {
        InitializeBoardHandlers.locateABattleshipStatusHandler(data, battleshipLocator, userBoard);
    });

    socket.on("AllBattleshipsAreLocated", () => {
        InitializeBoardHandlers.allBattleshipsAreLocatedHandler(battleshipLocator, messageBox);
    });
}