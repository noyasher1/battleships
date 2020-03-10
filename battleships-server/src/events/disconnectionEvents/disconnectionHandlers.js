const DisconnectionEmitters = require("./disconnectionEmitters.js");

module.exports = class DisconnectionHandlers{
    static disconnect(sessions, session, user){
        let opponent = session.getOpponent(user);
        if(opponent !== undefined){
            console.log("emmiting for disconnection");
            DisconnectionEmitters.opponentHasDisconnected(opponent.socket);
        }
        console.log("length before" + sessions.length.toString());
        sessions.splice(sessions.indexOf(session), 1);
        console.log("length after" + sessions.length.toString());
    }
};