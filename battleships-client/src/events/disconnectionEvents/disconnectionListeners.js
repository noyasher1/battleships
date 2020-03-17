'use strict';
import DisconnectionHandlers from "../disconnectionEvents/disconnectionHandlers.js";

export default (socket, beforeunloadFunc) => {
    socket.on("connect_error", () => {
        DisconnectionHandlers.connectionError(socket, beforeunloadFunc);
    });

    socket.on("OpponentHasDisconnected", () => {
        DisconnectionHandlers.opponentHasDisconnected(beforeunloadFunc);
    });
}