'use strict';
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
        if(this._isSessionsArrayEmpty()){
            return false;
        }
        for(let session in this.sessions){
            if ((session.user1 && session.user1.socket === socket)
                || session.user2 && session.user2.socket === socket){
                if (session.user1.socket === socket || session.user2.socket === socket)
                    return true;
            }
        }
        return false;
    }

    subscribeUserSocketForAvailableSession(socket){
        let newUser;
        let usedSession;
        if(this._isSessionsArrayEmpty()){
            let newSession = new Session();
            newUser = new User(socket);
            newSession.user1 = newUser;
            this.sessions.push(newSession);
            usedSession = newSession;

        }
        else{
            let isFoundAvailableSession = false;
            for(let session of this.sessions){
                if(!session.isActive){
                    isFoundAvailableSession = true;
                    newUser = new User(socket);
                    session.user2 = newUser;
                    usedSession = session
                }
            }
            if(!isFoundAvailableSession){
                let newSession = new Session();
                newUser = new User(socket);
                newSession.user1 = newUser;
                this.sessions.push(newSession);
                usedSession = newSession
            }
        }
        return {
            session: usedSession,
            user: newUser
        }
    }

    getSessionBySocket(socket){
        if(this._isSessionsArrayEmpty()){
            return null;
        }
        for(let session of this.sessions){
            if(session.user1 && session.user1.socket === socket
                || session.user2 && session.user2.socket === socket){
                return session;
            }
        }
        return null;
    }

    getUserBySocket(socket){
        if(this._isSessionsArrayEmpty()){
            return null;
        }
        let userSession = this.getSessionBySocket(socket);
        if (userSession.user1.socket === socket){
            return userSession.user1;
        }
        return userSession.user2;
    }

    _isSessionsArrayEmpty(){
        return this.sessions.length === 0;
    }
};