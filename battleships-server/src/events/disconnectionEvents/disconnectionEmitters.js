'use strict';

module.exports = class DisconnectionEmitters {
    static opponentHasDisconnected(socket) {
        socket.emit("OpponentHasDisconnected");
    }
};