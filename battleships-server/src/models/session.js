module.exports = class Session{
    constructor(){
        this.isActive = false;
        this.user1 = undefined;
        this.user2 = undefined;
    }

    get isPopulated(){
        return this.user1 !== undefined && this.user2 !== undefined;
    }

    getOpponent(user){
        if(this.user1 === user){
            return this.user2
        }
        return this.user1;
    }
};