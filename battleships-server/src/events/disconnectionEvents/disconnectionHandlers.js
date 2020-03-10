const DisconnectionEmitters = require("./disconnectionEmitters.js");

module.exports = class DisconnectionHandlers{
    static disconnect(sessions, session, user){
        let opponent = session.getOpponent(user);
        if(opponent !== undefined){
            DisconnectionEmitters.opponentHasDisconnected(opponent.socket);
        }
        sessions.splice(sessions.indexOf(session), 1);
    }
};