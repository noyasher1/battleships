export default class InitializeBoardEmitters {
    static locateABattleship(server, startRowIndex, startColumnIndex, length, isHorizontal){
        console.log("trying to emit server");
        server.emit("LocateABattleship", {
            startRowIndex,
            startColumnIndex,
            length,
            isHorizontal
        })
    }
}