import DisconnectionHandlers from "../disconnectionEvents/disconnectionHandlers.js";

export default (socket, beforeunloadFunc) => {
    socket.on("OpponentHasDisconnected", () => {
        DisconnectionHandlers.opponentHasDisconnected(beforeunloadFunc);
    });
}