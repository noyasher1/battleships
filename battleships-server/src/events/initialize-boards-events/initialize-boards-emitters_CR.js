
const _socket = Symbol('socket');

// CR: Notice how you pass server/socket param for each function. You could prevent that be initializing an instance of this class for every socket,
// and storing the socket under the instance scope (see initialize-boards-emitters_CR.js)
export default class InitializeBoardsEmitters {
    constructor(socket) {
        this[_socket] = socket;
    }
    static askForStartLocating(rowsNumber, columnsNumber) {
        this[_socket].emit("AskForStartLocating", {
            rowsNumber,
            columnsNumber
        })
    }

    static askForABattleship(length){
        this[_socket].emit("AskForABattleship", {
            length
        })
    }

    static locateABattleshipStatus(startRowIndex, startColumnIndex, length, isHorizontal, status){
        this[_socket].emit("LocateABattleshipStatus", {
            startRowIndex,
            startColumnIndex,
            length,
            isHorizontal,
            status
        })
    }

    static allBattleshipsAreLocated(){
        this[_socket].emit("AllBattleshipsAreLocated");
    }

    static opponentIsReadyToPlay(){
        this[_socket].emit("OpponentIsReadyToPlay");
    }
};