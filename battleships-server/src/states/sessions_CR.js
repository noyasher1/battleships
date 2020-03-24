import Session from "../models/session";
import User from "../models/user";

// CR: sessions also stays private this way because it's not under the instance of Sessions
let sessions = [];

export function isSocketAlreadySubscribe(socket) {
    if (this._isSessionsArrayEmpty()) {
        return false;
    }
    for (let session in this.sessions) {
        if ((session.user1 && session.user1.socket === socket)
            || session.user2 && session.user2.socket === socket) {
            if (session.user1.socket === socket || session.user2.socket === socket)
                return true;
        }
    }
    return false;
}

export function subscribeUserSocketForAvailableSession(socket) {
    let newUser;
    let usedSession;
    if (this._isSessionsArrayEmpty()) {
        let newSession = new Session();
        newUser = new User(socket);
        newSession.user1 = newUser;
        this.sessions.push(newSession);
        usedSession = newSession;

    }
    else {
        let isFoundAvailableSession = false;
        for (let session of this.sessions) {
            if (!session.isActive) {
                isFoundAvailableSession = true;
                newUser = new User(socket);
                session.user2 = newUser;
                usedSession = session
            }
        }
        if (!isFoundAvailableSession) {
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

export function getSessionBySocket(socket) {
    if (this._isSessionsArrayEmpty()) {
        return null;
    }
    for (let session of this.sessions) {
        if (session.user1 && session.user1.socket === socket
            || session.user2 && session.user2.socket === socket) {
            return session;
        }
    }
    return null;
}

export function getUserBySocket(socket) {
    if (this._isSessionsArrayEmpty()) {
        return null;
    }
    let userSession = this.getSessionBySocket(socket);
    if (userSession.user1.socket === socket) {
        return userSession.user1;
    }
    return userSession.user2;
}

// CR: This technique also allows me to really make sure this function stays private by simply not exporting it
function _isSessionsArrayEmpty() {
    return this.sessions.length === 0;
}