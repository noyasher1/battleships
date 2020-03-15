'use strict';
const DisconnectionEmitters = require("./disconnectionEmitters.js");

module.exports = class DisconnectionHandlers{
    static disconnect(sessions, user){
        let session = sessions.getSessionBySocket(user.socket);
        let opponent = session!==undefined?session.getOpponent(user):undefined;
        if(opponent !== undefined){
            DisconnectionEmitters.opponentHasDisconnected(opponent.socket);
            sessions.sessions.splice(sessions.sessions.indexOf(session), 1);
        }
    }
};