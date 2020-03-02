const sessions = require("../states/sessionsState").sessionsManager;
const Session = require("../models/session");
const EventHandlers = require("./locatingHandlers");
const LocatingEmitters = require("./locatingEmitters");


module.exports = class GeneralListener{
    constructor(server){
        this.server = server;
        this.start();
    }

    start(){
        this.server.on("connection", (socket) => {
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
        });
    }
};