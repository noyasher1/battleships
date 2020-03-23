'use strict';
const LocatingEmitters = require("./initialize-boards-emitters");
const GameMovesEmitters = require("../game-moves-events/game-moves-emitters.js");
const LocatingStatus = require("../../consts/locating-status");

/*
Why is this a class ?
notice that a malicious user could send more locate ship events than intended and server I think would accept.
could also send ship locations of any sizes ?
they are placed in an order.
the server should already know what the length of the placed ship is...
validate state on the server and remove length argument. ( as long as order is deterministic )

use Const instead of let.
install es-lint as a syntax checker.
 */
module.exports = class InitializeBoardsHandlers{
    static locateABattleshipHandler(session, user, event){
        let startRowIndex = event.startRowIndex;
        let startColumnIndex = event.startColumnIndex;
        let length = event.length;
        let isHorizontal = event.isHorizontal;
        // I would encapsulate all this x, y variables in a single position argument [x,y] would make your code cleaner.
        if(user.board.areCellsAvailableForLocating(startRowIndex, startColumnIndex, length, isHorizontal)){ // weird long name
            user.board.markCellsAsContainBattleship(startRowIndex, startColumnIndex, length, isHorizontal); // --> cellTaken or markCellTaken
            user.markLastBattleshipAsLocated();
            LocatingEmitters.locateABattleshipStatus(user.socket, startRowIndex, startColumnIndex, length, isHorizontal, LocatingStatus.SUCCEED);
            if(!user.isFinishedLocating){
                LocatingEmitters.askForABattleship(user.socket, user.nextBattleship().length);
            }
            else{
                LocatingEmitters.allBattleshipsAreLocated(user.socket);
                let opponent = session.getOpponent(user);
                LocatingEmitters.opponentIsReadyToPlay(opponent.socket);
                if(user.isFinishedLocating && opponent.isFinishedLocating){
                    GameMovesEmitters.startGame(user.socket, true); // Why is the function responsible over attempting to place a ship is what inits the game... ( lack of flow control )
                    GameMovesEmitters.startGame(opponent.socket, false);
                }
            }
        }
        else{
            LocatingEmitters.locateABattleshipStatus(user.socket, startRowIndex, startColumnIndex, length, isHorizontal, LocatingStatus.FAILED);
        }
    }
};