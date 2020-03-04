const InitializeBoardsHandlers = require("./initializeBoardsHandlers");
const InitializeBoardsEmitters = require("./initializeBoardsEmitters");

module.exports = (socket, user, isNewUser) => {
    if(isNewUser){
        InitializeBoardsEmitters.askForStartLocating(socket);
        InitializeBoardsEmitters.askForABattleship(socket, user.nextBattleship().length);
    }
    console.log("length = " + (user.nextBattleship().length).toString());
    socket.on("LocateABattleship", (event) => {
        InitializeBoardsHandlers.locateABattleshipHandler(user, event);
    });
};