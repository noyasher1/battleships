const LocatingEmitters = require("./locatingEmitters");
const LocatingStatus = require("../consts/locatingStatus");

module.exports = class locatingHandlers{
    static locateABattleshipHandler(user, event){
        console.log("placing request");
        let startRowIndex = event.startRowIndex;
        let startColumnIndex = event.startColumnIndex;
        let length = event.length;
        let isHorizontal = event.isHorizontal;
        if(user.board.areCellsAvailableForLocating(startRowIndex, startColumnIndex, length, isHorizontal)){
            user.board.markCellsAsContainBattleship(startRowIndex, startColumnIndex, length, isHorizontal);
            user.markLastBattleshipAsLocated();
            LocatingEmitters.locateABattleshipStatus(user.socket, startRowIndex, startColumnIndex, length, isHorizontal, LocatingStatus.SUCCEED);
            console.log("Battleship placed");
            if(user.nextBattleship() !== undefined){
                LocatingEmitters.askForABattleship(user.socket, user.nextBattleship().length);
            }
        }
        else{
            LocatingEmitters.locateABattleshipStatus(user.socket, startRowIndex, startColumnIndex, length, isHorizontal, LocatingStatus.FAILED);
        }
        //server.send(locatingStatus);
    }
};