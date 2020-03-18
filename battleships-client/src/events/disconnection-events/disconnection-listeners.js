'use strict';
import DisconnectionHandlers from "./disconnection-handlers.js";

export default (socket) => {
    socket.on("connect_error", () => {
        DisconnectionHandlers.connectionError(socket);
    });

    socket.on("OpponentHasDisconnected", () => {
        DisconnectionHandlers.opponentHasDisconnected();
    });
}