const InitializeBoardsHandlers = require("./initializeBoardsHandlers");
const InitializeBoardsEmitters = require("./initializeBoardsEmitters");

module.exports = (socket, session, user, isNewUser) => {
    if(isNewUser){
        if(session.isPopulated)
        {
            session.isActive = true;
            let user1 = session.user1;
            let user2 = session.user2;
            InitializeBoardsEmitters.askForStartLocating(user1.socket);
            InitializeBoardsEmitters.askForStartLocating(user2.socket);
            InitializeBoardsEmitters.askForABattleship(user1.socket, user1.nextBattleship().length);
            InitializeBoardsEmitters.askForABattleship(user2.socket, user2.nextBattleship().length);
        }
    }

    socket.on("LocateABattleship", (event) => {
        InitializeBoardsHandlers.locateABattleshipHandler(session, user, event);
    });
};