

export default (socket, messageBox, userBoard, opponentBoard) => {
    socket.on("PrepareForStartGame", () => {
        messageBox.clear();
        opponentBoard.render();
    })
}