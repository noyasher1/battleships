'use strict';
const DisconnectionEmitters = require("./disconnection-emitters.js");

module.exports = class DisconnectionHandlers{
    static disconnect(sessions, user){
        let session = sessions.getSessionBySocket(user.socket);
        let opponent = session!== null?session.getOpponent(user):null;
        if(opponent !== null){
            DisconnectionEmitters.opponentHasDisconnected(opponent.socket);
            sessions.removeSession(session);
        }
    }
};