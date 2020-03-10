import DisconnectionHandlers from "../disconnectionEvents/disconnectionHandlers.js";

export default (socket, beforeunloadFunc) => {
    socket.on("OpponentHasDisconnected", () => {
        console.log("got a disconnection");
        DisconnectionHandlers.opponentHasDisconnected(beforeunloadFunc);
    });
}