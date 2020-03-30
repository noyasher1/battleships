'use strict';
const CONFIG = require("../../config");
const Board = require('./board');

module.exports = class User{
    constructor(socket){
        this.socket = socket;
        this.board = new Board();
        this._battleshipsToLocate = null;
        this._initBattleshipsLengths()
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

    _initBattleshipsLengths(){
        let lengths = CONFIG.battleshipsLengthsToLocate;
        this._battleshipsToLocate = [];
        for(let length of lengths){
            this._battleshipsToLocate.push({
                length,
                isLocated: false
            });
        }
    }
};