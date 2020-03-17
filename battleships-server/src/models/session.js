'use strict';

module.exports = class Session{
    constructor(){
        this.isActive = false;
        this.user1 = null;
        this.user2 = null;
    }

    get isPopulated(){
        return this.user1 && this.user2;
    }

    getOpponent(user){
        if(this.user1 === user){
            return this.user2
        }
        return this.user1;
    }
};