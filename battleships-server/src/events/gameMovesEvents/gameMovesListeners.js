//const sessions = require("../../states/sessions").sessionsManager;
const GameMovesHandlers = require("./GameMovesHandlers");
const GameMovesEmitters = require("./GameMovesEmitters");

module.exports = (sessions, socket, session, user) => {
    socket.on("UserMove", (data) => {
        GameMovesHandlers.userMove(sessions, session, user, data.rowIndex, data.columnIndex)
    })
};