'use strict';
const GameMovesHandlers = require("./game-moves-handlers");

module.exports = (sessions, socket, session, user) => {
    socket.on("UserMove", (data) => {
        GameMovesHandlers.userMove(sessions, session, user, data.rowIndex, data.columnIndex)
    })
};