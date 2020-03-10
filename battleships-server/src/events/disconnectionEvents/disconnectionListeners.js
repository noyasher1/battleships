'use strict';
const DisconnectionHandlers = require("./disconnectionHandlers");

module.exports = (sessions, socket, session, user) => {
    socket.on("disconnect", () => {
        DisconnectionHandlers.disconnect(sessions, session, user)
    })
};