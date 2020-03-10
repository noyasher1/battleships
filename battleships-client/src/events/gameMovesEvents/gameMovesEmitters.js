export default class gameMovesEmitters {
    static userMove(server, rowIndex, columnIndex){
        server.emit("UserMove", {
            rowIndex,
            columnIndex
        })
    }
}