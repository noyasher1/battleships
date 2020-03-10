'use strict';

export default class InitializeBoardEmitters {
    static locateABattleship(server, startRowIndex, startColumnIndex, length, isHorizontal){
        server.emit("LocateABattleship", {
            startRowIndex,
            startColumnIndex,
            length,
            isHorizontal
        })
    }
}