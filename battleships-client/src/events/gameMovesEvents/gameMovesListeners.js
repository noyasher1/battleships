import GameMovesHandlers from './gameMovesHandlers.js'

export default (socket, messageBox, userBoard, opponentBoard) => {
    socket.on("StartGame", (data) => {
        GameMovesHandlers.startGameHandler(socket, data.isStart, messageBox, userBoard, opponentBoard);
    });

    socket.on("UserMoveStatus", (data) =>{
        console.log("got userMovesStatus");
        GameMovesHandlers.userMoveStatusHandler(data, messageBox, opponentBoard, userBoard)
    });

    socket.on("OpponentMove", (data) => {
        GameMovesHandlers.opponentMoveHandler(data, messageBox, userBoard, opponentBoard);
    });
}