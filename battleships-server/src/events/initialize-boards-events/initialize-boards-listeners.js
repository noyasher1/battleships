'use strict';
const InitializeBoardsHandlers = require("./initialize-boards-handlers");
const InitializeBoardsEmitters = require("./initialize-boards-emitters");

module.exports = (socket, session, user, isNewUser, rowsNumber, columnsNumber) => {
    if(isNewUser){
        if(session.isPopulated)
        {
            session.isActive = true;
            let user1 = session.user1;
            let user2 = session.user2;
            InitializeBoardsEmitters.askForStartLocating(user1.socket, rowsNumber, columnsNumber);
            InitializeBoardsEmitters.askForStartLocating(user2.socket, rowsNumber, columnsNumber);
            InitializeBoardsEmitters.askForABattleship(user1.socket, user1.nextBattleship().length);
            InitializeBoardsEmitters.askForABattleship(user2.socket, user2.nextBattleship().length);
        }
    }

    socket.on("LocateABattleship", (event) => {
        InitializeBoardsHandlers.locateABattleshipHandler(session, user, event);
    });
};