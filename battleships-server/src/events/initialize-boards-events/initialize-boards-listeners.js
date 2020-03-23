'use strict';
const InitializeBoardsHandlers = require("./initialize-boards-handlers");
const InitializeBoardsEmitters = require("./initialize-boards-emitters");


/*
What is this class.
it is named listeners but it initializes the handler.
and emits the event that it listens to.
and it is named listeners ?..
 */
module.exports = (socket, session, user, isNewUser, rowsNumber, columnsNumber) => {
    if(isNewUser){
        /*
        a single user session responsible for updating both clients to move on to the next action.
        I think this is dangerous.
        A. you now have a user session that is unaware of what it's user is doing.
        B. you don't have a central point of state holding what both players should be doing.
        I would hold this state in a single point for both users.
        and have user session handler ( the server side handler of each user ) ask it what it should be doing.
         */
        if(session.isPopulated)
        {
            session.isActive = true;
            let user1 = session.user1;
            let user2 = session.user2;
            InitializeBoardsEmitters.askForStartLocating(user1.socket, rowsNumber, columnsNumber); // --> askShipPlacement
            InitializeBoardsEmitters.askForStartLocating(user2.socket, rowsNumber, columnsNumber);
            InitializeBoardsEmitters.askForABattleship(user1.socket, user1.nextBattleship().length); // --> askShip
            InitializeBoardsEmitters.askForABattleship(user2.socket, user2.nextBattleship().length);
        }
    }

    /*
    Wouldn't you assign the listener twice if it was not a new user ?
    how is this possible.
     */
    socket.on("LocateABattleship", (event) => {
        InitializeBoardsHandlers.locateABattleshipHandler(session, user, event); // entire naming convention of "locateBattleship" is really unclear to me and long.
    });
};