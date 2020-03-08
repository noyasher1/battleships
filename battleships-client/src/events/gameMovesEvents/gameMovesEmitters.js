export default class gameMovesEmitters {
    static userMove(server, rowIndex, columnIndex){
        console.log("send userMove event")
        server.emit("UserMove", {
            rowIndex,
            columnIndex
        })
    }
}