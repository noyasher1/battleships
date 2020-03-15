'use strict';
const DisconnectionHandlers = require("./disconnectionHandlers");

module.exports = (sessions, socket, user) => {
    socket.on("disconnect", () => {
        DisconnectionHandlers.disconnect(sessions, user)
    })
};