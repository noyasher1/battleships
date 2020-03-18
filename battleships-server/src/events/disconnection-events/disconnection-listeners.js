'use strict';
const DisconnectionHandlers = require("./disconnection-handlers");

module.exports = (sessions, socket, user) => {
    socket.on("disconnect", () => {
        DisconnectionHandlers.disconnect(sessions, user)
    })
};