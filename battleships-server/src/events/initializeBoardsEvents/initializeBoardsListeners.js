const sessions = require("../../states/sessionsState").sessionsManager;
const EventHandlers = require("./initializeBoardsHandlers");
const LocatingEmitters = require("./initializeBoardsEmitters");

module.exports = (socket) => {
    console.log("is socket already subscribe = " + sessions.isSocketAlreadySubscribe(socket));
    if(!sessions.isSocketAlreadySubscribe(socket)){
        let newUser = sessions.subscribeUserSocketForAvailableSession(socket);
        LocatingEmitters.askForStartLocating(socket);
        LocatingEmitters.askForABattleship(socket, newUser.nextBattleship().length);
    }
    console.log(sessions.sessions.length);
    let user = sessions.getUserBySocket(socket);
    console.log("length = " + (user.nextBattleship().length).toString());
    socket.on("LocateABattleship", (event) => {
        EventHandlers.locateABattleshipHandler(user, event);
    });
};