'use strict';
const Session = require("../models/session");
const User = require("../models/user");

let sessions = [];

module.exports.isSocketAlreadySubscribe = (socket) => {
    if(_isSessionsArrayEmpty()){
        return false;
    }
    for(let session in sessions){
        if ((session.user1 && session.user1.socket === socket)
            || session.user2 && session.user2.socket === socket){
            if (session.user1.socket === socket || session.user2.socket === socket)
                return true;
        }
    }
    return false;
};

module.exports.subscribeUserSocketForAvailableSession = (socket) => {
    let newUser;
    let usedSession;
    if(_isSessionsArrayEmpty()){
        let newSession = new Session();
        newUser = new User(socket);
        newSession.user1 = newUser;
        sessions.push(newSession);
        usedSession = newSession;

    }
    else{
        let isFoundAvailableSession = false;
        for(let session of sessions){
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
            sessions.push(newSession);
            usedSession = newSession
        }
    }
    return {
        session: usedSession,
        user: newUser
    }
};

module.exports.getSessionBySocket = (socket) => {
    if(_isSessionsArrayEmpty()){
        return null;
    }
    for(let session of sessions){
        if(session.user1 && session.user1.socket === socket
            || session.user2 && session.user2.socket === socket){
            return session;
        }
    }
    return null;
};

module.exports.getUserBySocket = (socket) => {
    if(_isSessionsArrayEmpty()){
        return null;
    }
    let userSession = getSessionBySocket(socket);
    if (userSession.user1.socket === socket){
        return userSession.user1;
    }
    return userSession.user2;
};

module.exports.removeSession = (session) => {
    sessions.splice(sessions.indexOf(session), 1);
};

function _isSessionsArrayEmpty(){
    return sessions.length === 0;
}