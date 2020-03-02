module.exports = class LocatingEmitters{
    static askForStartLocating(server) {
        server.emit("AskForStartLocating")
    }

    static askForABattleship(server, length){
        console.log("Sending requist for locating battleship in a length of: " + length.toString());
        server.emit("AskForABattleship", {
            length
        })
    }

    static locateABattleshipStatus(server, startRowIndex, startColumnIndex, length, isHorizontal, status){
        server.emit("LocateABattleshipStatus", {
            startRowIndex,
            startColumnIndex,
            length,
            isHorizontal,
            status
        })
    }
};