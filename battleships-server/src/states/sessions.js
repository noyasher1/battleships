const Session = require("../models/session");
const User = require("../models/user");

let _sessions = null;
module.exports = class Sessions{
    constructor(){
        this.sessions = [];
    }

    static get sessionsManager(){
        return _sessions ? _sessions : _sessions = new Sessions();
    }
    isSocketAlreadySubscribe(socket){
        if(this.isSessionsArrayEmpty()){
            return false;
        }
        for(let session in this.sessions){
            if ((!session.user1 === undefined && session.user1.socket === socket)
                || !session.user2 === undefined && session.user2.socket === socket){
                if (session.user1.socket === socket || session.user2.socket === socket)
                    return true;
            }
        }
        return false;
    }

    isSessionsArrayEmpty(){
        return this.sessions.length === 0;
    }

    subscribeUserSocketForAvailableSession(socket){
        let newUser;
        let usedSession;
        if(this.isSessionsArrayEmpty()){
            let newSession = new Session();
            newUser = new User(socket);
            newSession.user1 = newUser;
            this.sessions.push(newSession);
            usedSession = newSession;

        }
        else{
            let isFoundAvailableSession = false;
            for(let session of this.sessions){
            // for(let session in _sessions){
                if(!session.isActive){
                    isFoundAvailableSession = true;
                    newUser = new User(socket);
                    session.user2 = newUser;
                    //session.isActive = true;
                    usedSession = session
                }
            }
            if(!isFoundAvailableSession){
                let newSession = new Session();
                newUser = new User(socket);
                newSession.user1 = newUser;
                this.sessions.push(newSession);
                // _sessions.push(newSession);
                usedSession = newSession
            }
        }
        return {
            session: usedSession,
            user: newUser
        }
    }

    getSessionBySocket(socket){
        console.log("trying to get session by socket")
        if(this.isSessionsArrayEmpty()){
            console.log("returns undefined")
            return undefined;
        }
        for(let session of this.sessions){
            if(session.user1.socket === socket || session.user2.socket === socket){
                return session;
            }
        }
        return undefined;
    }

    getUserBySocket(socket){
        if(this.isSessionsArrayEmpty()){
            return undefined;
        }
        let userSession = this.getSessionBySocket(socket);
        if (userSession.user1.socket === socket){
            return userSession.user1;
        }
        return userSession.user2;
    }
};