'use strict';
const Board = require('./board');

module.exports = class User{
    constructor(socket){
        this.socket = socket;
        this.board = new Board();
        // CR: This should be in conf
        this._battleshipsToLocate = [
            {
                length: 5,
                isLocated: false
            },
            {
                length: 4,
                isLocated: false
            },
            {
                length: 3,
                isLocated: false
            },
            {
                length: 3,
                isLocated: false
            },
            {
                length: 2,
                isLocated: false
            }
        ];
    }

    get isFinishedLocating(){
        return !this.nextBattleship();
    }

    nextBattleship(){
        for(let battleshipToLocate of this._battleshipsToLocate){
            if (!battleshipToLocate.isLocated){
                return battleshipToLocate;
            }
        }

        return null;
    }

    markLastBattleshipAsLocated(){
        this.nextBattleship().isLocated = true;
    }
};